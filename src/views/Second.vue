<template>
    <div class="div_checkLogin">
        <input type="text" :value="token" readonly>
        <button type="button" @click="checkLogin">Check</button>
    </div>
    <SecondTodolist />
</template>

<script setup>
    import SecondTodolist from './SecondTodolist.vue';
    import Swal from 'sweetalert2';

    const token =  sessionStorage.getItem('token');

    const checkLogin = () => {
        fetch('https://todolist-api.hexschool.io/users/checkout', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status) {
                Swal.fire({
                    icon: 'success',
                    title: '驗證成功',
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '驗證失敗',
                    showCloseButton: true,
                    text: res.message
                });
            }
        });
    }
</script>

<style>
    .div_checkLogin input,
    .div_checkLogin button {
        outline: none;
        border: 1px solid #e5e7eb;
        margin: 8px 0;
    }

    .div_checkLogin input {
        background-color: #fff;
        padding: 1rem;
        padding-right: 3rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: 300px;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .div_checkLogin button {
        padding: 0.75rem 1.25rem;
        background-color: #4F46E5;
        color: #ffffff;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
        border-radius: 0.5rem;
        text-transform: uppercase;
        margin-left: 0.5rem;
    }
</style>