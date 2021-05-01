<template>
  <div>
    <h1>{{ booking.booking_location }}</h1>
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

<style></style>
