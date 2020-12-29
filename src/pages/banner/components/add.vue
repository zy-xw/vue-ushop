<!--  -->
<template>
  <div class="form">
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form v-model="user.pid">
       
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px" v-if="user.pid !== 0">

          <!-- <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <input v-if="info.isshow" type="file" @change="changeImg" />
          </div> -->

          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg2"
            :limit="3"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  reqBannerAdd,
  reqBannerInfo,
  reqBannerEdit,
} from "../../../utils/http";

import { erroralert, successalert } from "../../../utils/alert";

import path from "path";

export default {
  props: ["info", "list"],
  data() {
    return {
      imgUrl: "",
      user: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    //上传文件
    changeImg(e) {
      let file = e.target.files[0];

      // let extname=file.name.slice(file.name.lastIndexOf("."))

      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erroralert("请上传图片");
        return;
      }
      //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }

      console.log(extname);

      //将文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);

      this.user.img = file;
    },
    //ui上传文件
    changeImg2(e) {
      let file = e.raw;
      //判断
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
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        title: "",
        img: null,
        status: 1,
      };
    },
    add() {
      reqBannerAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
        }
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    },

    getOne(id) {
      reqBannerInfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;
          // console.log(res);
        }
      });
    },
    update() {
      reqBannerEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
/* @import url(); 引入css类 */
/* .my-upload {
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
} */

/* element-ui的样式 */
/* 穿透 */
.form >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>