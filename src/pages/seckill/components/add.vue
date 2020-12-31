<!--  -->
<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        {{ user }}
        <!-- {{value1}} -->
        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="value1"
            type="daterange"
            :value-format="yyyy-MM-dd-hh-mm-ss"
            range-separator="至"
            start-placeholder="开始日期"
            start=""
            end-placeholder="结束日期"
            end=""
            @change="beginend"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value="" disabled></el-option>
            <!-- 5.遍历数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeSecondCateId">
            <el-option label="--请选择--" value="" disabled></el-option>
            <!-- 5.遍历数据 -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <!-- 5.遍历数据 -->
            <el-option
              v-for="item in goodsidlist"
              :key="item.id"
              :label="item.goodsname"
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
        <el-button type="primary" @click="add" v-if="info.isadd"
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
  reqseckillInfo,
  reqseckEdit,
  reqcatelist,
  reqgoodslist,
} from "../../../utils/http";

import { successalert } from "../../../utils/alert";

export default {
  props: ["info"],
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

      num: "",
      user: {
        title: "",
        begintime: 0,
        endtime: 0,
        //n
        first_cateid: "",
        //n
        second_cateid: "",
        //n
        goodsid: "",
        status: 1,
      },  
      secondCateList: [],
      showSpecsAttr: [],
      goodsidlist: "",
      value: true,
      //路由集合
      indexRoutes,
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqList: "seckill/reqList",
    }),
    beginend() {
      let date=new Date(this.value1[0])
      this.user.begintime=Date.parse(date)
      let date2=new Date(this.value1[1])
      this.user.endtime=Date.parse(date2)
    },
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqcatelist({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    changeSecondCateId() {
      this.user.goodsid = "";
      this.getgoodsList();
    },
    // id:this.user.second_cateid
    getgoodsList() {
      reqgoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        console.log("111");
        console.log(res);
        this.goodsidlist = res.data.list;
      });
    },
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空
    empty() {
      this.user = {
        title: "",
        begintime: 0,
        endtime: 0,
        //n
        first_cateid: "",
        //n
        second_cateid: "",
        //n
        goodsid: "",
        status: 1,
      };
      this.value1=""
    },
    add() {
      reqseckillAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
            console.log(res)
        }
        this.cancel();
        this.empty();
        this.reqList();
      });
    },
    getOne(id) {



      reqseckillInfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          console.log(res);
        }
      });
    },
    update() {
      reqseckEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
            this.empty();
            successalert(res.data.msg);
            this.reqList();
        }
      });
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
    this.reqSpecsList(true);
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>