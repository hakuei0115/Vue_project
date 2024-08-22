<template>
    <div class="div_orderList">
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
    import { defineProps } from 'vue';

    const props = defineProps({
        orderList: Array
    });
</script>