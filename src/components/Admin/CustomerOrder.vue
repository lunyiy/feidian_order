<template>
  <div class="customer-order">
    <OneOrder :order="order">
      <template v-slot:func-btn>
        <el-button
          size="small"
          class="btn"
          type="warning"
          round
          @click="finshed()"
          >完结订单</el-button
        >
      </template>
    </OneOrder>
  </div>
</template>

<script>
import OneOrder from "../User/Order/OneOrder.vue";

export default {
  name: "CustomerOrder",
  components: {
    OneOrder,
  },
  data() {
    return {
      order: {
        orderMeals: [
          {
            dishName: "辣椒炒肉",
            counts: 1,
            price: 10,
          },
          {
            dishName: "番茄炒蛋",
            counts: 2,
            price: 100,
          },
        ],
        statusType: 0,
      },
    };
  },
  methods: {
    finshed() {
      this.order.statusType = 1;
    },
  },
};
</script>

<style scoped>
.btn {
  position: absolute;
  bottom: 0.3125rem;
  right: 0.625rem;
  width: 3.75rem;
  padding: 0;
  width: 80px;
  font-size: 0.45rem;
}
</style>