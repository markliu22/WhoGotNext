<template>
  <div class="landing">
    <h1 v-if="login">Login</h1>
    <h1 v-else>Sign Up</h1>
    <form class="login-form" @submit.prevent="handleSubmit">
      <p>
        <input type="text" v-model="username" placeholder="username" />
      </p>
      <p>
        <input type="password" v-model="password" placeholder="password" />
      </p>
      <p>
        <button type="submit">Submit</button>
      </p>
    </form>
    <h3>Switch to:</h3>
    <button @click="login = !login">
      <h3 v-if="login">Sign Up</h3>
      <h3 v-else>Login</h3>
    </button>
  </div>
</template>

<script>
// const axios = require("axios");
const Cookies = require("js-cookie");

export default {
  name: "Login",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      login: true,
      username: "",
      password: "",
      token: "",
    };
  },
  methods: {
    async handleSubmit() {
      // change from fixed link
      const user = {
        username: this.username,
        password: this.password,
      };
      if (this.login) {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await res.json();
        Cookies.set("token", data.token);
        const user_id = data.user_id;
        // this.$router.push(`http://localhost:8080/myhome/${user_id}`);
        this.$router.push({ name: "MyHome", params: { id: user_id } });
      } else {
        const res = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await res.json();
        Cookies.set("token", data.token);
        const user_id = data.user_id;
        // this.$router.push(`http://localhost:8080/myhome/${user_id}`);
        this.$router.push({ name: "MyHome", params: { id: user_id } });
      }
    },
  },
};
</script>
