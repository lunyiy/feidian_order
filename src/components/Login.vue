<template>
  <div id="login">
    <h1>login</h1>
    <div class="form">
      <label for="Email">Email</label>
      <input
        class="input"
        type="text"
        id="Email"
        v-model="user.email"
        @change="confirmEmail()"
        @keyup="confirmEmail()"
        placeholder="Example:abc123@abc123.com"
        required
      />
      <el-alert
        type="error"
        v-show="error.num >= 1 && error.num < 4"
        :closable="false"
      >
        {{ error.tips[error.num] }}
      </el-alert>

      <label for="Password">Password</label>
      <input
        class="input"
        type="password"
        id="Password"
        v-model="user.password"
        @change="confirmPassword()"
        @keyup="confirmPassword()"
        placeholder="Password"
        required
      />
      <el-alert type="error" v-show="error.num >= 4" :closable="false">
        {{ error.tips[error.num] }}
      </el-alert>

      <div class="label-user-type">
        <label for="common">
          <input
            type="radio"
            name="userType"
            id="common"
            v-model="user.userType"
            value="common"
          />普通用户
        </label>

        <label for="admin">
          <input
            type="radio"
            name="userType"
            id="admin"
            v-model="user.userType"
            value="admin"
          />管理员
        </label>
      </div>

      <label for="remember">
        <input
          type="checkbox"
          v-model="user.isRemember"
          name="remember"
          id="remember"
        />七天免登录
      </label>

      <button id="submit" class="btn" @click="login()">登录</button>

      <router-link
        to="/register"
        v-show="user.userType === 'common'"
        id="register"
        >没有账号？去注册</router-link
      >
    </div>
  </div>
</template>

<script>
import tools from "../utils/js/tools";
import request from "../utils/js/netwok/request";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
        userType: "common",
        isRemember: false,
      },
      error: {
        num: 0,
        tips: [
          "",
          "请输入邮箱账号",
          "邮箱格式错误",
          "账号不存在",
          "请输入密码",
          "密码错误",
          "无管理员权限",
          "登录失败，请稍后再试",
        ],
      },
    };
  },
  props: {},
  created() {
    const email = tools.getCookie("orderLoginEmail");
    const password = tools.getCookie("orderLoginPassword");
    const loginType = tools.getCookie("orderLoginType");

    this.user.email = email;
    this.user.password = password;

    if (email && password && loginType) {
      this.$root.$data.isActive = true;
      if (loginType === "common") {
        this.$router.replace("/user");
      } else if (loginType === "admin") {
        this.$router.replace("/admin");
      }
    } else this.$root.$data.isActive = false;
  },
  methods: {
    login() {
      if (!this.error.num && this.user.email && this.user.password) {
        request({
          url: "/login",
          method: 'post',
          data: {
            user: this.user,
          },
        })
          .then((result) => {
            if (result.data === 0) {
              if (this.isRemember) {
                tools.setCookie("orderLoginEmail", this.user.email, 7);
                tools.setCookie("orderLoginPassword", this.user.password, 7);
                tools.setCookie("orderLoginType", this.user.userType, 7);
              } else if (!this.isRemember) {
                tools.setCookie("orderLoginEmail", this.user.email);
                tools.setCookie("orderLoginPassword", this.user.password);
                tools.setCookie("orderLoginType", this.user.userType);
              }
              this.$root.$data.isActive = true;
              if (this.user.userType === "common")
                this.$router.replace("/user");
              else this.$router.replace("/admin");
            } else {
              this.error.num = result.data;
            }
          })
          .catch((err) => {
            this.error.num = result.data;
          });
      }
    },
    confirmEmail() {
      if (this.user.email === "") {
        this.error.num = 1;
      } else if (!tools.confirmEmail(this.user.email)) {
        this.error.num = 2;
      } else {
        this.error.num = 0;
      }
    },
    confirmPassword() {
      if (this.user.password === "") {
        this.error.num = 4;
      } else if (0) {
        this.error.num = 5;
      } else {
        this.error.num = 0;
      }
    },
  },
  computed: {},
};
</script>

<style>
#login {
  box-sizing: border-box;
  margin: auto;
  width: 25rem;
  padding: 1.25rem;
  text-align: left;
  /* border: 1px solid black; */
}
.form {
  padding: 0.625rem;
  /* border: 1px solid black; */
}
.form > .input {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  border-radius: 5px;
}
.form > label {
  display: block;
  margin-top: 20px;
  width: fit-content;
}
.form > .label-user-type {
  margin-top: 10px;
}
.form > .label-user-type > label {
  display: inline-block;
  margin: 10px 40px 0;
}
h1 {
  margin: 10px 5px;
}
.btn {
  display: block;
  width: 90%;
  margin: 20px auto 0;
  padding: 4px;
  font-size: medium;
}
#submit {
  background-color: rgba(80, 108, 148, 0.3);
  border-radius: 5px;
}
#register {
  display: inline-block;
  width: fit-content;
  margin: 10px 0 0 100px;
}
</style>