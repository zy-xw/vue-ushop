<!--  -->
<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form v-model="user.pid">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option value="" label="---请选择---" disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <input v-if="info.isshow" type="file" @change="changeImg" />
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

import {
  reqCateAdd,
  reqMenuList,
  reqCateInfo,
  reqCateEdit
} from "../../../utils/http";

import { erroralert, successalert } from "../../../utils/alert";

import { mapActions , mapGetters } from "vuex"

export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      list:"cate/list"
    })
  },
  data() {
    return {
      imgUrl: "",
      user: {
        pid: "",
        catename: "",
        img: null,
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
    ...mapActions({
      "reqList":"cate/reqList"
    }),



    //上传文件
    changeImg(e) {
      console.log(e);
      let file = e.target.files[0];

      // let extname=file.name.slice(file.name.lastIndexOf("."))

      let extname = path.extname(file.name);
      let arr=[".png",".gif",".jpg",".jpeg"]
      if(!arr.some(item=>item===extname)){
        erroralert("请上传图片");
        return;
      }
       //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }




      console.log(extname)

      //将文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);

      this.user.img = file;
    },

    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空
    empty() {
      this.imgUrl= "",
      this.user = {
          pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    add() {
      reqCateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
        }
        this.cancel();
        this.empty();
        this.reqList();
      });
    },

    getOne(id) {
      reqCateInfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
           this.imgUrl = this.$pre + this.user.img;
          // console.log(res);
        }
      });
    },
    update() {
      reqCateEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  border-radius: 6px;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload input {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.my-upload img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 6px;
}
</style>