<!--  -->
<template>
  <div class="form">
    <el-dialog
      :title="info.isadd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
        @closed="cancel"
      @opened="opened"
    >
      <el-form :model="user">
        {{ user }}
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="user.goodsname" ></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="user.price" ></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="user.market_price" ></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
           <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecsId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in showSpecsAttr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="user.isnew" label="1">是</el-radio>
          <el-radio v-model="user.isnew" label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="user.ishot" label="1">是</el-radio>
          <el-radio v-model="user.ishot" label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"> </el-switch>
        </el-form-item>

         <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor" v-if="info.isshow"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"> 添 加</el-button>
        <el-button type="primary" @click="update" v-else >
          修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import {
  reqCateList,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
      //4.二级分类的列表
      secondCateList: [],
      // 8.规格属性展示的所有选项的列表
      showSpecsAttr: [],
    };
  },
  computed: {
    ...mapGetters({
      //分类的列表
      cateList: "cate/list",
      //规格的list
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      //分类列表的获取
      reqCateList: "cate/reqList",
      //规格列表的获取
      reqSpecsList: "specs/reqList",
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
    }),
    //一级分类列表
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    //根据一级分类，计算出二级分类的list
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    changeSpecsId() {
      //将之前的规格属性清空
      this.user.specsattr = [];

      //计算出规格属性展示的所有选项的列表
      this.getShowSpecsAttr();
    },
    getShowSpecsAttr() {
      //选中的规格是 user.specsid,要从specsList中取出id和user.specsid一样的那条数据的attrs
      let obj = this.specsList.find(item => item.id == this.user.specsid); //找到了，返回哪条数据，没找到，返回undefined
      this.showSpecsAttr = obj ? obj.attrs : [];
    },
    //获取一条数据
    getOne(id) {
      reqgoodsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //重新获取二级分类的list
          this.getSecondList();
          //图片
          this.imgUrl = this.$pre + this.user.img;
          //规格属性展示list
          this.getShowSpecsAttr();
          //规格属性选中的list
          this.user.specsattr = JSON.parse(this.user.specsattr);
          //补id
          this.user.id = id;
          //将user.desctiption赋值给富文本编辑器
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
     cancel() {
    if (!this.info.isadd) {
      this.empty();
    }
    this.info.isshow = false;
  },
   //ui上传文件
  changeImg(e) {
   let file = e.target.files[0];
    //判断
    this.imgUrl = URL.createObjectURL(file);
    this.user.img = file;
  },
 //11.清空
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的是数组字符串，所以在发请求之前，需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1
      };
      this.imgUrl = "";
      //二级分类的列表
      this.secondCateList = [];
      // 规格属性展示的所有选项的列表
      this.showSpecsAttr = [];
    },
    //修改
    update() {
      //取出富文本编辑器的内容，赋值给user
      this.user.description = this.editor.txt.html();
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr),
      };

      reqgoodsUpdate(data).then((res) => {
        if (res.data.code == 200) {
          //1.弹框消失
          this.cancel();
          //2.数据清空
          this.empty();
          //3.弹成功
          successalert(res.data.msg);
          //4.刷新list
          this.reqList();
        }
      });
    },
    //创建富文本编辑器
    opened() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //赋值
      this.editor.txt.html(this.user.description);
    },
  },
 
   add() {
      //取出富文本编辑器的内容，赋值给user
      this.user.description=this.editor.txt.html() 

      // 由于后端要的specsattr是数组字符串，前端需要是数组，所以要拷贝、处理一下，再发送；
      // 但是由于有对象（img）,所以不能使用JSON.parse(JSON.stringify())拷贝，需要使用...
      
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr)
      };

      //发请求
      reqgoodsAdd(data).then(res => {
        if (res.data.code == 200) {
          //1.弹框消失
          this.cancel();
          //2.数据清空
          this.empty();
          //3.弹成功
          successalert(res.data.msg);
          //4.刷新list
          this.reqList();
          this.reqTotal();
        }
      });
    },
  

 
  mounted() {
    // 如果没有请过分类数据，就发一下请求
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
    //请求规格list
    this.reqSpecsList(true);
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
/* element-ui的样式 */
/* 穿透 */
.form >>> .el-upload {
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