<!--  -->
<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        {{ user }}
        {{ attrsArr }}
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input
              class="line-ipt"
              v-model="item.value"
              autocomplete="off"
            ></el-input>
            <el-button
              type="primary"
              class="line-btn"
              v-if="index == 0"
              @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button
              type="danger"
              class="line-btn"
              v-else
              @click="delAttr(index)"
              >删除</el-button
            >
          </div>
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
  reqspecsDetail,
  reqSpecsAdd,
  reqspecsUpdate,
} from "../../../utils/http";

import { successalert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      user: {
        spescname: "",
        attrs: "[]",
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      //一页的数量
      size: "specs/size",
    }),
  },

  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal: "specs/reqTotal"
    }),
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1
      };
      this.attrsArr = [{ value: "" }];
    },
    //新增属性
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrsArr.splice(index, 1);
    },
    add() {
      //发请求
       this.user.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
      reqSpecsAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          //数据情况
          this.empty();
          successalert(res.data.msg);
          this.reqList();
          this.reqTotal();
        }
      });
    },
    getOne(id) {
      reqspecsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.attrsArr=this.user.attrs.map(item=>({value:item}))
        }
      })
    },
    update() {
      this.user.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
      reqspecsUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          this.cancel();
          //数据情况
          this.empty()
          successalert(res.data.msg)
          this.reqList()
        }
      })
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */

.line {
  display: flex;
}
.line .line-ipt {
  flex: 1;
}
.line .line-btn {
  width: auto;
}
</style>