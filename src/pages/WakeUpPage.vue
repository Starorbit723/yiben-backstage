<template>
  <div class="ls-content-wrapper">
    <div class="ls-title-lv1">唤醒图层</div>
    <div class="ls-title-lv2 ls-top-30">wakeUp()</div>
    <div class="ls-text ls-top-30">
      当Layer Scoper实例下有多个<span class="ls-textfocus">图层(Layer)</span>时，由于我们遵循了<span class="ls-textfocus">“有且仅有一个落焦点(Focus)”</span>可以被用户控制的原则。当一个图层被开发者控制展示了出来，我们把这个动作叫做<span class="ls-textfocus">唤醒(wakeUp)</span>一个图层，同时焦点也要跟着进入被唤醒的图层。<br /><br />
      如下图示意，当侧浮层被<span class="ls-textfocus">唤醒(wakeUp)</span>时，<span class="ls-textfocus">落焦点(Focus)</span>也一并移动到了侧浮层内，之前的页面主体图层就暂时已经入了休眠状态，但是休眠状态的图层里的数据和内容仍然可以被开发者同步或者异步修改更新，只是暂时不受控而已。
    </div>
    <div class="ls-image ls-image50 ls-top-30">
      <img src="../assets/images/layer-example3.png" />
    </div>
    <CodeView class="ls-top-40" :codeText="wakeUpHtmlCode" :codeType="'html'"></CodeView>
    <CodeView :codeText="wakeUpJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-block ls-top-30">
      <ul class="ls-list-content">
        <li>Q：唤醒图层有Api，为什么没有休眠图层的Api？<br />
        A：由于我们遵循了<span class="ls-textfocus">“有且仅有一个落焦点(Focus)”</span>可以被用户控制的原则，焦点跟随图层来移动，也就是同一个时间，有且仅<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有一个图层被唤醒，其它图层自然都是休眠，开发者只要关心当前唤醒的是哪个图层就行了。</li>
        <li class="ls-top-20">Q：唤醒图层时，希望的落焦点坐标<span class="ls-textfocus">targetY，targetX</span>如果不存在怎么办？<br />
        A：Layer Scoper会报错，提示唤醒图层失败，落焦点还是会停留在之前的图层里。</li>
      </ul>
    </div>
    <div class="ls-title-lv2 ls-top-30">参数文档</div>
    <TableView class="ls-top-30" :tableData="wakeUpTableData" />
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import TableView from "@/components/TableView.vue";
import { wakeUpHtml, wakeUpJs } from '@/configData/apilist/codeData.js';
import wakeUpTableData from "@/configData/apilist/wakeUpTableData.json";

export default {
  name: 'InitControllerPage',
  components: {
    CodeView,
    TableView,
  },
  data() {
    return {
      wakeUpTableData,
      wakeUpHtml,
      wakeUpJs,
    }
  },
  computed: {
    wakeUpHtmlCode() {
      return this.wakeUpHtml;
    },
    wakeUpJsCode() {
      return this.wakeUpJs;
    },
  },
}
</script>

<style>
</style>