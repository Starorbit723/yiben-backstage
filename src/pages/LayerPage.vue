<template>
  <div class="layerpage-content ls-content-wrapper">
    <div class="ls-title-lv1">图层（Layer）</div>
    <div class="ls-title-lv2 ls-top-30">什么是图层 ？</div>
    <div class="ls-text ls-top-20">
      <span class="ls-textfocus">图层</span>是Layer Scoper框架针对同一个页面内，不同的显示层级创建的独立区域的概念(类似于CSS: z-index的概念)<br>
      前端开发常见的图层场景，彼此之间大都通过DOM来物理性的隔离，例如：页面主体内容，弹框，侧浮层等。<br>
      为了保证交互体验，同一个用户操作中，视线只能跟随一个<span class="ls-textfocus">落焦点(Focus)</span>移动，因此以图层的维度来落焦更为合理，且容易被开发者理解。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example0.png" />
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example1.png" />
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example2.png" />
    </div>
    <div class="ls-title-lv2 ls-top-80">图层之间切换，唤醒图层 ？</div>
    <div class="ls-text ls-top-20">
      用户控制<span class="ls-textfocus">落焦点(Focus)</span>在图层之前切换，往往都伴随着图层的显示和隐藏，图层要随着焦点来<span class="ls-textfocus">唤醒(WakeUp)</span>或<span class="ls-textfocus">暂挂休眠</span>，如下图所示：
    </div>
    <div class="ls-text ls-top-20">
      各个图层的落焦点是独立记录的，当图层被<span class="ls-textfocus">唤醒(WakeUp)</span>时，自动会落焦到该图层最后一次行为的落焦位置，当然也可以手动来指定落焦点(Focus)。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example0.png" />
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example3.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayerPage',
}
</script>

<style>
</style>