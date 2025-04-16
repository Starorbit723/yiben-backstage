<template>
  <el-menu
    router
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545C64"
    text-color="#FFFFFF"
    active-text-color="#FFD04B"
    @select="handleSelect">
    <el-menu-item index="usermanagement">人员管理</el-menu-item>
    <el-submenu index="2">
      <template slot="title">工作台</template>
      <el-menu-item index="usermanagement">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-menu-item index="2-4">选项4</el-menu-item>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4">订单管理</el-menu-item>
  </el-menu>
</template>

<script>
import pathData from '@/router/routerPath.json';

export default {
  name: 'NavMenu',
  components: {
  },
  data() {
    return {
      activeIndex: '1',
      routerPath: pathData,
    }
  },
  computed: {
    cRouter() {
      return this.routerPath[this.version.split('.')[0] - 1].routes;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
</style>