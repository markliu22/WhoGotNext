<template>
  <div class="booking-card">
    <h2>{{ booking.booking_location }}</h2>
    <h3>
      {{ booking.booking_date }} Start: {{ booking.start_time }} End:
      {{ booking.end_time }}
    </h3>
    <button @click="myEmitFunction(booking.booking_id)">Delete</button>
    <button @click="whosComing(booking.booking_id)">Who's coming?</button>
    <ul>
      <li v-for="(username, index) in usernames" :key="index">
        {{ username }}
      </li>
    </ul>
    <!-- <h2>{{ usernames.length }}</h2> -->
  </div>
</template>

<script>
export default {
  name: "Booking",
  props: {
    booking: Object,
    usernames: [],
  },
  async mounted() {
    const resUsernames = await fetch(
      "http://localhost:5000/api/bookings/users/" + this.booking.booking_id
    );
    const data = await resUsernames.json();
    console.log(data);
    const usernamesAsArray = Object.values(data);
    this.usernames = usernamesAsArray;
  },
  methods: {
    myEmitFunction(id) {
      // go up two levels (Bookings, then MyHome)
      // could've also just made DELETE request here?
      this.$emit("del-booking-event", id);
    },
    whosComing(id) {},
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
