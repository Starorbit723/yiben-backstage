<template>
  <div class="nav-container">
    <div class="nav-item" :class="{'active': activeIndex === item.index}" v-for="item in menuData" :key="item.index" @click="gotoPage(item)">{{item.name}}</div>
    <!-- <el-menu-item v-for="item in menuData" :key="item.index" :index="item.index">{{item.name}}</el-menu-item> -->
    <!-- <el-menu-item index="Home">首页</el-menu-item>
    <el-menu-item index="UserManagement">用户管理</el-menu-item>
    <el-menu-item index="BookManagement">预约管理</el-menu-item>
    <el-menu-item index="TimeTable">课程管理</el-menu-item>
    <el-menu-item index="OperationManagement">运营管理</el-menu-item>
    <el-menu-item index="ResourceManagement">资源管理</el-menu-item> -->
    <!-- <el-submenu index="worktable">
      <template slot="title">工作台</template>
      <el-menu-item index="bookconfig">预约配置</el-menu-item>
      <el-menu-item index="timetable">课程表配置</el-menu-item>
    </el-submenu> -->
  </div>
</template>

<script>
import pathData from '@/router/routerPath.json';

export default {
  name: 'NavMenu',
  components: {
  },
  data() {
    return {
      activeIndex: 'Home',
      routerPath: pathData,
      menuData: [],
    }
  },
  watch: {
    '$route'(to, from) {
      // 路由变化时执行的逻辑
      console.log('Route Changed:', to, from);
      this.activeIndex = to.name;
    }
  },
  mounted() {
    this.activeIndex = this.$route.name;
    this.creatNav()
  },
  computed: {
  },
  methods: {
    creatNav() {
      // console.log(JSON.parse(localStorage.getItem('user_info_cloud1-0gvvdaq4c40b8f74')).content.groups);
      // console.log(this.$router.options.routes[2].children);
      const rights = JSON.parse(localStorage.getItem('user_info_cloud1-0gvvdaq4c40b8f74')).content.groups;
      const navArr = [];
      this.$router.options.routes[2].children.forEach(ele => {
        rights.forEach(r => {
          // console.log(r.id, ele.meta.look, ele.meta.look.indexOf(r.id));
          if (ele.meta.look.indexOf(r.id) !== -1 && ele.meta.showOnMenu){
            navArr.push({
              name: ele.meta.name,
              index: ele.name,
              path: ele.path
            });
          }
        });
      });
      this.menuData = navArr;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
    },
    gotoPage(item) {
      console.log(item);
      if (this.activeIndex !== item.index) {
        this.$router.push(item.path);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.nav-container{
  height: 60px;
  .nav-item{
    display: inline-block;
    min-width: 50px;
    text-align: center;
    vertical-align: top;
    padding: 0 15px;
    cursor: pointer;
    font-size: 14px;
    height: 60px;
    line-height: 60px;
    font-family: '微软雅黑';
    user-select: none;
  }
  .nav-item.active{
    background: #3b4147;
    height: 58px;
    border-bottom: 2px solid #ff9900;
  }
}

</style>