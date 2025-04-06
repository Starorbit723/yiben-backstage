<template>
  <div class="ls-content-wrapper">
    <div class="ls-title-lv1">手动移动焦点</div>
    <div class="ls-title-lv2 ls-top-30">goToFocus()</div>
    <div class="ls-text ls-top-30">
      Layer Scoper对于<span class="ls-textfocus">落焦点(Focus)</span>有自己的一套默认思路，整体上来说是按照用户的按键操作，从视觉上计算出最近的可落焦的点，并且自动移动过去。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example6.png" />
    </div>
    <div class="ls-text ls-top-30">
      对于一些特殊的交互过程，交互设计师可能会要求开发者在某个环节<span class="ls-textfocus">强制移动焦点(goToFocus)</span>到某个特殊位置，那么Layer Scoper为开发者<br />提供了一个方便快捷的Api支持。如下示例，当某个焦点不能按照常规逻辑移动，可以通过此Api来轻松实现：
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example7.png" />
    </div>
    <CodeView class="ls-top-40" :codeText="gotoFocusHtml" :codeType="'html'"></CodeView>
    <CodeView :codeText="gotoFocusJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-block ls-top-30">
      <ul class="ls-list-content">
        <li>Q：<span class="ls-textfocus">goToFocus()</span>的调用时间点或者生命周期有限制么？<br />
        A：没有任何限制，只要传入<span class="ls-textfocus">targetY，targetX</span>是一个实际存在的，可受控的(<span class="ls-textfocus">.scope .incontroll</span>)的DOM即可。<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;否则控制台会报错，提示开发者没有找到该点，因此要确保该DOM结构已经存在之后，再移动焦点。</li>
        <li class="ls-top-20">Q：<span class="ls-textfocus">goToFocus()</span>支持落焦到其它没有被唤醒的图层里么？<br />
        A：不支持。如果想落焦到别的图层里可以通过<span class="ls-textfocus">wakeUp()</span>方法先唤醒图层并且指定希望落焦的点坐标来达到该效果。</li>
      </ul>
    </div>
    <div class="ls-title-lv2 ls-top-30">参数文档</div>
    <TableView class="ls-top-30" :tableData="goToFocusTableData" />
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import { gotoFocusHtml, gotoFocusJs } from '@/configData/apilist/codeData.js';
import goToFocusTableData from "@/configData/apilist/goToFocusTableData.json";

export default {
  name: 'GoToFocusPage',
  components: {
    CodeView,
    TableView,
  },
  data() {
    return {
      goToFocusTableData,
      gotoFocusHtml,
      gotoFocusJs,
    }
  },
  computed: {
    gotoFocusHtmlCode() {
      return this.gotoFocusHtml;
    },
    gotoFocusJsCode() {
      return this.gotoFocusJs;
    },
  },
}
</script>

<style>
</style>