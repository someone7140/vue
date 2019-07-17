<template>
  <div>
    <header-component />
    <map-component />
  </div>
</template>

<script>
import MapComponent from '~/components/MapComponent.vue'
import HeaderComponent from '~/components/HeaderComponent.vue'

export default {
  components: {
    MapComponent,
    HeaderComponent
  }
}
</script>
