<template>
  <div id="admin">
    <div class="is-flex">
      <div>
        <el-menu router default-active="/user/menu" class="el-menu">
          <el-menu-item class="el-menu-item" index="/admin/customer-order"
            >客户订单</el-menu-item
          >
          <el-menu-item class="el-menu-item" index="/admin/menu-management"
            >菜单管理</el-menu-item
          >
          <el-menu-item class="el-menu-item" @click="exit()"
            ><span style="color: red;">退出登录</span></el-menu-item
          >
        </el-menu>
      </div>
      <div >
        <router-view @btn-click="click()"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import tools from '../utils/js/tools'

export default {
  name: "Admin",
  data() {
    return {
      
    };
  },
  components: {
    
  },
  methods: {
    exit() {
      tools.removeCookie("orderLoginEmail");
      tools.removeCookie("orderLoginPassword");
      // tools.removeCookie("orderLoginType");
      this.$router.replace("/login");
    },
    click() {
      console.log('成功了')
    }
  },
};
</script>

<style scoped>
.router-link-active {
  color: #409eff;
}
#admin{
  height: 28.125rem;
  overflow: hidden;
}
.is-flex {
  display: flex;
  width: 46.875rem;
  height: 28.125rem;
  border: 1px solid rgba(179, 192, 209, 0.5);
}
.is-flex > div:first-child {
  width: 7.5rem;
  height: 28.125rem;
  background-color: rgba(179, 192, 209, 0.5);

}
.el-menu {
  background-color: #ced7e2;
}
.el-menu-item {
  width: 7.5rem;
}
.el-menu-item:hover {
  background-color: #c1cbda;
}
.el-menu-item:focus {
  background-color: #c1cbda;
}
.is-flex > div:last-child {
  flex: 1;
}
</style>