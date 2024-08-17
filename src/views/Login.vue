<template>
  <div>
    <form @submit.prevent="checkLogin" class="form">
      <p class="form-title">Sign in to your account</p>

      <div class="input-container">
        <input type="email" placeholder="Enter email" v-model="email" required value="example@gmail.com" />
      </div>

      <div class="input-container">
        <input type="password" placeholder="Enter password" v-model="password" required value="example" />
      </div>

      <button type="submit" class="submit">Sign in</button>

      <p class="signup-link">
        No account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const email = ref('')
const password = ref('')

const router = useRouter()

const checkLogin = () => {
  fetch('https://todolist-api.hexschool.io/users/sign_in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === true) {
        sessionStorage.setItem('token', res.token);
        Swal.fire({
          icon: 'success',
          title: `Welcome back, ${res.nickname}!`,
          showConfirmButton: false,
          timer: 1500
        })
        .then(() => {
          router.push('/second');
        });
      } else {
        if (res.message === '用戶不存在') {
          Swal.fire({
            icon: 'error',
            title: 'User not found',
            text: 'Please check your email and password' // 確認是否導向到註冊頁面
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: res.message
          });
        }
      }
    })
    .catch((error) => {
      console.log('Fetch error:', error);
    });
}


</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f3f4f6;
  margin: 0;
  padding: 0;
}

.form {
  background-color: #fff;
  display: block;
  padding: 1rem;
  max-width: 350px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  margin-top: 10rem;
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
}

.input-container input,
.form button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.submit {
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #4F46E5;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
}

.signup-link {
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}
</style>
