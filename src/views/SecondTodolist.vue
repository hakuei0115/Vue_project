<template>
    <div class="div_todoList">
        <h2>Todo List</h2>
        <div class="div_inputTodo">
            <input type="text" placeholder="Add a new todo" v-model="inputValue"/>
            <button type="button" @click="addTodo">Add</button>
        </div>
        <p>未完成的待辦事項</p>
        <ul class="ul_todoListBody incomplete">
            <li v-for="todo in incompleteTodos" :key="todo.createTime">
                <input type="checkbox" :checked="todo.status" @change="toggleTodo(todo.id)">
                <input type="text" v-model="todo.content" @blur="updateTodoContent(todo.id)"/>
                <span class="material-symbols-outlined" @click="deleteTodo(todo.id)">close</span>
            </li>
        </ul>
        <p>已完成的待辦事項</p>
        <ul class="ul_todoListBody complete">
            <li v-for="todo in completeTodos" :key="todo.createTime">
                <input type="checkbox" :checked="todo.status" @change="toggleTodo(todo.id)">
                <input type="text" v-model="todo.content" @blur="updateTodoContent(todo.id)"/>
                <span class="material-symbols-outlined" @click="deleteTodo(todo.id)">close</span>
            </li>
        </ul>
    </div>

    {{ debugMessage }}
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import Swal from 'sweetalert2';

    const api = 'https://todolist-api.hexschool.io/todos';
    const inputValue = ref('');
    const debugMessage = ref('');
    const todoList = ref([]);

    const addTodo = () => {
        if (inputValue.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Empty input',
                text: 'Please enter a new todo'
            });
            return;
        }

        fetch(api, {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: inputValue.value
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status) {
                getTodo();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'New todo added'
                });
            }
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
    }
    
    const getTodo = () => {
        fetch(api, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            todoList.value = res.data;
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
    }

    const updateTodoContent = (id) => {
        fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: todoList.value.find((todo) => todo.id === id).content
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status) {
                getTodo();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Todo content updated'
                });
            }
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
    }

    const toggleTodo = (id) => {
        fetch(`${api}/${id}/toggle`, {
            method: 'PATCH',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status) {
                getTodo();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Todo status updated'
                });
            }
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
    }

    const deleteTodo = (id) => {
        fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then(() => {
            getTodo();
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
    }

    const incompleteTodos = computed(() => {
        return todoList.value.filter((todo) => !todo.status);
    });
    
    const completeTodos = computed(() => {
        return todoList.value.filter((todo) => todo.status);
    });

    onMounted(() => {
        getTodo();
    });
</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");

    .div_todoList {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-self: center;
        row-gap: 1rem;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .div_inputTodo input,
    .div_inputTodo button,
    .ul_todoListBody button {
        outline: none;
        border: 1px solid #e5e7eb;
        margin: 8px 0;
    }

    .div_inputTodo input {
        background-color: #fff;
        padding: 1rem;
        padding-right: 3rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: 300px;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .div_inputTodo button {
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

    .ul_todoListBody {
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style-type: none;
        padding: 0;
    }

    .ul_todoListBody li {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .ul_todoListBody li input[type="text"] {
        border: none;
        background-color: transparent;
        outline: none;
        text-align: center;
    }

    .material-symbols-outlined {
        font-size: 1rem;
        cursor: pointer;
    }
</style>