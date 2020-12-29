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
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from '../../../utils/alert';
import { reqMenuDel } from "../../../utils/http";
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
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMenuDel({ id: id }).then((res) => {
            console.log(res);
            if(res.data.code==200){
            successalert(res.data.msg)
            this.$emit("init")
            }
          });
        })
        .catch(() => {});
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