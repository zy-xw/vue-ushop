<!--  -->
<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @edit="edit($event)"></v-list>

    <v-add :info="info" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add";

import vList from "./components/list";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      //弹框状态
      info: {
        isshow: false,
        isadd: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
     ...mapActions({
      reqList: "cate/reqList"
    }),
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    edit(id) {
      this.info.isshow = true;
      this.$refs.add.getOne(id);
      this.info.isadd = false;
    },
  },
  mounted() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>