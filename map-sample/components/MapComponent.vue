<template>
  <div>
    <div id="yahoo_map" style="width:600px; height:500px"></div>
    <div>
      {{latitude}}、{{longitude}}
    </div>
    <div>
      {{address}}{{message}}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      latitude: 35.66572,
      longitude: 139.73100,
      address: "",
      message: "",
    }
  },
  async mounted() {
    let mapScript = document.createElement('script');
    // 認証キーがあるのでjsの取得はサーバサイドを介すことにする
    let src  = await this.$axios.$get("http://127.0.0.1:8000/api/map/script");
    mapScript.appendChild(document.createTextNode(src));
    document.head.appendChild(mapScript);
    // 現在地の取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position){
          let coords = position.coords;
          // 緯度経度だけ取得
          this.latitude = coords.latitude;
          this.longitude = coords.longitude;
          this.drawMap();
          this.setAddrres();
        }.bind(this),
        function(error) {
          this.drawMap();
          this.setAddrres();
        }
      );

    } else {
      this.drawMap();
      this.setAddrres();
    }
  },
  methods: {
    drawMap() {
      let ymap = new Y.Map("yahoo_map");
      ymap.addControl(new Y.CenterMarkControl());
      ymap.addControl(new Y.ZoomControl());
      ymap.addControl(new Y.SearchControl());
      ymap.drawMap(new Y.LatLng(this.latitude, this.longitude), 17, Y.LayerSetId.NORMAL);
      ymap.bind('moveend', function(){
        let center = ymap.getCenter();
        this.latitude = center.Lat;
        this.longitude = center.Lon;
        this.setAddrres();
　    }.bind(this));
    },
    async setAddrres() {
      let response  = await this.$axios.$get("http://www.finds.jp/ws/rgeocode.php?json&lat=" + this.latitude + "&lon=" + this.longitude);
      if(response.status == 200) {
        this.address = response.result.prefecture.pname + response.result.municipality.mname + response.result.local[0].section;
      } else {
        this.message = "逆ジオコーディングでエラーが発生しました。";
      }
    }
  }
}
</script>
