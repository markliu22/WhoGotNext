<template>
  <div class="booking-card">
    <h2>{{ booking.booking_location }}</h2>
    <h3>{{ booking.booking_date.substring(0, 10) }}</h3>
    <h3>
      Start: {{ timeConvert(booking.start_time) }} End:
      {{ timeConvert(booking.end_time) }}
    </h3>
    <button
      class="button-secondary"
      @click="triggerDelBookingEvent(booking.booking_id)"
    >
      Delete
    </button>
    <div>
      <button class="button-secondary" v-on:click="showList = !showList">
        <template v-if="showList">Hide</template>
        <template v-else>Who's coming?</template>
      </button>
      <ul class="username-list" v-if="showList">
        <li v-for="(obj, index) in usernames" :key="index">
          {{ obj.username }}
        </li>
      </ul>
    </div>
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
      showList: false,
      usernames: [],
      baseURL: "",
      // ref: https://stackoverflow.com/questions/45773860/changing-express-constant-based-on-url-ie-localhost-vs-production
    };
  },
  async mounted() {
    // Use process.env.WEBSITE_BASE_URL later
    // this.baseURL =
    //   process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/";
    this.baseURL = "http://localhost:5000/";

    //   "http://localhost:5000/api/bookings/users/" + this.booking.booking_id
    const resUsernames = await fetch(
      this.baseURL + "api/bookings/users/" + this.booking.booking_id
    );
    const data = await resUsernames.json();
    const usernamesAsArray = Object.values(data);
    this.usernames = usernamesAsArray;
  },
  methods: {
    triggerDelBookingEvent(id) {
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
  },
};
</script>

<style scoped>
.booking-card {
  border: 4px solid #2c3e50;
  border-radius: 20px;
  margin: 10px;
}
.username-list {
  padding: 0;
}
.username-list li {
  list-style-type: none;
}
.button-secondary {
  background: none;
  border: none;
  margin: 5px;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
}
</style>
