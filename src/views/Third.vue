<template>
    <main>
        <ul class="ul_commodityList">
            <li v-for="commodity in commodityList" :key="commodity.id">
                <div class="div_commodityDescription">
                    <h2>{{ commodity.name }}</h2>
                    <p>{{ commodity.description }}</p>
                </div>
                <div class="div_choose">
                    <div>
                        <label>甜度:</label>
                        <select v-model="commodity.sweetness">
                            <option v-for="sweet in sweetness" :value="sweet">{{ sweet }}</option>
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
        <div class="div_selectList">
            <p class="p_selectNone" v-if="selectedCommodity.length === 0">請選擇商品</p>
            <div v-else>
                <table class="table_selectList">
                    <thead>
                        <tr>
                            <th>操作</th>
                            <th>品項</th>
                            <th>描述</th>
                            <th>甜度</th>
                            <th>冰塊</th>
                            <th>數量</th>
                            <th>價格</th>
                            <th>小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in selectedCommodity" :key="item.id">
                            <td><span class="material-symbols-outlined" @click="deleteCommodity(item.id)">close</span></td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.sweetness }}</td>
                            <td>{{ item.ice }}</td>
                            <td>
                                <button @click="item.count -= 1" :disabled="item.count === 1">-</button>
                                {{ item.count }}
                                <button @click="item.count += 1">+</button>
                            </td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.price * item.count }}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="totalPrice">總價: {{ totalPrice }}</p>
                <div class="remark">
                    <textarea v-model="remark" value="備註"></textarea>
                </div>
                <button type="button" @click="addToCar()" class="button_submit">送出</button>
            </div>
        </div>
    </main>
    <p class="p_orderNone" v-if="orderList.length === 0">尚未建立訂單</p>
    <div class="div_orderList" v-else>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>訂單編號</th>
                    <th>品項</th>
                    <th>總價</th>
                    <th>備註</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orderList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <ul>
                            <li v-for="item in order.commodity" :key="item.id">
                                {{ item.name }} x {{ item.count }} - {{ item.sweetness }} - {{ item.ice }}
                            </li>
                        </ul>
                    </td>
                    <td>{{ order.totalPrice }}</td>
                    <td>{{ order.remark }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'

    const remark = ref('')
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

    const sweetness = ref([
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

    const addCommodity = (commodity) => {
        // if (commodity.sweetness === undefined || commodity.ice === undefined) {
        //     alert('請選擇甜度與冰塊');
        //     return;
        // }
        
        const existingItem = selectedCommodity.value.find((item) => item.id === commodity.id && item.sweetness === commodity.sweetness && item.ice === commodity.ice);
        if (existingItem) {
            existingItem.count += 1;
        } else {
            selectedCommodity.value.push({
                id: commodity.id,
                name: commodity.name,
                description: commodity.description,
                sweetness: commodity.sweetness,
                ice: commodity.ice,
                price: commodity.price,
                count: 1
            });
        }
    }

    const deleteCommodity = (id) => {
        const index = selectedCommodity.value.findIndex((item) => item.id === id);
        selectedCommodity.value.splice(index, 1);
    }

    const totalPrice = computed(() => {
        return selectedCommodity.value.reduce((acc, item) => acc + item.price * item.count, 0);
    });

    const addToCar = () => {
        orderList.value.push({
            commodity: selectedCommodity.value,
            totalPrice: totalPrice.value,
            remark: remark.value
        });
        selectedCommodity.value = [];
        remark.value = '';
    }
</script>


<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");
    @import "@/assets/Third.css";
</style>