<template>
  <div class="common-header-wrapper">
    <div class="title">壹本后台管理系统</div>
    <div class="nav">
      <NavMenu></NavMenu>
    </div>
    <div class="loginout">
      <el-button type="warning" size="mini" @click="loginout()">退出登录</el-button>
    </div>
    <div class="user">当前用户: {{userName}}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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
    ...mapState(['userName', 'userTag']),
  },
  created() {
    this.creatSessionTime();
    this.$bus.on("checkTime", () => {
      this.checkSessionTime();
    });
  },
  mounted() {
  },
  methods:{
    ...mapMutations([
      'clearAllLoginCache',
    ]),
    creatSessionTime() {
      if (!sessionStorage.getItem('limitSessionTime')) {
        sessionStorage.setItem('limitSessionTime', new Date().getTime() + 50400000);
      }
    },
    checkSessionTime() {
      if (new Date().getTime() > parseFloat(sessionStorage.getItem('limitSessionTime'))) {
        this.loginout();
      }
    },
    async loginout() {
      try {
          const result = await this.$auth.signOut();
          console.log('退出登录成功:', result);
          sessionStorage.clear();
          this.$router.push('/login');
        } catch (error) {
          console.error('退出登录失败:', error);
          this.$message({
            message: '退出登录失败，请联系管理员',
            type: 'error'
          });
        }
    },
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
    width: 270px;
    font-size: 20px;
    font-weight: 700;
  }
  .nav{
    position: absolute;
    left: 280px;
    top: 0;
    height: 60px;
  }
  .user{
    float: right;
    width: 150px;
    text-align: right;
    font-size: 12px;
  }
  .loginout{
    float: right;
    width: 110px;
    text-align: right;
    font-size: 12px;
  }
}
</style>