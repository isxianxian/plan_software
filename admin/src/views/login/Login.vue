<template>
  <div style="width:600px;" class="m-auto mt-20 ">
    <el-form
      :model="userForm"
      :rules="rules"
      ref="userForm"
      label-width="100px"
      class="demo-userForm"
    >
      <el-form-item label="用户名" prop="account">
        <el-input v-model="userForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const md5 = require("md5");

export default {
  name: "login",
  data() {
    return {
      userForm: {
        account: "system",
        password: "123456",
      },
      rules: {
        account: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
      },
    };
  },
  methods: {
    login() {
      this.$refs.userForm.validate((valid) => {
        if (!valid) {
          this.$message.error("请输入完整信息！");
          return;
        }
        let { account, password } = this.userForm;
        password = md5(password);
        this.$api.login({ account, password }).then((res) => {
          let { token } = res;
          localStorage.setItem("user-token", token);
          this.$router.push("/home");
        });
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style></style>
