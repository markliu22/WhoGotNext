<template>
  <div class="booking-card">
    <h2>{{ booking.booking_location }}</h2>
    <h3>
      {{ booking.booking_date }} Start: {{ booking.start_time }} End:
      {{ booking.end_time }}
    </h3>
    <button @click="myEmitFunction(booking.booking_id)">Delete</button>
  </div>
</template>

<script>
export default {
  name: "Booking",
  props: {
    booking: Object,
  },
  methods: {
    myEmitFunction(id) {
      // go up two levels (Bookings, then MyHome)
      // could've also just made DELETE request here?
      this.$emit("del-booking-event", id);
    },
  },
  // emits: ["del-booking-event"],
};
</script>

<style scoped>
.booking-card {
  border: 4px solid #2c3e50;
  border-radius: 20px;
  margin: 10px;
}
</style>
