<!--  -->
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <div class="aside">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#20222a"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              router
            >
              <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/menu">菜单管理</el-menu-item>
                  <el-menu-item index="/role">角色管理</el-menu-item>

                  <el-menu-item index="/manage">管理员管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-goods"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/cate">商品分类</el-menu-item>
                  <el-menu-item index="/specs">商品规格</el-menu-item>
                  <el-menu-item index="/goods">商品管理</el-menu-item>
                  <el-menu-item index="/member">会员管理</el-menu-item>
                  <el-menu-item index="/banner">轮播图管理</el-menu-item>
                  <el-menu-item index="seckill">秒杀活动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.el-container {
  height: 100vh;
  width: 100vw;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background-color: skyblue;
}
.con{
 padding-top: 20px;   
}
</style>
