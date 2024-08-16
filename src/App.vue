<template>
  <div id="app">
    <nav v-if="!$route.meta.hideNav">
      <router-link to="/first">第一週</router-link>
      <router-link to="/second">第二週</router-link>
      <router-link to="/third">第三週</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    margin: 20px 0;
  }

  nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #42b983;
  }

  nav a.router-link-active {
    color: #35495e;
  }
</style>