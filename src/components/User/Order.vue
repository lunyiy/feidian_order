<template>
  <div id="info">
    <OneOrder
      class="order"
      v-for="(order, index) in orders"
      :key="order"
      :order="order"
      @cancel="cancel(index)"
    ></OneOrder>
  </div>
</template>

<script>
import OneOrder from "./Order/OneOrder";
import request from "../../utils/js/netwok/request";
import tools from '../../utils/js/tools'

export default {
  name: "Order",
  data() {
    return {
      orders: [],
    };
  },
  components: {
    OneOrder,
  },
  methods: {
    cancel(index) {
      this.orders[index].orderStatus = 2;
    },
  },
  created() {
    request({
      url: "/order",
      params: {
        mail: tools.getCookie('orderLoginEmail')
      }
    })
      .then((result) => {
        this.orders = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.order{
  margin: 0 0 5px 0;
}
</style>