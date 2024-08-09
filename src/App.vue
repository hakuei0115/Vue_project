<template>
  <AppHeader />
  <table class="table table-dark table-striped">
    <thead>
      <tr>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col">價格</th>
        <th scope="col">庫存</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="drink in drinkList" :key="drink.id">
        <td contenteditable="true" @input="updateTitle(drink, $event)">{{ drink.title }}</td>
        <td>{{ drink.description }}</td>
        <td>{{ drink.price }}</td>
        <td>
          <button type="button" class="btn btn-outline-primary btn-sm" @click="drink.stock--">-</button>
          {{ drink.stock }}
          <button type="button" class="btn btn-outline-info btn-sm" @click="drink.stock++">+</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script setup>
  import { ref } from 'vue';
  import AppHeader from './AppHeader.vue';

  const drinkList = ref([
    {
      id: 0,
      title: '珍珠奶茶',
      description: '香濃奶茶搭配QQ珍珠',
      price: 50,
      stock: 20
    },
    {
      id: 1,
      title: '冬瓜檸檬',
      description: '清新冬瓜配上新鮮檸檬',
      price: 45,
      stock: 15
    },
    {
      id: 2,
      title: '翡翠檸檬',
      description: '綠茶與檸檬的完美結合',
      price: 55,
      stock: 30
    },
    {
      id: 3,
      title: '四季春茶',
      description: '香醇四季春茶，回甘無比',
      price: 45,
      stock: 10
    },
    {
      id: 4,
      title: '阿薩姆奶茶',
      description: '阿薩姆紅茶搭配香醇鮮奶',
      price: 50,
      stock: 25
    },
    {
      id: 5,
      title: '檸檬冰茶',
      description: '檸檬與冰茶的清新組合',
      price: 45,
      stock: 20
    },
    {
      id: 6,
      title: '芒果綠茶',
      description: '芒果與綠茶的獨特風味',
      price: 55,
      stock: 18
    },
    {
      id: 7,
      title: '抹茶拿鐵',
      description: '抹茶與鮮奶的絕配',
      price: 60,
      stock: 20
    }
  ])

  const updateTitle = (drink, event) => {
    drink.title = event.target.innerText
  }
</script>