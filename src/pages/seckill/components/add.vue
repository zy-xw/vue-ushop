<!--  -->
<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="change"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid">
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
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeFirstCateId">
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
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
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

import { mapActions, mapGetters } from "vuex";

import {
    reqseckillAdd,
  reqMenuList,
  reqRoleGet,
  reqRoleUpdate,
} from "../../../utils/http";

import { successalert } from "../../../utils/alert";

export default {
  props: ["info", "list"],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",

      num: "",
      user: {
        title:"",
        begintime:"",
        endtime:"",
        first_cateid:"",
        second_cateid:"",
        goodsid:"",
        status:1,
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
      reqseckillAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
        //   console.log(res)
        }
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    },
    getOne(id) {
      reqRoleGet({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          console.log(res);
        }
      });
    },
    update() {
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
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