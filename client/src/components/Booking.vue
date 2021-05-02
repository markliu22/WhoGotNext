<template>
  <div class="booking-card">
    <h2>{{ booking.booking_location }}</h2>
    <h3>
      {{ booking.booking_date }} Start: {{ booking.start_time }} End:
      {{ booking.end_time }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "Booking",
  props: {
    booking: Object,
  },
};
</script>

<style scoped>
.booking-card {
  /* background-color: #ddffba; */
  border: 4px solid black;
  border-radius: 20px;
  margin: 10px;
}
</style>
