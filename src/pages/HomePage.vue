<template>
  <div class="home-page">
    <div class="dayinfo">{{resultToday}}</div>
    <div class="user">您好，尊敬的{{role}}: <span>{{userName}}</span></div>
    <div class="welcome">欢迎使用壹本后台管理系统！</div>
  </div>
</template>

<script>
import { userTags } from '@/utils/common';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      resultToday: '',
    }
  },
  computed: {
    ...mapState(['userTag']),
    userName() {
      if (localStorage.getItem('user_info_cloud1-0gvvdaq4c40b8f74')) {
        return JSON.parse(localStorage.getItem('user_info_cloud1-0gvvdaq4c40b8f74')).content.name;
      }
      return '';
    },
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
    this.getUserTag();
    this.getDay();
    this.fetchSchoolOptions();
  },
  mounted() {
  },
  methods:{
    ...mapMutations([
      'setUserTag',
      'setSchoolOptions',
    ]),
    getUserTag() {
      const rights = JSON.parse(localStorage.getItem('user_info_cloud1-0gvvdaq4c40b8f74')).content.groups;
      rights.forEach(ele => {
        if (userTags.indexOf(ele.id) !== -1) {
          this.setUserTag(ele.id);
        }
      });
    },
    async fetchSchoolOptions() {
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