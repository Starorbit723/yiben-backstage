<template>
  <div class="home-page ls-content-wrapper">
    <img class="logo" src="../assets/images/logo.png" />
    <div class="ls-text ls-top-40">
      <span class="ls-textfocus">Layer Scoper</span> 是一款面向智能电视等非触控式设备中Web场景设计的外骨骼框架。<br /><br />
      随着Web响应式适配的发展以及性能提升，越来越多的应用会引入一部分Web-Html来进行与原生混合开发。Web模式开发在产品快速迭代，热更新等方面拥有更灵活的优势。<br /><br />
      但是随之而来的问题就暴露在Web浏览器内核本身并非为非触控式设备而生，大多数Web应用都是建立在鼠标点击(OnClick)，手指点击(OnTap)，滚动(OnScroll)，滑动(OnTouchMove)等场景来触发交互。<br /><br />
      Web内核面向电视遥控器，方向控制器，第三方硬件控制器等非触控设备，并没有任何硬件适配的支持，非常不利于用户交互操作。<br /><br />
      <span class="ls-textfocus">Layer Scoper</span> 因此而生! 解决了用户只通过<span class="ls-textfocus">“上，下，左，右，确认，返回”</span>六个键值来进行Web页面交互的问题，简单，高效，灵活易用。
      <span class="ls-textfocus">Layer Scoper</span>核心设计理念，包含以下三大优势:
    </div>
    <div class="ls-title-lv2 ls-top-20">对开发者和用户双向友好，学习成本很低，兼容性极强。所见即所得，"键"随心动的体验感受。</div>
    <div class="ls-title-lv2">不依赖于任何开发框架，Java Script原生级别封装，多种方式引入，一键式初始化，开箱即用。</div>
    <div class="ls-title-lv2">代码体量极小但功能强大，内置API丰富，生命周期预留充分，以开发者视角来设计的代码架构。</div>
    <a class="start-btn" href="/start/install">让我们开始吧</a>
    <div @click="verificationEmail">发送</div>
    <input v-model="verfySMSCode" />
    <div @click="verfySMS">验证</div>
  </div>
</template>

<script>
import Vue from 'vue'
// import cloudbase from "@cloudbase/js-sdk"

// const app = cloudbase.init({
// 	env: "cloud1-0gvvdaq4c40b8f74",
// 	clientId: "AAU5PwABE-ooYTmgFWo" // 应用ID
// });

// console.log('app', app);
// const auth = this.$cloudbase.auth();
// const phoneNumber = "+86 15011540723";
// const verification = await auth.getVerification({
//   phone_number: phoneNumber,
// });
// console.log('verification', verification);

const auth = Vue.prototype.$cloudbase.auth();
console.log('aaaaa', auth);

export default {
  name: 'HomePage',
  data() {
    return {
      verfySMSCode: '',
      verification_token: '',
    }
  },
  mounted() {
    console.log('cloudbase', this.$cloudbase); // 将会输出 1
    
    // verification();
    // this.$cloudbase.callFunction({
    //   name: "utils",
    //   // 云函数2.0 参数
    //   type: "wxId",
    //   data: {},
    // }).then((res) => {
    //   const result = res.result; //云函数执行结果
    //   console.log(result);
    // });
    // this.verificationEmail();
  },
  methods:{
    async verificationEmail() {
      // const auth = this.$cloudbase.auth();
      const phoneNumber = "+86 15365652382";
      // const verification = await auth.getVerification({
      //   phone_number: phoneNumber,
      // });
      // const email = "790936393@qq.com";
      // const verification = await auth.getVerification({
      //   email: email,
      // });
      // verification();
      try {
        // 请求发送邮箱验证邮件
        const result = await auth.getVerification({
          phone_number: phoneNumber,
          // email: email,
        });
        console.log('验证发送成功:', result);
        this.smsResult = result;
        // this.verfySMS(result);
      } catch (error) {
        console.error('验证发送失败:', error);
      }
    },
    async verfySMS() {
      console.log('verfySMS smsResult', this.smsResult);
      // const auth = this.$cloudbase.auth();
      // 验证验证码的正确性
      try {
        const verificationTokenRes = await auth.verify({
          verification_id: this.smsResult.verification_id,
          verification_code: this.verfySMSCode,
        });
        console.log('验证SMS成功:', verificationTokenRes);
        this.verification_token = verificationTokenRes.verification_token;
        this.signIn();
      } catch (e) {
        console.log('验证SMS失败:', e);
      }
    },
    async signIn() {
      try {
        // const signInRes = await auth.signIn({
        //   username: '+86 15365652382',
        //   verification_token: this.verification_token,
        // });
        const signUpRes = await auth.signUp({
          phone_number: '+86 15365652382',
          verification_code: this.verfySMSCode,
          verification_token: this.verification_token,
          // 可选，设置昵称
          name: "史长安",
          // 可选，设置密码
          password: "1234567890",
          // 可选，设置登录用户名
          username: "happysca",
        });
        console.log('登录成功:', signUpRes);
      } catch (e) {
        console.log('登录失败:', e);
      }
      
    },
  }
}
</script>

<style lang="less">
@import '../assets/style/common.less';
.home-page{
  padding-top: 20px;
  .logo{
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 200px;
  }
  .start-btn{
    display: block;
    margin: 80px auto;
    width: 160px;
    height: 46px;
    line-height: 46px;
    border-radius: 23px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #FFF;
    letter-spacing: 1px;
    background-color: @theme-fu-color100;
  }
  .start-btn:hover{
    background-color: @theme-fu-color75;
  }
}
</style>