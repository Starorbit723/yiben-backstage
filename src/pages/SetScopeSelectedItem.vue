<template>
  <div class="ls-content-wrapper">
    <div class="ls-title-lv1">设置选中态</div>
    <div class="ls-title-lv2 ls-top-30">setScopeSelectedItem()</div>
    <div class="ls-text ls-top-30">
      正常非触控/鼠标场景下（例如：电视遥控器，键盘操作），一个视觉元素（DOM）常见有三种状态：<br />
      <span class="ls-textfocus">· 默认态</span>：没有高亮或者放大显示的状态，该状态下表示焦点没有移动到，没有被选择或者不可被操作<br />
      <span class="ls-textfocus">· 焦点态</span>：表示当前用户正在操作中的某个元素，一般会高亮或者放大突出显示<br />
      <span class="ls-textfocus">· 选中态</span>：当有一些元素被用户暂时选中时（最常见的就是Tab切换或者是筛选选择器），焦点虽然移动走了，但是希望留存一个特殊的样式告知用户当前的选项<br /><br />
      选中态（.incontroll .selected）有一个特点就是同一个Scope内只支持一个元素被选中，每当设置了一个新的选中态，旧的就会被清除。<br /><br />
      与移动焦点协同: 当焦点被移动到某一个带有记忆功能的区块（.scoped .remembered）时，会优先找到选中态（.incontroll .selected）的元素并与之重合获焦。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example8.png" />
      <img src="../assets/images/layer-example9.png" />
    </div>
    <CodeView class="ls-top-40" :codeText="setScopeSelectedItemHtmlCode" :codeType="'html'"></CodeView>
    <CodeView :codeText="setScopeSelectedItemJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-block ls-top-30">
      <ul class="ls-list-content">
        <li>Q：<span class="ls-textfocus">setScopeSelectedItem()</span>手动设置选中态与图层的唤醒/休眠有关联么？<br />
        A：没有关联，可以跨图层来随意修改任何一个Scope的选中态，但是同一个Scope选中态只有一个，指定了新的，旧的就被替换没了。</li>
      </ul>
    </div>
    <div class="ls-title-lv2 ls-top-30">参数文档</div>
    <TableView class="ls-top-30" :tableData="setScopeSelectedItemTableData" />
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import { setScopeSelectedItemHtml, setScopeSelectedItemJs } from '@/configData/apilist/codeData.js';
import setScopeSelectedItemTableData from "@/configData/apilist/setScopeSelectedItemTableData.json";

export default {
  name: 'GetLocationInfoPage',
  components: {
    CodeView,
    TableView,
  },
  data() {
    return {
      setScopeSelectedItemTableData,
      setScopeSelectedItemHtml,
      setScopeSelectedItemJs,
    }
  },
  computed: {
    setScopeSelectedItemHtmlCode() {
      return this.setScopeSelectedItemHtml;
    },
    setScopeSelectedItemJsCode() {
      return this.setScopeSelectedItemJs;
    },
  },
}
</script>

<style>
</style>