<template>
  <div id="info">
    <OneOrder :order="order" @cancel="cancel()"></OneOrder>
  </div>
</template>

<script>
import OneOrder from "./Order/OneOrder";

export default {
  name: "Order",
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
  components: {
    OneOrder,
  },
  methods: {
    cancel() {
      this.order.statusType = 2
    }
  }
};
</script>