<!--  -->
<template>
  <div class="login">
    <div class="con">
      <h2>登录</h2>
      <el-form :model="user" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="请输入密码" clearable show-password></el-input>
        </el-form-item>

        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
  </div></div>
</template>

<script>
import {reqLogin} from "../../utils/http";
import {mapActions} from "vuex"
export default {
  data() {
    return {
        user:{
            username:"",
            password:""
        },
        //规则
        rules:{
          username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ]
        }
    };
  },
  methods:{
    ...mapActions({
      changeUser:"changeUser"
    }),
    //登录
    login(){
      reqLogin(this.user).then(res=>{
        if(res.data.code===200){
          //如果登录成功了，将用户的信息存入store
          this.changeUser(res.data.list)
          //跳转页面
          this.$router.push("/");
        }
      })
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#553544,#433A52,#303D60);
}
.con{
    width: 350px;
    height: 250px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.con h2{
    text-align: center;
}
.con .inp{
    margin: 20px 0;
}
</style>