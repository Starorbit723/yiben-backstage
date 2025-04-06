<template>
  <div class="scrollpage-content ls-content-wrapper">
    <div class="ls-title-lv1">图层滚动</div>
    <div class="ls-text ls-top-40">
      Layer Scoper会根据<span class="ls-textfocus"> 焦点(Focus) </span>来控制<span class="ls-textfocus"> 图层(Layer) </span>内部的滚动，滚动方向分为<span class="ls-textfocus">水平方向(horizontal)</span>和<span class="ls-textfocus">竖直方向(vertical)</span>，但不能同时存在两种滚动。<br /><br />
      滚动的本质是：可视区域小于内容区的尺寸，因此在DOM层级上需要额外嵌套一层，来达到滚动的效果。<br /><br />
      可以滚动的内容需要用<span class="ls-textfocus">class: map-incontroll-scroll</span>来包裹, 同时支持显示/隐藏/自定义滚动条的样式。<br /><br />
      Layer Scoper会根据<span class="ls-textfocus"> 焦点(Focus) </span>的位置，自动计算图层内部需要滚动多少距离，达到视觉居中的效果，使<span class="ls-textfocus">焦点(Focus)</span>能够被用户视线捕获，并跟随意愿来移动，大大提升用户的交互体验。
    </div>
    <div class="ls-title-lv2 ls-top-30">HTML</div>
    <CodeView :codeText="scrollHtmlCode" :codeType="'html'"></CodeView>
    <div class="ls-title-lv2 ls-top-30">初始化图层滚动</div>
    <div class="ls-text ls-top-20">
      Layer Scoper会通过<span class="ls-textfocus"> initController() </span>来初始化这个图层关于滚动的一些配置项。
    </div>
    <CodeView :codeText="scrollJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-title-lv2 ls-top-30">初始化参数</div>
    <TableView :tableData="scrollData" />
    <div class="ls-title-lv1 ls-top-80">区域滚动</div>
    <div class="ls-text ls-top-40">
      在一个<span class="ls-textfocus"> 图层(Layer) </span>中，个别的<span class="ls-textfocus">区域(Scope)</span>也会出现需要滚动的场景，例如：广告区域，Banner位等。因此针对<span class="ls-textfocus"> 区域(Scope) </span>维度也需要有内容溢出的滚动方案。<br ><br >
      那么可以用<span class="ls-textfocus">class: scoped + scrollzone</span>来表示这是一个"可以滚动的"区域。 由于该区域(Scope)需要支持滚动，DOM层级上也需要多嵌套一层，并且用<span class="ls-textfocus">class: scoped-incontroll-scroll</span>来包裹，代码如下：
    </div>
    <div class="ls-title-lv2 ls-top-30">HTML</div>
    <CodeView :codeText="scrollzoneHtmlCode" :codeType="'html'"></CodeView>
    <div class="ls-text ls-top-40">
      可以滚动的<span class="ls-textfocus">区域(Scope)</span>有可能出现在可滚动<span class="ls-textfocus"> 图层(Layer) </span>中中，因此会出现<span class="ls-textfocus">滚动套滚动</span>的问题，Layer Scoper会对二者进行独立计算，互不干扰，各自独立计算滚动的距离，统一遵循<span class="ls-textfocus"> 焦点(Focus) </span>趋向可视区居中的方案。
    </div>
    <div class="ls-text ls-top-40">
      唯一要注意的是，区域的滚动需要保证<span class="ls-textfocus">class: scoped + scrollzone</span>这个DOM层级的CSS被设置为<span class="ls-textfocus">overflow-y: scroll</span>和<span class="ls-textfocus">overflow-x: scroll</span>，否则是不会出现滚动效果的。<br /><br />
      <span class="ls-textfocus">Layer Scoper </span>并未对区域的滚动来设置滚动条的样式修改，一般都是系统默认滚动条外观(可能会很丑 -_-！)。这里可以让开发着自行来决定，主要是处于以下几点考虑:
    </div>
    <ul class="ls-list-content ls-top-10">
      <li>页面内某一个功能区域的滚动，大都很少出现滚动条，非常的不美观，会被开发者/UI设计师隐藏</li>
      <li>页面的整体内容的滚动方向，一般和页面内某个区域的滚动方法刚好相反，如此更容易让焦点在不同的功能区域间游走</li>
      <li>过度封装因人而异的外观，会让开发者用额外的CSS来复写，渲染性能会降低，无用代码会大大增加</li>
    </ul>
    <div class="ls-text ls-top-20">
      如果开发者想手动修改<span class="ls-textfocus">class: scoped + scrollzone</span>的滚动条样式，以下CSS代码可以参考:
    </div>
    <CodeView :codeText="scrollzoneCssCode" :codeType="'css'"></CodeView>
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import scrollData from "@/configData/scroll/scrollTableData.json";
import { scrollHtml, scrollJs, scrollzoneHtml, scrollzoneCss } from '@/configData/scroll/codeData.js';

export default {
  name: 'ScrollPage',
  components: {
    CodeView,
    TableView,
  },
  data() {
    return {
      scrollData,
      scrollHtml,
      scrollJs,
      scrollzoneHtml,
      scrollzoneCss,
    }
  },
  computed: {
    scrollHtmlCode() {
      return this.scrollHtml;
    },
    scrollJsCode() {
      return this.scrollJs;
    },
    scrollzoneHtmlCode() {
      return this.scrollzoneHtml;
    },
    scrollzoneCssCode() {
      return this.scrollzoneCss;
    },
  },
}
</script>

<style lang="less" scoped>
.scrollpage-content{

}
</style>