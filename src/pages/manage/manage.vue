<!--  -->
<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>

    <el-pagination
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
        @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import vAdd from "./components/add";

import vList from "./components/list";

import { reqManagelist ,reqManageCount } from "../../utils/http";

export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      pageSize:2,
      total:0,
      page:1,
      //弹框状态
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
   
    edit(id) {
      this.info.isshow = true;
      this.$refs.add.getOne(id);
      this.info.isadd = false;
    },
     getList() {
      reqManagelist({ page:this.page, size: this.pageSize }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {

          /*
          如果删除了最后一页的最后一条，那么当前页就会取到空数组；
          这个时候如果有上一页的话，就应该取上一页
          */
          if(res.data.list.length==0&&this.page>1){
            this.page--
            this.getList()
            return
          }
          this.list = res.data.list;
        }
      });
    },
    //请求总数
    getTotal(){
      reqManageCount().then(res=>{
        console.log(res)
         this.total=res.data.list[0].total
      })
    },
    changePage(e){
      this.page=e;
      this.getList()
    },
    init(){
      this.getList(),
      this.getTotal()
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>