<!--  -->
<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="num"
            v-model="user.menus"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
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
      {{user}}
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
  reqRoleAdd,
  reqMenuList,
  reqRoleGet,
  reqRoleUpdate,
} from "../../../utils/http";

import { successalert } from "../../../utils/alert";

export default {
  props: ["info", "list"],
  data() {
    return {
      num:"",
      user: {
       rolename:"",
       menus:"",
       status:1
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
        rolename:"",
       menus:"",
       status:1
      };
       this.$refs.tree.setCheckedKeys([]);
    },
    add() { 
    
       this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.user).then((res) => {
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

      reqRoleGet({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
           this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
          console.log(res);
        }
      });
    },
    update() {
       this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
           if (this.user.id == this.userInfo.roleid) {
            this.changeUser({});
            this.$router.push("/login");
            return;
          }
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    reqMenuList().then((res) => {
      // console.log(res);
      this.num = res.data.list;
    });
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>