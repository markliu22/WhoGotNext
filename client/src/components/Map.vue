<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      map: Element,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.6532, lng: -79.3832 },
        zoom: 11,
      });
    },
  },
};
</script>

<style>
#map {
  /* height: 100%; */
  /* width: 800px; */
}
</style>
