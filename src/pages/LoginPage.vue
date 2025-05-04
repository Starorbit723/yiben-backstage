<template>
  <div class="loginpage-wrapper">
    <div class="login-zone">
      <div class="login-title">XXXXXXXXXXXXXXXXXX</div>
      <div class="input-zone">
        <div class="label">账&nbsp;&nbsp;&nbsp;号</div>
        <el-input class="phone" placeholder="请输入您注册的手机号" maxlength="11" v-model="phoneNumber" clearable>
          <template slot="prepend">+86</template>
        </el-input>
      </div>
      <div class="tips-zone">{{phoneError}}</div>
      <div class="input-zone">
        <div class="label">验证码</div>
        <el-input class="code" placeholder="6位验证码" maxlength="6" v-model="verfySMSCode" clearable></el-input>
        <el-button type="primary" style="margin-left:10px; width:150px;" :disabled="disabledSend" @click="sendSMSCode">{{btnText}}</el-button>
      </div>
      <div class="tips-zone">{{codeError}}</div>
      <el-button type="primary" style="width:80%; margin:20px 10% 0 10%;" @click="goToLogin">立即登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { userTags, isValidPhoneNumber, isValidSMSCode } from '@/utils/common.js'

export default {
  name: 'LoginPage',
  data() {
    return {
      phoneNumber: '',
      verfySMSCode: '',
      phoneError: '',
      codeError: '',
      disabledSend: false,
      sendTimer: null,
      secondNum: 60,
      smsResult: {},
      verification_token: '',
    }
  },
  computed: {
    ...mapState([
      'cache',
      'oauthInstance',
      'userInfo',
    ]),
    btnText() {
      if (this.secondNum !== 60) {
        return `${this.secondNum}秒后可再次发送`;
      }
      return '发送短信验证码';
    },
  },
  mounted() {
  },
  methods: {
    ...mapMutations([
      'setUserTag',
      'setLoginCache',
      'setOauthInstance',
      'setUserInfo',
    ]),
    async sendSMSCode() {
      if (this.secondNum !== 60) {
        this.$message({
          message: '60秒内只能发送一条哦',
          type: 'warning'
        });
      }
      if (!isValidPhoneNumber(this.phoneNumber)) {
        this.phoneError = '请确认您的手机号码是否正确';
      } else {
        this.phoneError = '';
        this.disabledSend = true;
        this.sendTimer = setInterval(() => {
          if (this.secondNum > 1) {
            this.secondNum -= 1;
          } else {
            this.secondNum = 60;
            clearInterval(this.sendTimer);
            this.sendTimer = null;
            this.disabledSend = false;
          }
        }, 1000);
        // 开始请求短信
        try {
        // 请求发送邮箱验证邮件
          const result = await this.$auth.getVerification({
            phone_number: `+86 ${this.phoneNumber}`,
          });
          console.log('验证发送成功:', result);
          this.$message({
            message: `短信已发送至${this.phoneNumber}，请注意查收`,
            type: 'success'
          });
          this.smsResult = result;
        } catch (error) {
          console.error('验证发送失败:', error);
          this.$message({
            message: '发送失败，请联系管理员',
            type: 'error'
          });
        }
      }
    },
    async goToLogin() {
      if (!isValidSMSCode(this.verfySMSCode)) {
        this.codeError = '请确认短信验证码是否正确';
      } else if (!isValidPhoneNumber(this.phoneNumber)) {
        this.phoneError = '请确认您的手机号码是否正确';
      } else {
        this.phoneError = '';
        this.codeError = '';
        try {
          const verificationTokenRes = await this.$auth.verify({
            verification_id: this.smsResult.verification_id,
            verification_code: this.verfySMSCode,
          });
          console.log('验证SMS成功:', verificationTokenRes);
          this.verification_token = verificationTokenRes.verification_token;
          this.signIn();
        } catch (e) {
          console.log('验证SMS失败:', e);
        }
      }
    },
    async signIn() {
      try {
        const signUpRes = await this.$auth.signIn({
          phone_number: `+86 ${this.phoneNumber}`,
          verification_code: this.verfySMSCode,
          verification_token: this.verification_token,
          // // 可选，设置昵称
          // name: "史长安",
          // // 可选，设置密码
          // password: "1234567890",
          // // 可选，设置登录用户名
          // username: "happysca",
        });
        console.log('登录成功:', signUpRes);
        const rights = JSON.parse(localStorage.getItem('user_info_cloud1-0gvvdaq4c40b8f74')).content.groups;
        rights.forEach(ele => {
          if (userTags.indexOf(ele.id) !== -1) {
            this.setUserTag(ele.id);
          }
        });
        this.$router.push('/manage/Home');
      } catch (e) {
        console.log('登录失败:', e);
      }
    },
  },
}

</script>

<style lang="less">
@import '../assets/style/common.less';

.loginpage-wrapper{
  position: relative;
  width: 100%;
  height: 100%;
  .login-zone{
    position: absolute;
    padding: 30px 30px 0;
    right: 10%;
    top: 50%;
    transform: translate(0, -55%);
    width: 360px;
    height: 300px;
    background: #FFF;
    border-radius: 6px;
    box-shadow: 0 0 6px rgba(0,0,0,0.2);
    .login-title{
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-bottom: 30px;
    }
    .input-zone{
      height: 40px;
      .label{
        float: left;
        width: 80px;
        line-height: 40px;
      }
      .phone{
        float: left;
        width: 270px;
      }
      .code{
        float: left;
        width: 110px;
      }
    }
    .tips-zone{
      height: 30px;
      line-height: 30px;
      text-indent: 90px;
      color: @warn-focus-color;
      font-size: 12px;
    }
  }
}

</style>