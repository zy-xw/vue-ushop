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
      <el-table-column prop="id" label="活动名称" sortable width="315">
      </el-table-column>
    
      <el-table-column prop="name" label="状态" sortable width="315">
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
import { reqRoleDel } from "../../../utils/http";
export default {
  props: ["list"],
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    del(id) {
          reqRoleDel({ id: id }).then((res) => {
            console.log(res);
            if(res.data.code==200){
            successalert(res.data.msg)
            this.$emit("init")
            }
        })
    },
    edit(id){
      this.$emit("edit",id)
    }
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>