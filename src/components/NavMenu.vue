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
    <el-menu-item index="bookmanagement">预约管理</el-menu-item>
    <el-submenu index="worktable">
      <template slot="title">工作台</template>
      <el-menu-item index="bookconfig">预约配置</el-menu-item>
      <el-menu-item index="timetable">课程表配置</el-menu-item>
    </el-submenu>
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
      activeIndex: 'usermanagement',
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