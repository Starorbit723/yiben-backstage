<template>
  <div class="initpage-content ls-content-wrapper">
    <div class="ls-title-lv1">初始化</div>
    <div class="ls-text ls-top-40">
      Layer Scoper会根据<span class="ls-textfocus"> id </span>来收录一个<span class="ls-textfocus">图层(Layer)</span>，进而根据CSS类名<span class="ls-textfocus">class: scoped</span>来收录该图层内的<span class="ls-textfocus">区域(Scope)</span>，创建树形的数据结构。区域内的可以用于落焦的点，需要用<span class="ls-textfocus">class: incontroll</span>来标识，顾名思义incontroll的含义是"受控的，可落焦的"。<br/><br/>
      同一个图层(Layer)下的区域(Scope)大多数情况下不止一个，因此为了区分以及更新，需要给每一个区域(Scope)添加一个Attribute作为编号标识, 例如：scope="1", scope="2"。scope的传入值类型为<span class="ls-textfocus">Number/Float</span>，原因自然是为了在同一个图层(Layer)内比数值大小。从页面视觉来看的话，从上到下scope值是依次增大的，但不能相同或重复。
    </div>
    <div class="ls-title-lv2 ls-top-30">HTML</div>
    <CodeView :codeText="initHtmlCode" :codeType="'html'"></CodeView>
    <div class="ls-title-lv2 ls-top-30">引入实例</div>
    <div class="ls-text ls-top-20">
      Layer Scoper会通过<span class="ls-textfocus"> initController() </span>来创建根实例，完成初始化。初始化需要在<span class="ls-textfocus">DOM挂载完成后</span>才能执行或者是通过<span class="ls-textfocus">$nextTick(() => {})</span>下一个渲染周期来执行。
    </div>
    <CodeView :codeText="initJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-title-lv2 ls-top-30">初始化参数</div>
    <TableView :tableData="initData" />
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import initData from "@/configData/init/initTableData.json";
import { initHtml, initJs } from '@/configData/init/codeData.js';

export default {
  name: 'InitPage',
  components: {
    CodeView,
    TableView,
  },
  data() {
    return {
      initData,
      initHtml: initHtml,
      initJs: initJs,
    }
  },
  computed: {
    initHtmlCode() {
      return this.initHtml;
    },
    initJsCode() {
      return this.initJs;
    }
  },
}
</script>

<style lang="less" scoped>
.initpage-content{

}
</style>