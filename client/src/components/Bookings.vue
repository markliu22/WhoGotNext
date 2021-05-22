<template>
  <div>
    <div v-for="booking in bookings" v-bind:key="booking.booking_id">
      <Booking
        v-on:del-booking-event="triggerDelBookingEvent"
        v-bind:booking="booking"
      />
    </div>
  </div>
</template>

<script>
import Booking from "./Booking";

export default {
  name: "Bookings",
  props: {
    bookings: Array,
  },
  components: {
    Booking,
  },
  methods: {
    triggerDelBookingEvent(id) {
      this.$emit("del-booking-event", id);
    },
  },
};
</script>
