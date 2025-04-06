<template>
  <div class="callbackpage-content ls-content-wrapper">
    <div class="ls-title-lv1">回调信息</div>
    <div class="ls-text ls-top-40">
      当某个节点的<span class="ls-textfocus">事件绑定(EventBind)</span>被触发时，开发者可以根据绑定到该节点的数据来进行后续的操作。<br />
      Layer Scoper在这方面给开发者返回了充足的节点信息，让开发者随时随地保持逻辑上的可控于灵活。
    </div>
    <div class="ls-title-lv2 ls-top-30">HTML</div>
    <CodeView :codeText="dataHtmlCode" :codeType="'html'"></CodeView>
    <div class="ls-title-lv2 ls-top-30">绑定数据到节点</div>
    <CodeView :codeText="dataJs" :codeType="'javascript'"></CodeView>
    <div class="ls-title-lv2 ls-top-30">cbData - 你要的都给你</div>
    <TableView :tableData="callbackData" />
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import { dataHtml, dataJs } from '@/configData/databind/dataBindData.js';
import callbackData from "@/configData/callback/callbackTableData.json";

export default {
  name: 'CallbackPage',
  components: {
    CodeView,
    TableView,
  },
  data() {
    return {
      dataHtml,
      dataJs,
      callbackData,
    }
  },
  computed: {
    dataHtmlCode() {
      return this.dataHtml;
    },
    dataJsCode() {
      return this.dataJs;
    },
  },
}
</script>

<style>
</style>