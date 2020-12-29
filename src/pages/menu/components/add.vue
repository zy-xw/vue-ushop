<!--  -->
<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog  :visible.sync="info.isshow" :title="info.isadd?'添加菜单':'编辑菜单'" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="changePid">
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          label-width="100px"
          v-if="user.type === 1"
        >
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
            <el-option :value="0">
              <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option :value="0">
              <i class="el-icon-star-off"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name + '-/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

import { indexRoutes } from "../../../router/index";

import { reqMenuAdd, reqMenuDetail, reqMenuUpdate } from "../../../utils/http";

import { successalert } from "../../../utils/alert";

export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      value: true,
      //路由集合
      indexRoutes,
    };
  },
  methods: {
    cancel() {
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow = false;

    },
    //清空
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    add() {
      reqMenuAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
        }
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    },
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    getOne(id) {
      reqMenuDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          console.log(res);
        }
      });
    },
    update() {
      reqMenuUpdate(this.user).then(res => {
        if(res.data.code==200){
          successalert(res.data.msg)
          this.cancel()
          this.empty()
          this.$emit("init")
        }
      })
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>