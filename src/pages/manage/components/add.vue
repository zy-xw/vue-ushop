<!--  -->
<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <!-- 5.遍历数据 -->
            <el-option
              v-for="item in num"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
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
      {{ user }}
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

import { indexRoutes } from "../../../router/index";

import {
  reqManageAdd,
  reqRoleList,
  reqManageInfo,
  reqManageEdit,
} from "../../../utils/http";

import { successalert } from "../../../utils/alert";

export default {
  props: ["info", "list"],
  data() {
    return {
      num: "",
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },

      value: true,
      //路由集合
      indexRoutes,
    };
  },
  methods: {
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    add() {
      reqManageAdd(this.user).then((res) => {
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
      reqManageInfo({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          console.log(res);
        }
      });
    },
    update() {
      reqManageEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
  },

  mounted() {
    reqRoleList().then((res) => {
      console.log(res);
      this.num = res.data.list;
    });
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>