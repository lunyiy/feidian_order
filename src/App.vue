<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <nav class="home-link">
          <router-link to="/"><i class="el-icon-s-home"></i>首页</router-link>
        </nav>
        <div>
          <nav class="login-link" v-if="!isActive">
            <router-link to="/login">登录</router-link> /
            <router-link to="/register">注册</router-link>
          </nav>
          <nav class="login-link user-active" v-else>
            <router-link :to="toPath[to]">{{ userEmail }}</router-link>
          </nav>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import tools from "../src/utils/js/tools";
import request from "../src/utils/js/netwok/request";

export default {
  name: "App",
  data() {
    return {
      isActive: false,
      toPath: ["/user", "/admin"],
      to: 0,
      userEmail: tools.getCookie('orderLoginEmail')
    };
  },
  created() {
    const email = tools.getCookie("orderLoginEmail");
    const password = tools.getCookie("orderLoginPassword");
    const userType = tools.getCookie("orderLoginType");
    if (email && password && userType) {
      const user = {
        email,
        password,
        userType,
      };
      request({
        url: "/login",
        method: "post",
        data: {
          user: user,
        },
      })
        .then((result) => {
          if (result.data === 0) {
            this.isActive = true;
            this.isRigthEmail = true;
            if (userType === "common") {
              this.to = 0;
              this.$router.push("/user");
            } else if (userType === "admin") {
              this.to = 1;
              this.$router.push("/admin");
            } else {
              console.log("出现了问题");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.el-container {
  margin: auto;
  height: 34.375rem;
  width: 50rem;
}
.el-header {
  position: relative;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.home-link {
  position: absolute;
  left: 1.25rem;
}
nav.login-link {
  width: fit-content;
  /* border: 1px solid black; */
  position: absolute;
  right: 1.25rem;
}
nav > a {
  text-decoration: none;
}
.router-link-active {
  color: #409eff;
}
</style>
