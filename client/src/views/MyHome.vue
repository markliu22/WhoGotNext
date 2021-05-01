<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet commodi
      temporibus dignissimos ipsum esse laborum totam consectetur nisi quaerat
      ducimus! Illo dolores hic quisquam, in unde optio ullam? Perferendis,
      unde.
    </p>
  </div>
</template>

<script>
// const axios = require("axios");

export default {
  name: "MyHome",
  components: {},
  data() {
    return {
      user_id: "",
      username: "",
      bookings: [],
    };
  },
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
  methods: {},
};
</script>
