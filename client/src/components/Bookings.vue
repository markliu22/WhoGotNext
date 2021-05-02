<template>
  <div>
    <div v-for="booking in bookings" v-bind:key="booking.booking_id">
      <!-- <h3>{{ booking.booking_location }}</h3> -->
      <!-- <h3>{{ booking.booking_location }}</h3> -->
      <Booking
        v-on:del-booking-event="myEmitFunction"
        v-bind:booking="booking"
      />
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
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
    myEmitFunction(id) {
      // go up 1 more level to MyHome
      this.$emit("del-booking-event", id);
    },
  },
  // emits: ["del-booking-event"],
};
</script>
