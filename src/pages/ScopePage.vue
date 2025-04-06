<template>
  <div class="scopepage-content ls-content-wrapper">
    <div class="ls-title-lv1">区域（Scope）</div>
    <div class="ls-title-lv2 ls-top-30">图层里的区域？</div>
    <div class="ls-text ls-top-20">
      <span class="ls-textfocus">区域(scope)</span>是在某一个<span class="ls-textfocus">图层(Layer)</span>内，不同的逻辑功能分区，每一个<span class="ls-textfocus">区域(scope)</span>一般都是一个独立的展示模块，功能可能大不相同。<br>
      常见的功能区域可能有导航栏，广告栏，内容列表，链接跳转，其它二级页面入口等。<br>
      为了保证交互体验，同一个同层也只能有一个<span class="ls-textfocus">落焦点(Focus)</span>来跟随用户视线去移动，因此落焦点会在不同的区域(scope)之间移动。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example4.png" />
    </div>
    <div class="ls-title-lv2 ls-top-80">区域之间切换</div>
    <div class="ls-text ls-top-20">
      用户控制<span class="ls-textfocus">落焦点(Focus)</span>在不同区域之前切换，每个区域都可以支持设置不同的焦点移动规则，来便于用户更快的操作，如下图所示：
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example5.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScopePage',
}
</script>

<style>
</style>