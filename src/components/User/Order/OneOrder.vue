<template>
  <div class="one-order">
    <div class="left">
      <p>{{ order.mail }} &nbsp;&nbsp;&nbsp; {{ order.orderNumber }}</p>
      <p :key="item" v-for="item in order.orderMeals">
        <span>{{ item.dishName }} × {{ item.counts }}</span>
        <span>￥{{ prices(item) }}</span>
      </p>
    </div>
    <div class="right">
      <div>总价：￥{{ totalPrices }}</div>
      <div>
        <slot name="func-btn" v-if="!order.orderStatus">
          <el-button
            size="small"
            class="btn"
            type="warning"
            round
            @click="cancel()"
            >取消订单</el-button
          >
        </slot>
        <el-button v-else class="btn" size="small" type="info" disabled round>{{
          status[order.orderStatus]
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../../utils/js/netwok/request";
export default {
  naem: "OneOrder",
  data() {
    return {
      status: ["", "已完成", "已取消"],
    };
  },
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    totalPrices() {
      return this.order.orderMeals.reduce(function (pre, meal) {
        return pre + meal.price * meal.counts;
      }, 0);
    },
  },
  methods: {
    prices(item) {
      return item.counts * item.price;
    },
    cancel() {
      request({
        url: "/updateOrder",
        method: "post",
        data: {
          orderStatus: 2,
          id: this.order._id
        },
      }).then((result) => {
        this.$emit('cancel', result)
        // console.log(result.data)
      }).catch((err) => {
        console.log(err)
      })
    },
  },
};
</script>

<style scoped>
.one-order {
  position: relative;
  display: flex;
  overflow: hidden;
  width: 99%;
  height: 5rem;
  border: 1px solid #ced7e2;
  border-right: 0px;
  text-align: left;
}
.left {
  flex: 1;
  padding-left: 1.25rem;
  overflow-y: auto;
}
.left > p {
  position: relative;
}
.left > p > span:last-child {
  position: absolute;
  left: 130px;
}
.right {
  width: 9.375rem;
  height: 100%;
  /* border: 1px solid black; */
}
.btn {
  position: absolute;
  bottom: 0.3125rem;
  right: 0.625rem;
  width: 3.75rem;
  padding: 0;
  width: 80px;
  font-size: 0.45rem;
  /* border: 1px solid black; */
}
</style>