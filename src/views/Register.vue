<template>
    <div>
        <form @submit.prevent="registerUser" class="form">
            <p class="form-title">Create a new account</p>

            <div class="input-container">
                <input type="email" placeholder="Enter email" v-model="email" required />
            </div>

            <div class="input-container">
                <input type="password" placeholder="Enter password" v-model="password" required />
            </div>

            <div class="input-container">
                <input type="text" placeholder="Enter nickname" v-model="nickname" required />
            </div>

            <button type="submit" class="submit">Sign up</button>

            <p class="signup-link">
                Back to login?
                <router-link to="/login">Login</router-link>
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const nickname = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

const registerUser = () => {
    fetch('https://todolist-api.hexschool.io/users/sign_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            nickname: nickname.value
        })
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                .then(() => {
                    router.push('/login')
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: res.message
                });
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
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #4F46E5;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
}
</style>