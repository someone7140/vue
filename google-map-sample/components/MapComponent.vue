<template>
  <div>
    地名検索
    <GmapAutocomplete
      :position.sync="maplocation"
      @place_changed="setPlace"
      style="width: 300px;"
    >
    </GmapAutocomplete><br/>
    <GmapMap
     :center="maplocation"
     :zoom="15"
     :draggable="true"
     map-type-id="roadmap"
     style="width: 500px; height: 300px"
     ref="mapRef"
    >
      <GmapMarker v-for="m in makers"
        :position="m.position"
        :title="m.title"
        :clickable="true"
        :draggable="false"
        :icon="m.icon"
        :key="m.id">
      </GmapMarker>
    </GmapMap>
  </div>
</template>
<script>
export default {
  data() {
    return {
      maplocation:{lat:0, lng:0},
      makers:[]
    }
  },
  async mounted() {
    // 現在地の取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position){
          let coords = position.coords;
          // 緯度経度を取得
          this.maplocation.lat = coords.latitude;
          this.maplocation.lng = coords.longitude;
          // 地図読み込み完了時のイベント
          this.$gmapApiPromiseLazy().then(() => {
            google.maps.event.addListenerOnce(this.$refs.mapRef.$mapObject, 'idle',
              function() { this.setPlaceMakers() }.bind(this)
            );
          });
        }.bind(this),
        function(error) {
          // エラーの場合は東京駅周辺に移動
          this.maplocation.lat = 35.6813092;
          this.maplocation.lng = 139.7677269;
        }
      );
    } else {
      // 現在地取得不可の場合は東京駅周辺に移動
      this.maplocation.lat = 35.6813092;
      this.maplocation.lng = 139.7677269;
    }
  },
  methods: {
    setPlace(place) {
      this.maplocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
    },
    setPlaceMakers() {
      let map = this.$refs.mapRef.$mapObject
      // Places APIのnearbySearchを使用する。
      let placeService = new google.maps.places.PlacesService(map);
      placeService.nearbySearch(
        {
          location: new google.maps.LatLng(this.maplocation.lat, this.maplocation.lng),
          radius: 500,
          type: ['restaurant']
        },
        function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(place => {
              // デフォルトのアイコンが大きめなので縮小
              let icon = {
                url: place.icon, // url
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
              };
              let maker = {
                position: place.geometry.location,
                icon: icon,
                title: place.name,
                id: place.place_id
              };
              this.makers.push(maker);
            });
          }
        }.bind(this)
      );
    }
  }
}
</script>
