<template>
    <ul class="ul_commodityList">
        <li v-for="commodity in commodityCopy" :key="commodity.id">
            <div class="div_commodityDescription">
                <h2>{{ commodity.name }}</h2>
                <p>{{ commodity.description }}</p>
            </div>
            <div class="div_choose">
                <div>
                    <label>甜度:</label>
                    <select v-model="commodity.sweetness">
                        <option v-for="sweet in sweetnessList" :value="sweet">{{ sweet }}</option>
                    </select>
                </div>

                <div>
                    <label>冰塊:</label>
                    <select v-model="commodity.ice">
                        <option v-for="ice in iceList" :value="ice">{{ ice }}</option>
                    </select>
                </div>
            </div>
            <p>價格: {{ commodity.price }} 元</p>
            <button type="button" @click="addCommodity(commodity)">加入購物車</button>
        </li>
    </ul>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        commodityList: Array,
        sweetnessList: Array,
        iceList: Array
    });
    
    const commodityCopy = JSON.parse(JSON.stringify(props.commodityList));

    const emit = defineEmits(['add-to-cart']);

    const addCommodity = (commodity) => {
        emit('add-to-cart', commodity);
    };
</script>