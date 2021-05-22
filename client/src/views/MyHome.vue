<template>
  <div class="home">
    <div class="top-section">
      <div class="left-section">
        <button class="button-secondary logout-button" @click="userLogout">
          Logout
        </button>
        <div class="form">
          <h1 class="welcome-message">Hello, {{ username }}.</h1>
          <h1 class="prompt-message">Schedule your next game:</h1>
          <form class="booking-form" @submit="handleSubmit">
            <p>
              <input
                class="input-bar"
                type="text"
                v-model="booking_location"
                placeholder="Location:"
              />
            </p>
            <p>
              <input
                class="input-bar"
                type="text"
                v-model="booking_date"
                placeholder="Date:"
              />
            </p>
            <p>
              <input
                class="input-bar"
                type="text"
                v-model="start_time"
                placeholder="Start Time:"
              />
            </p>
            <p>
              <input
                class="input-bar"
                type="text"
                v-model="end_time"
                placeholder="End Time:"
              />
            </p>

            <p>
              <button class="button-bar" type="submit">Submit</button>
            </p>
          </form>
        </div>
      </div>

      <div class="right-section">
        <div class="map-component">
          <Map id="map" />
        </div>
      </div>
    </div>
    <div class="bottom-section">
      <h1>Your upcoming games:</h1>
      <Bookings
        v-on:del-booking-event="deleteBooking"
        v-bind:bookings="bookings"
      />
    </div>
  </div>
</template>

<script>
import Bookings from "../components/Bookings";
import Map from "../components/Map";
const Cookies = require("js-cookie");

export default {
  name: "MyHome",
  components: {
    Bookings,
    Map,
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
      baseURL: "",
      // ref: https://stackoverflow.com/questions/45773860/changing-express-constant-based-on-url-ie-localhost-vs-production
    };
  },
  // created, mounted both good
  async mounted() {
    this.baseURL =
      process.env.NODE_ENV === "production"
        ? process.env.WEBSITE_BASE_URL
        : "http://localhost:5000";

    let uri = window.location.href
      .split("")
      .reverse()
      .join("")
      .split("\/");

    const user_id = uri[0]
      .split("")
      .reverse()
      .join("");

    // const resUser = await fetch("http://localhost:5000/api/users/" + user_id);
    const resUser = await fetch(this.baseURL + "/api/users/" + user_id);
    const dataUser = await resUser.json();
    // console.log(dataUser);
    this.user_id = dataUser.user_id;
    this.username = dataUser.username;

    //   "http://localhost:5000/api/bookings/user/" + user_id
    const resBookings = await fetch(
      this.baseURL + "/api/bookings/user/" + user_id
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

      // const res = await fetch("http://localhost:5000/api/bookings", {
      const res = await fetch(this.baseURL + "/api/bookings", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify(bookingObj),
      });
    },
    async deleteBooking(id) {
      // const res = await fetch("http://localhost:5000/api/bookings/" + id, {
      const res = await fetch(this.baseURL + "/api/bookings/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });
      this.bookings = this.bookings.filter(
        (booking) => booking.booking_id !== id
      );
    },
    userLogout() {
      Cookies.remove("token");
      this.$router.push({ name: "landing" });
    },
  },
};
</script>

<style scoped>
.home {
  margin: 5px;
}
.top-section {
  background-color: aliceblue;
  padding: 15px;
  border-radius: 15px;
}
.welcome-message {
  font-size: 60px;
}
.form {
  margin-top: 60px;
  height: 400px;
  width: 900px;
  margin-left: 45px;
}
.input-bar {
  width: 250px;
  height: 25px;
  border: 3px solid #2c3e50;
  border-radius: 15px;
  padding: 6px;
}
.button-bar {
  width: 150px;
  height: 30px;
  border: 3px solid #2c3e50;
  border-radius: 10px;
  padding: 0px;
  background-color: #cfe1ff;
}
.map-component {
  margin-right: 45px;
}
#map {
  height: 550px;
  width: 900px;
  /* border: 3px solid #2c3e50; */
  border-radius: 15px;
}
.top-section {
  display: flex;
  justify-content: space-between;
}
.logout-button {
  position: fixed;
  top: 15px;
  left: 25px;
  font-size: 20px;
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
