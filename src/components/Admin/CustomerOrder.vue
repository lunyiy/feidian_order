<template>
  <div class="customer-order">
    <OneOrder
      class="order"
      v-for="(order, index) in orders"
      :key="order"
      :order="order"
    >
      <template v-slot:func-btn>
        <el-button
          size="small"
          class="btn"
          type="warning"
          round
          @click="finshed(index)"
          >完结订单</el-button
        >
      </template>
    </OneOrder>
  </div>
</template>

<script>
import OneOrder from "../User/Order/OneOrder.vue";
import request from "../../utils/js/netwok/request";

export default {
  name: "CustomerOrder",
  components: {
    OneOrder,
  },
  data() {
    return {
      orders: [],
    };
  },
  created() {
    request({
      url: "/allOrder",
    })
      .then((result) => {
        this.orders = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    finshed(index) {
      request({
        url: "/updateOrder",
        method: "post",
        data: {
          orderStatus: 1,
          id: this.orders[index]._id,
        },
      })
        .then((result) => {
          this.orders[index].orderStatus = 1;
        })
        .catch((err) => {
          console.log(err);
        });
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
.order {
  margin: 0 0 5px 0;
}
.customer-order {
  height: 28.125rem;
  overflow-y: auto;
}
</style>