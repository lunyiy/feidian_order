<template>
  <div id="register">
    <h1>register</h1>
    <div class="form">
      <label for="Email">Email</label>
      <input
        class="input"
        type="text"
        id="email"
        v-model="user.email"
        placeholder="Example:abc123@abc123.com"
        required
      />
      <el-alert type="error" v-show="!confirmEmail" :closable="false">
        邮箱格式不正确
      </el-alert>

      <label for="Password">Password</label>
      <input
        class="input"
        type="password"
        id="Password"
        v-model="user.password"
        placeholder="Password"
        required
      />

      <label for="Confirm-Password">Confirm Password</label>
      <input
        class="input"
        type="password"
        id="Confirm-Password"
        v-model="user.confirmPassword"
        placeholder="Confirm Password"
        required
      />
      <el-alert type="error" v-show="!confirmPassword" :closable="false">
        密码不一致
      </el-alert>

      <button id="submit" class="btn" @click="register">注册</button>
    </div>
  </div>
</template>

<script>
import tools from "../utils/js/tools";
import request from "../utils/js/netwok/request";

export default {
  name: "Register",
  data() {
    return {
      user: {
        email: "",
        password: "",
        confirmPassword: "",
        userType: "common",
      },
      isEmail: true,
    };
  },
  methods: {
    register() {
      if (
        this.confirmPassword &&
        this.confirmEmail &&
        this.user.email !== "" &&
        this.user.password !== ""
      ) {
        request({
          url: "/register",
          method: 'post',
          data: {
            user: this.user,
          },
        })
          .then((result) => {
            if (result.data === 0) {
              tools.setCookie("orderLoginEmail", this.user.email);
              tools.setCookie("orderLoginPassword", this.user.password);
              tools.setCookie("orderLoginType", "");
              this.$router.push("/login");
            } else {
              alert(result.data);
            }
          })
          .catch((err) => {
            alert(err);
            history.go(0);
          });
      }
    },
  },
  computed: {
    confirmPassword() {
      return tools.confirmPassword(
        this.user.password,
        this.user.confirmPassword
      );
    },
    confirmEmail() {
      if (this.user.email === "") {
        return true;
      } else {
        return tools.confirmEmail(this.user.email);
      }
    },
  },
};
</script>

<style scoped>
#register {
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
}
.form > .label-user-type {
  margin-top: 10px;
}
.form > .label-user-type > label {
  display: inline-block;
  margin: 10px 40px 0;
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
</style>