<template>
  <div id="app">
    <!-- 頁面標題 -->
    <header>
      <h1>Vue SPA 登入驗證範例</h1>
    </header>

    <!-- 導航欄 -->
    <nav>
      <router-link to="/">首頁</router-link>
      <router-link to="/login">登入</router-link>
      <router-link to="/dashboard">儀表板</router-link>
    </nav>

    <!-- 這裡是路由渲染出口，會根據當前路由顯示對應的頁面 -->
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
/* 簡單的樣式設計 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

header {
  margin-bottom: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #35495e;
}
</style>
