<template>
  <div class="landing">
    <div class="form">
      <h1 v-if="login">Login</h1>
      <h1 v-else>Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <p>
          <input
            class="input-bar"
            type="text"
            v-model="username"
            placeholder="username"
          />
        </p>
        <p>
          <input
            class="input-bar"
            type="password"
            v-model="password"
            placeholder="password"
          />
        </p>
        <p>
          <button class="button-bar" type="submit">Submit</button>
        </p>
      </form>
      <h3>Switch to:</h3>
      <button class="button-bar" @click="login = !login">
        <p v-if="login">Sign Up</p>
        <p v-else>Login</p>
      </button>
    </div>
  </div>
</template>

<script>
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
      baseURL: "",
      // ref: https://stackoverflow.com/questions/45773860/changing-express-constant-based-on-url-ie-localhost-vs-production
    };
  },
  mounted() {
    // Use process.env.WEBSITE_BASE_URL later
    this.baseURL =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/";
  },
  methods: {
    async handleSubmit() {
      // change from fixed link
      const user = {
        username: this.username,
        password: this.password,
      };
      if (this.login) {
        // const res = await fetch("http://localhost:5000/api/login", {
        const res = await fetch(this.baseURL + "api/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await res.json();
        Cookies.set("token", data.token);
        const user_id = data.user_id;
        this.$router.push({ name: "myHome", params: { id: user_id } });
      } else {
        // const res = await fetch("http://localhost:5000/api/signup", {
        const res = await fetch(this.baseURL + "api/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await res.json();
        Cookies.set("token", data.token);
        const user_id = data.user_id;
        this.$router.push({ name: "myHome", params: { id: user_id } });
      }
    },
  },
};
</script>
<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.form {
  margin-top: 200px;
  height: 600px;
  width: 900px;
  margin: 0 auto;
  /* margin-left: 45px; */
}
.input-bar {
  width: 250px;
  height: 35px;
  border: 3px solid #2c3e50;
  border-radius: 15px;
  padding: 6px;
}
.button-bar {
  width: 150px;
  height: 45px;
  border: 3px solid #2c3e50;
  border-radius: 10px;
  background-color: #cfe1ff;
  padding-top: px;
}
.button-bar p {
  display: block;
  text-align: center;
}
</style>
