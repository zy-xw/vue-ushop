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
      <el-table-column prop="id" label="用户编号" sortable width="250">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="250">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="250">
      </el-table-column>
     
      <el-table-column prop="name" label="状态" sortable width="250">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from '../../../utils/alert';
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
    edit(id){
      this.$emit("edit",id)
    }
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>