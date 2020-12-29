<!--  -->
<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form v-model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input
            v-model="user.password"
            autocomplete="off"
            ref="abc"
          ></el-input>
          <span>留空则不修改</span>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

import { indexRoutes } from "../../../router/index";

import { reqMemberInfo, reqMemberEdit } from "../../../utils/http";

import { successalert } from "../../../utils/alert";

export default {
  props: ["info", "list"],
  data() {
    return {
      abc: "",
      num: "",
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
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
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },

    getOne(id) {
      reqMemberInfo({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
        }
      });
    },
    update() {
      reqMemberEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");


          
          if (this.user.password == "") {
            alert('123')
            this.user.password='12111'
          }


              
        }
      });
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>