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
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
    }
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