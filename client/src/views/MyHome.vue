<template>
  <div class="about">
    <h1 v-if="user_id == ''"></h1>
    <h1 v-else>Hello {{ username }}</h1>
    <Bookings :bookings="bookings" />
  </div>
</template>

<script>
// const axios = require("axios");
import Bookings from "../components/Bookings";

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
  // created() {},
  methods: {},
};
</script>
