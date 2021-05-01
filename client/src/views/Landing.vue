<template>
  <div class="landing">
    <h1 v-if="login">Login</h1>
    <h1 v-else>Register</h1>
    <form class="login-form" @submit.prevent="handleSubmit">
      <p>
        <input type="text" v-model="username" placeholder="username" />
        <!-- {{ username }} -->
      </p>
      <p>
        <input type="password" v-model="password" placeholder="password" />
        <!-- {{ password }} -->
      </p>
      <p>
        <button type="submit">Submit</button>
      </p>
    </form>
    <h3>Switch to:</h3>
    <button @click="login = !login">
      <h3 v-if="login">Register</h3>
      <h3 v-else>Login</h3>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
const axios = require("axios");

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
    };
  },
  methods: {
    handleSubmit() {
      // change from fixed link
      // console.log(this.username);
      // console.log(this.password);
      const user = {
        username: this.username,
        password: this.password,
      };
      if (this.login) {
        axios
          .post("http://localhost:5000/api/login", user)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      } else {
        axios
          .post("http://localhost:5000/api/signup", user)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      }
    },
    // handleForm() {
    //   const oldState = this.login;
    //   this.login = !oldState;
    // },
  },
};
</script>
