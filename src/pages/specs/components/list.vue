<!--  -->
<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号" sortable width="250">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="250">
      </el-table-column>
      <el-table-column label="规格属性" sortable width="250">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.attrs" :key="index">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" sortable width="250">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>
            禁用
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination  layout="prev, pager, next" 
    :total="total"
    :page-size="size"
    @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { reqspecsDel } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
   ...mapGetters({
      list: "specs/list",
      //总数
      total: "specs/total",
      //一页的数量
      size: "specs/size",
    })
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal:"specs/reqTotal",
      changePage:"specs/changePage"
    }),
    del(id) {
      reqspecsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.reqList();
           this.reqTotal()
        }
      });
    },
    
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {
    this.reqList();
     //获取总数
    this.reqTotal()
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>