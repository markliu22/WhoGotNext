<template>
  <div class="booking-card">
    <h2>{{ booking.booking_location }}</h2>
    <h3>Date: {{ booking.booking_date.substring(0, 10) }}</h3>
    <h3>
      Start: {{ timeConvert(booking.start_time) }} End:
      {{ timeConvert(booking.end_time) }}
    </h3>
    <button @click="myEmitFunction(booking.booking_id)">Delete</button>
    <button @click="whosComing(booking.booking_id)">Who's coming?</button>
    <ul>
      <li v-for="(obj, index) in usernames" :key="index">
        {{ obj.username }}
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
  },
  data() {
    return {
      usernames: [],
    };
  },
  async mounted() {
    const resUsernames = await fetch(
      "http://localhost:5000/api/bookings/users/" + this.booking.booking_id
    );
    const data = await resUsernames.json();
    // console.log(data);
    const usernamesAsArray = Object.values(data);
    this.usernames = usernamesAsArray;
  },
  methods: {
    myEmitFunction(id) {
      // go up two levels (Bookings, then MyHome)
      // could've also just made DELETE request here?
      this.$emit("del-booking-event", id);
    },
    timeConvert(time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
    },
    // whosComing(id) {},
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
