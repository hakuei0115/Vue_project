<template>
    <main>
        <CommodityItem
            :commodityList="commodityList"
            :sweetnessList="sweetnessList"
            :iceList="iceList"
            @add-to-cart="handleAddToCart"
        ></CommodityItem>
        <p class="p_selectNone" v-if="selectedCommodity.length === 0">請選擇商品</p>
        <CartList
            v-else
            :selectedCommodity="selectedCommodity"
            @delete-commodity="handleDeleteCommodity"
            @add-to-order="handleAddToOrder"
        ></CartList>
    </main>
    <p class="p_orderNone" v-if="orderList.length === 0">尚未建立訂單</p>
    <OrderList
        v-else
        :orderList="orderList"
    ></OrderList>
</template>

<script setup>
    import { ref } from 'vue'
    import CommodityItem from '@/components/CommodityItem.vue'
    import CartList from '@/components/CartList.vue';
    import OrderList from '@/components/OrderList.vue';

    const selectedCommodity = ref([]);
    const orderList = ref([]);

    const commodityList = ref([
        {
            id: 0,
            name: '珍珠奶茶',
            description: '香濃奶茶搭配QQ珍珠',
            price: 50
        },
        {
            id: 1,
            name: '冬瓜檸檬',
            description: '清新冬瓜配上新鮮檸檬',
            price: 45
        },
        {
            id: 2,
            name: '翡翠檸檬',
            description: '綠茶與檸檬的完美結合',
            price: 55
        },
        {
            id: 3,
            name: '四季春茶',
            description: '香醇四季春茶，回甘無比',
            price: 45
        },
        {
            id: 4,
            name: '阿薩姆奶茶',
            description: '阿薩姆紅茶搭配香醇鮮奶',
            price: 50
        },
        {
            id: 5,
            name: '檸檬冰茶',
            description: '檸檬與冰茶的清新組合',
            price: 45
        },
        {
            id: 6,
            name: '芒果綠茶',
            description: '芒果與綠茶的獨特風味',
            price: 55
        },
        {
            id: 7,
            name: '抹茶拿鐵',
            description: '抹茶與鮮奶的絕配',
            price: 60
        }
    ]);

    const sweetnessList = ref([
        '正常甜',
        '少糖',
        '半糖',
        '微糖',
        '無糖'
    ]);

    const iceList = ref([
        '正常冰',
        '少冰',
        '微冰',
        '去冰',
        '溫飲',
        '熱飲'
    ]);

    const handleAddToCart = (commodity) => {
        if (commodity.sweetness === undefined || commodity.ice === undefined) {
            alert('請選擇甜度與冰塊');
            return;
        }

        const existingItem = selectedCommodity.value.find((item) => {
            return item.id === commodity.id && item.sweetness === commodity.sweetness && item.ice === commodity.ice;
        });

        if (existingItem) {
            existingItem.count++;
        } else {
            selectedCommodity.value.push({ ...commodity, count: 1});
            console.log(selectedCommodity.value);
        }
    };

    const handleAddToOrder = (order) => {
        orderList.value.push(order);
        selectedCommodity.value = [];
    };

    const handleDeleteCommodity = (id) => {
        const index = selectedCommodity.value.findIndex((item) => item.id === id);
        selectedCommodity.value.splice(index, 1);
    };
</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
    @import "@/assets/Third.css";
</style>