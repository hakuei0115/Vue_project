<template>
    <div class="div_selectList">
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
                    <td>
                        <span class="material-symbols-outlined" @click="deleteCommodity(item.id)">close</span>
                    </td>
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
        <button type="button" @click="addToOrder" class="button_submit">送出</button>
    </div>
</template>

<script setup>
    import { ref, defineProps, defineEmits, computed, watch } from 'vue';

    const remark = ref('');

    const props = defineProps({
        selectedCommodity: Array
    });

    const totalPrice = computed(() => {
        return props.selectedCommodity.reduce((acc, item) => acc + item.price * item.count, 0);
    });

    const emit = defineEmits(['deleteCommodity', 'addToOrder']);

    const addToOrder = () => {
        emit('addToOrder', {
            commodity: props.selectedCommodity,
            totalPrice: totalPrice.value,
            remark: remark.value
        });
    }

    const deleteCommodity = (id) => {
        emit('deleteCommodity', id);
    }
</script>
