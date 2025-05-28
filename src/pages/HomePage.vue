<template>
  <div class="home-page">
    <div class="dayinfo">{{resultToday}}</div>
    <div class="user">您好，尊敬的{{role}}: <span>{{userName}}</span></div>
    <div class="welcome">欢迎使用壹本后台管理系统！</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      resultToday: '',
    }
  },
  computed: {
    ...mapState(['userTag', 'userName']),
    role() {
      const roleMap = {
        superadmin: '超级管理员',
        admin: '管理员',
        educator: '教务老师',
        teacher: '老师',
        operation: '运营专员',
        saler: '销售专员',
        hr: 'HR',
      };
      return roleMap[this.userTag];
    }
  },
  created() {
    this.getUserRoleInfo();
    this.getDay();
    this.fetchSchoolOptions();
  },
  mounted() {
  },
  methods:{
    ...mapMutations([
      'setUserName',
      'setUserTag',
      'setSchoolOptions',
    ]),
    getUserRoleInfo() {
      const phoneNumber = JSON.parse(localStorage.getItem('user_info_cloud1-0gvvdaq4c40b8f74')).content.phone_number.replace("+86", "").trim();
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'roleConfigManagePage',
          data: {
            pageNo: 1,
            pageSize: 10,
            condition: {
              name: '',
              phoneNumber: phoneNumber,
            },
          },
        }
      }).then(res => {
        console.log('roleConfigManagePage result:', res);
        if (res.result.success) {
          sessionStorage.setItem('userName', res.result.data.list[0].name);
          sessionStorage.setItem('userTag', res.result.data.list[0].roleList[0]);
          this.setUserTag(res.result.data.list[0].roleList[0]);
          this.setUserName(res.result.data.list[0].name);
        } else {
          this.$message({
            message: `暂未分配权限，请联系管理员`,
            type: 'warning'
          });
        }
      }).catch(err => {
        this.$message({
          message: `暂未分配权限，请联系管理员`,
          type: 'warning'
        });
        console.error('roleConfigManagePage error:', err)
      });
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
          message: '系统错误，请重新登录',
          type: 'error'
        });
        this.$router.push('/login');
      }
    },
    async fetchSchoolOptions() {
      console.log('schoolList call');
      this.$cloudbase.callFunction({
        name: 'operations',
        data: {
          type: 'schoolList',
          data: {},
        }
      }).then(res => {
        if (res.result.data) {
          const arr = [];
          res.result.data.forEach(ele => {
            arr.push({
              label: ele.detail.name,
              value: ele.schoolid
            });
          });
          sessionStorage.setItem('schoolOptions', JSON.stringify(arr));
          this.setSchoolOptions(arr);
        }
      }).catch(err => {
        console.error('schoolList error:', err)
      });
    },
    getDay() {
      // 获取当前时间
      const today = new Date();
      const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      // 获取年份、月份、日期、星期，拼接结果
      this.resultToday = `今天是${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 ${weekDays[today.getDay()]}`;
    },
  }
}
</script>

<style lang="less">
.home-page{
  .welcome{
    height: 40px;
    line-height: 40px;
    font-weight: 700;
    text-align: center;
  }
  .user{
    height: 40px;
    line-height: 40px;
    font-weight: 700;
    text-align: center;
    span{
      color: rgb(27, 114, 214);
    }
  }
  .dayinfo{
    margin-top: 100px;
    height: 40px;
    line-height: 40px;
    font-weight: 700;
    text-align: center;
  }
}
</style>