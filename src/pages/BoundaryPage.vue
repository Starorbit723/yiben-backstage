<template>
  <div class="scopepage-content ls-content-wrapper">
    <div class="ls-title-lv1">边界（Boundary）</div>
    <div class="ls-title-lv2 ls-top-30">图层的边界？</div>
    <div class="ls-text ls-top-20">
      <span class="ls-textfocus">边界（Boundary）</span>是某一个<span class="ls-textfocus">图层(Layer)</span>范围的边缘，焦点可以在图层里游走，但是当触及图层边界时，就会被“挡住”，总不能出去吧？焦点出去了有个专有名词叫做“失焦”，这种情况在UED设计中时不被允许的。因此当焦点再次触碰边界时会出现回弹动效，就好像撞了墙壁一样，来提示用户已经不能再继续往这个方向移动了。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example10.png" />
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