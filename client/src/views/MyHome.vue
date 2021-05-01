<template>
  <div class="about">
    <!-- <h1 v-if="user_id == ''"></h1> -->
    <h1>Hello {{ username }}</h1>
    <form class="booking-form" @submit="handleSubmit">
      <p>
        <input type="text" v-model="booking_location" placeholder="location" />
      </p>
      <p>
        <input type="text" v-model="booking_date" placeholder="date" />
      </p>
      <p>
        <input type="text" v-model="start_time" placeholder="start" />
      </p>
      <p>
        <input type="text" v-model="end_time" placeholder="end" />
      </p>

      <p>
        <button type="submit">Book!</button>
      </p>
    </form>
    <h1>Here are your upcoming events:</h1>
    <Bookings v-bind:bookings="bookings" />
  </div>
</template>

<script>
// const axios = require("axios");
import Bookings from "../components/Bookings";
const Cookies = require("js-cookie");

export default {
  name: "MyHome",
  components: {
    Bookings,
  },
  data() {
    return {
      user_id: "",
      username: "",
      bookings: [],
      booking_location: "",
      booking_date: "",
      start_time: "",
      end_time: "",
    };
  },
  // created, mounted both good
  async mounted() {
    let uri = window.location.href
      .split("")
      .reverse()
      .join("")
      .split("\/");

    const user_id = uri[0]
      .split("")
      .reverse()
      .join("");

    const resUser = await fetch("http://localhost:5000/api/users/" + user_id);
    const dataUser = await resUser.json();
    // console.log(dataUser);
    this.user_id = dataUser.user_id;
    this.username = dataUser.username;

    const resBookings = await fetch(
      "http://localhost:5000/api/bookings/user/" + user_id
    );
    const dataBookings = await resBookings.json();
    const bookingsAsArray = Object.values(dataBookings);
    this.bookings = bookingsAsArray;
  },
  methods: {
    async handleSubmit() {
      const bookingObj = {
        booking_location: this.booking_location,
        booking_date: this.booking_date,
        start_time: this.start_time,
        end_time: this.end_time,
        booker_id: this.user_id,
      };
      // console.log("COOKIE: " + Cookies.get("token"));

      // change from fixed link
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify(bookingObj),
      });
      const data = await res.json();
    },
  },
};
</script>
