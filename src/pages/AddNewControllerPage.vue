<template>
  <div class="ls-content-wrapper">
    <div class="ls-title-lv1">添加新的图层</div>
    <div class="ls-title-lv2 ls-top-30">addNewController()</div>
    <div class="ls-text ls-top-30">
      用户初始化Layer Scoper实例，同一个页面的生命周期内只需要初始化一次。后续如果希望添加一个新的<span class="ls-textfocus">图层(Layer)</span>可以随时通过调用<span class="ls-textfocus">addNewController()</span>方法同步添加新图层，由于每个图层的能力都是平行相同的，也是各自独立的。所以方法出传入的参数其实和<span class="ls-textfocus">初始化 initController()</span>的参数是完全相同的。<br /><br />
      要注意的是：<span class="ls-textfocus">添加新图层 addNewController()</span>的方法必须在初始化<span class="ls-textfocus">初始化 initController()</span>完成之后才能调用，否则不会生效。<br /><br />
      如下示例：在原有的页面中，添加一个对话弹框图层，与页面图层彼此独立。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example1.png" />
    </div>
    <CodeView :codeText="addNewControllerHtmlCode" :codeType="'html'"></CodeView>
    <CodeView :codeText="addNewControllerJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-block ls-top-30">
      <ul class="ls-list-content">
        <li>Q：添加完了新的图层，但是并没有立刻展示到页面上啊？<br />
        A：图层添加是指在DOM维度上，该图层可被Layer Scoper控制。但是具体这个图层需要什么时候展示隐藏，应该由开发者自行控制。<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;也就是说，即便DOM是暂时不可见的（display: none），也可以随时被添加于Layer Scoper实例当中。</li>
        <li class="ls-top-20">Q：添加完了新的图层，原有图层上的设置与配置会被修改吗？<br />
        A：每个图层都是各自平行且独立，一个页面只需要一个Layer Scoper实例，但是一个实例下的图层可以有无数个，互相不干扰。</li>
        <li class="ls-top-20">Q：新的图层展示出来，此时的焦点还停留在之前的图层里，怎么办？<br />
        A：新的图层被展示出来了，Layer Scoper遵循了<span class="ls-textfocus">“有且仅有一个落焦点(Focus)”</span>的原则，可以通过<span class="ls-textfocus">wakeUp(唤醒)</span>方法来将焦点切换到<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开发者需要交互的新图层内，详见<router-link :to="{ name: 'wakeup'}"><span class="ls-textfocus">wakeUp 唤醒</span></router-link>。</li>
      </ul>
    </div>
    <div class="ls-title-lv2 ls-top-30">参数文档</div>
    <TableView class="ls-top-30" :tableData="initControllerData" />
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import { addNewControllerHtml, addNewControllerJs } from '@/configData/apilist/codeData.js';
import initControllerData from "@/configData/apilist/initControllerTableData.json";

export default {
  name: 'InitControllerPage',
  components: {
    CodeView,
    TableView,
  },
  data() {
    return {
      initControllerData,
      addNewControllerHtml,
      addNewControllerJs,
    }
  },
  computed: {
    addNewControllerHtmlCode() {
      return this.addNewControllerHtml;
    },
    addNewControllerJsCode() {
      return this.addNewControllerJs;
    },
  },
}
</script>

<style>
</style>