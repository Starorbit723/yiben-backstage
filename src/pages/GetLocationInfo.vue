<template>
  <div class="ls-content-wrapper">
    <div class="ls-title-lv1">获取当前落焦点的信息</div>
    <div class="ls-title-lv2 ls-top-30">getLocationInfo()</div>
    <div class="ls-text ls-top-30">
      Layer Scoper永远关注焦点的变化，因此在每次用户有操作行为的时候，回调方法里都会将落焦点的所在DOM的各种信息以及绑定的数据返回给开发者。<br />
      当用户错失某个回调的时机，但是又想知道当前的焦点在哪个位置坐标时，可以手动通过调用此Api来获得当前焦点坐标。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example0.png" />
    </div>
    <CodeView class="ls-top-40" :codeText="getLocationInfoHtmlCode" :codeType="'html'"></CodeView>
    <CodeView :codeText="getLocationInfoJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-block ls-top-30">
      <ul class="ls-list-content">
        <li>Q：<span class="ls-textfocus">getLocationInfo()</span>获得坐标信息和图层的唤醒/休眠有关联么？<br />
        A：没有关联，但是本质上<span class="ls-textfocus">“有且仅有一个落焦点(Focus)”</span>所以获得焦点的坐标一定是当前处于激活状态图层里的那个Focus坐标值</li>
      </ul>
    </div>
    <div class="ls-title-lv2 ls-top-30">参数文档</div>
    <TableView class="ls-top-30" :tableData="getLocationInfoTableData" />
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import { getLocationInfoHtml, getLocationInfoJs } from '@/configData/apilist/codeData.js';
import getLocationInfoTableData from "@/configData/apilist/getLocationInfoTableData.json";

export default {
  name: 'GetLocationInfoPage',
  components: {
    CodeView,
    TableView,
  },
  data() {
    return {
      getLocationInfoTableData,
      getLocationInfoHtml,
      getLocationInfoJs,
    }
  },
  computed: {
    getLocationInfoHtmlCode() {
      return this.getLocationInfoHtml;
    },
    getLocationInfoJsCode() {
      return this.getLocationInfoJs;
    },
  },
}
</script>

<style>
</style>