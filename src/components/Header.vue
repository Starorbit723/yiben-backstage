<template>
  <div class="common-header-wrapper">
    <div class="title">壹本后台管理系统</div>
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
    <div class="user">您好: {{userName}}</div>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu';

export default {
  name: 'UserManagement',
  components: {
    NavMenu
  },
  data() {
    return {
      
    }
  },
  computed: {
    userName() {
      return JSON.parse(localStorage.getItem('user_info_cloud1-0gvvdaq4c40b8f74')).content.name;
    }
  },
  mounted() {
    
  },
  methods:{
    
  }
}
</script>

<style lang="less">
@import '../assets/style/common.less';
.common-header-wrapper{
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  background: #545C64;
  color: #fff;
  .title{
    float: left;
    width: 350px;
    font-size: 20px;
    font-weight: 700;
  }
  .nav{
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    height: 60px;
  }
  .user{
    float: right;
    width: 200px;
    text-align: right;
    font-size: 12px;
  }
}
</style>