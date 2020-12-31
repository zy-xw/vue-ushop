<!--  -->
<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="编号" sortable width="250">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="250">
      </el-table-column>
      <el-table-column  label="图片" sortable width="180">
          <template slot-scope="scope">
              <img v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt="">
          </template>
      </el-table-column>
     
      <el-table-column prop="name" label="状态" sortable width="250">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="315">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from '../../../utils/alert';
import { reqBannerDel } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex"
export default {
  // props: ["list"],
  data() {
    return {};
  },
 computed:{
   ...mapGetters({
     list:"banner/list"
   })
 },
  methods: {
    ...mapActions({
      reqList:"banner/reqList"
    }),
    del(id) {
          reqBannerDel({ id: id }).then((res) => {
            console.log(res);
            if(res.data.code==200){
            successalert(res.data.msg)
            this.reqList();
            }
        })
    },
    edit(id){
      this.$emit("edit",id)
    }
  },
  mounted(){
    this.reqList();
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
img{
    width: 80px;
    height: 80px;
}
</style>