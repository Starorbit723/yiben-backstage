<template>
  <div class="common-header-wrapper">
    <div class="title">XXXXXXXXXXXXXXX</div>
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
    <div class="user">XXXXXXXXXXXXXXX</div>
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
    font-size: 24px;
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
  }
}
</style>