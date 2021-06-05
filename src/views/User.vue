<template>
  <div id="user">
    <div class="sign">
      <el-menu router default-active="/user/menu" class="el-menu">
        <el-menu-item class="el-menu-item" index="/user/menu"
          >点餐</el-menu-item
        >
        <el-menu-item class="el-menu-item" index="/user/order"
          >订单</el-menu-item
        >
        <el-menu-item class="el-menu-item exit" index="" @click="exit()"
          ><span style="color: red">退出登录</span></el-menu-item
        >
      </el-menu>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import tools from '../utils/js/tools'

export default {
  name: "User",
  data() {
    return {};
  },
  methods: {
    exit() {
      tools.removeCookie("orderLoginEmail");
      tools.removeCookie("orderLoginPassword");
      tools.removeCookie("orderLoginTYype");
      this.$router.replace("/login");
    },
  }
};
</script>

<style scoped>
@import url("../assets/css/base.css");

.sign {
  display: flex;
}
.sign > div:first-child {
  width: 7.5rem;
  background-color: rgba(179, 192, 209, 0.5);
}
.sign > div:first-child > a {
  display: block;
  text-decoration: none;
}
.main {
  flex: 1;
  overflow: hidden;
  height: 28rem;
  border: 1px solid rgba(179, 192, 209, 0.5);
  border-left: none;
}
.el-menu {
  background-color: rgba(179, 192, 209, 0.5);
}
.el-menu-item {
  width: 7.5rem;
}
.exit:hover {
  background-color: #ced7e2;
}
.exit:focus {
  background-color: #ced7e2;
}
</style>
