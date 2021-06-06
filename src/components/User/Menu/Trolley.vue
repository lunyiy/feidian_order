<template>
  <div class="trolley">
    <div class="btn-div">
      <el-button
        type="primary"
        icon="el-icon-shopping-cart-2"
        class="btn"
        circle
      ></el-button>
    </div>

    <div class="prices">￥{{ totalPrices }}</div>
    <div class="orders">
      <p :key="item" v-for="item in orderMeals">
        {{ item.dishName }} × {{ item.counts }}
      </p>
    </div>

    <div class="btn-div">
      <el-button
        type="warning"
        :disabled="!totalPrices"
        @click="toPay()"
        class="btn to-pay"
        round
        >去结算</el-button
      >
    </div>
  </div>
</template>

<script>
import request from "../../../utils/js/netwok/request";
import tools from "../../../utils/js/tools";

export default {
  name: "Trolley",
  data() {
    return {
      isPerform: false,
    };
  },
  props: {
    orderMeals: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    totalPrices() {
      return this.orderMeals.reduce(function (pre, meal) {
        return pre + meal.price * meal.counts;
      }, 0);
    },
  },
  methods: {
    toPay() {
      // this.$router.push('/user/order')
      const mail = tools.getCookie("orderLoginEmail");
      const orderNumber = tools.orderNumber();
      const orderMeals = this.orderMeals;

      // console.log(typeof(orderMeals[0]))

      const order = {
        mail,
        orderNumber,
        orderMeals,
      };
      request({
        url: '/order',
        method: 'post',
        data: {
          order
        }
      }).then((result) => {
        this.$router.push('/user/order')
      }).catch((err) => {
        console.log(err)
      })
    },
  },
};
</script>

<style scoped>
.trolley {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;

  line-height: 4.375rem;
}
.prices {
  width: 50px;
}
.orders {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  padding-top: 8px;
  padding-left: 5rem;
  height: 50px;
  line-height: 1.15rem;
  font-size: small;
}
.orders > p {
  margin: 0;
}
.btn-div {
  margin: 0 1.25rem;
}
.btn {
  background-color: #e6a23c;
  border: #e6a23c;
  font-size: 1.3rem;
}
.to-pay {
  margin-top: 18px;
  margin-right: 30px;
  padding: 0 30px;
  font-size: 0.8rem;
}
</style>