<template>
  <div class="container">
    <router-link to="/"></router-link>
    <router-link to="/myhome"></router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  box-sizing: border-box;
}
</style>
