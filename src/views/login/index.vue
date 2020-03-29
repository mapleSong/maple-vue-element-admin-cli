
<template>
  <div class="login-container">
    <div class="main-block">
      <el-row>
        <div class="login-block flex-c">
          <el-form :model="model" :rules="rules" ref="loginForm" @submit.native.prevent="login"
                   class="login-innerblock">
            <h1 class="title">登 录</h1>
            <div class="form-block">
              <el-form-item prop="username" class="input-block username-block">
                <i class="icon"></i>
                <el-input placeholder="用户名" v-model="model.username">
                </el-input>
              </el-form-item>
              <el-form-item prop="password" class="input-block password-block">
                <i class="icon"></i>
                <el-input placeholder="请输入密码" v-model="model.password" show-password></el-input>
              </el-form-item>
              <el-form-item class="login-btn">
                <el-button type="primary" native-type="submit" :loading="false">登 录</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-row>
      <div class="copyright-block">xxxx© 2020 版权所有</div>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5';
import { login } from '@/api/user'
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const { username, password } = this.model
          this.$store.dispatch('user/login', { username, password: md5(password) }).then(res => {
            this.$router.push({ path: '/' })
            this.$message({ type: "success", message: "登录成功" });
          }).catch(err => { })
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
    


