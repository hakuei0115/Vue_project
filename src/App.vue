<template>
  <div id="app">
    <nav v-if="!$route.meta.hideNav">
      <div class="div_link">
        <router-link to="/first">第一週</router-link>
        <router-link to="/second">第二週</router-link>
        <router-link to="/third">第三週</router-link>
      </div>
      <div class="div_logout">
        <button type="button" @click="logout">登出</button>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import Swal from 'sweetalert2';

  const router = useRouter()

  const logout = () => {
    fetch('https://todolist-api.hexschool.io/users/sign_out', {
      method: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: '登出成功',
          showConfirmButton: false,
          timer: 1500
        })
        .then(() => {
          sessionStorage.removeItem('token');
          router.push('/login');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '登出失敗',
          showCloseButton: true,
          text: res.message
        });
      }
    });
  }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.div_logout {
  margin-right: 20px;
}

.div_logout button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.div_logout button:hover {
  background-color: #35495e;
}
</style>