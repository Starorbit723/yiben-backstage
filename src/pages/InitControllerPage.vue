<template>
  <div class="ls-content-wrapper">
    <div class="ls-title-lv1">初始化</div>
    <div class="ls-title-lv2 ls-top-30">initController()</div>
    <div class="ls-text ls-top-30">
      用户初始化Layer Scoper实例，同一个页面的生命周期内只需要初始化一次。第一次初始化时至少要有一个<span class="ls-textfocus">图层(Layer)</span>，并且要有一个默认的<span class="ls-textfocus">落焦点（Focus）</span>。<br /><br />初始化实例时，要确保DOM已经挂在完成，否则会报错提示没有找到DOM结构，导致初始化失败。<br /><br />如果该图层需要滚动，可以设置滚动的方向<span class="ls-textfocus">水平方向(horizontal)</span>和<span class="ls-textfocus">竖直方向(vertical)</span>，但一个图层只能支持一个方向。
    </div>
    <CodeView :codeText="initControllerJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-title-lv2 ls-top-50">参数文档</div>
    <TableView :tableData="initControllerData" />
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import { initControllerJs } from '@/configData/apilist/codeData.js';
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
      initControllerJs,
    }
  },
  computed: {
    initControllerJsCode() {
      return this.initControllerJs;
    },
  },
}
</script>

<style>
</style>