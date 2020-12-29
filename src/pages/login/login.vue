<!--  -->
<template>
  <div class="login">
    <div class="con">
      <h2>登录</h2>
      <div class="inp">
          <el-input placeholder="请输入内容" v-model="user.name" clearable> </el-input>
      </div>
      <div class="inp">
          <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>
      </div>
      <el-button type="primary">主要按钮</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        user:{
            name:"",
            pass:""
        }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
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