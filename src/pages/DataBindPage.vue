<template>
  <div class="databindpage-content ls-content-wrapper">
    <div class="ls-title-lv1">数据绑定</div>
    <div class="ls-text ls-top-40">
      Web应用技术发展至今，<span class="ls-textfocus">数据绑定</span>以及数据驱动才是渲染的核心。大多数的应用场景下数据会以<span class="ls-textfocus">同步</span>或<span class="ls-textfocus">异步</span>方式来绑定到DOM节点上，当某个节点的<span class="ls-textfocus">事件绑定(EventBind)</span>被触发时，开发者可以根据绑定到该节点的数据来进行后续的操作。
    </div>
    <div class="ls-block ls-top-20">
      <div class="ls-text">
        <span class="ls-textfocus">Attribute</span> 只能接收字符串，因此binddata只能传字符串类型的数据，即便传了<span class="ls-textfocus">Number</span>，最终也会被转换成<span class="ls-textfocus">String</span>。为了保证数据的类型不会在绑定过程中改变，建议使用Object包裹，并转化成JSON来绑定。
      </div>
    </div>
    <div class="ls-title-lv2 ls-top-30">HTML</div>
    <CodeView :codeText="dataHtmlCode" :codeType="'html'"></CodeView>
    <div class="ls-title-lv2 ls-top-30">绑定数据到节点</div>
    <CodeView :codeText="dataJs" :codeType="'javascript'"></CodeView>
    <div class="ls-text ls-top-30">
      DOM节点绑定数据之后，数据去了那里？怎么回传给开发者？开发者还能知道哪些信息？详见<router-link :to="{ name: 'callback'}"><span class="ls-textfocus">回调</span></router-link>。
    </div>
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
import { dataHtml, dataJs } from '@/configData/databind/dataBindData.js';

export default {
  name: 'DataBindPage',
  components: {
    CodeView,
  },
  data() {
    return {
      dataHtml,
      dataJs,
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