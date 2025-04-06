<template>
  <div class="eventpage-content ls-content-wrapper">
    <div class="ls-title-lv1">事件绑定</div>
    <div class="ls-text ls-top-40">
      Layer Scoper会根据内置的属性来绑定事件，便于开发者来通过事件去驱动产品功能和逻辑。由于面向的使用场景大都是非触控型设备，事件主要都集中在<span class="ls-textfocus">“上、下、左、右等方向，确认，返回”</span>这几个按键上。Layer Scoper提供了很灵活的<span class="ls-textfocus">Attribute</span>绑定自定义方法以及接入方法，代码如下：
    </div>
    <div class="ls-block ls-top-20">
      <div class="ls-text">
        <span class="ls-textfocus">Attribute </span>作为Html的原生属性，可以绑定一个属性值，但只能接受<span class="ls-textfocus"> String </span>类型，不能传入<span class="ls-textfocus">Function</span>。因此绑定属性的值，其实是一个方法的"命名"，真正的方法是在初始化时根据"命名"值对应来传入到<span class="ls-textfocus">selfDefinedCallBackFn</span>中，当触发回调时根据"命名"值来找到对应的<span class="ls-textfocus">Function</span>触发回调。
      </div>
    </div>
    <div class="ls-title-lv2 ls-top-30">HTML</div>
    <CodeView :codeText="eventHtmlCode" :codeType="'html'"></CodeView>
    <div class="ls-title-lv2 ls-top-30">初始化绑定事件</div>
    <CodeView :codeText="eventJsCode" :codeType="'javascript'"></CodeView>
    <div class="ls-text ls-top-30">
      要注意的是，当一个DOM节点绑定了一个自定义的方法时，对应同类操作默认的回调就不会再触发了，例如：当<span class="ls-textfocus">goleft</span>绑定了<span class="ls-textfocus">this.selfGoLeftFn</span>这个自定义方法时，同样作为“左键”事件的<span class="ls-textfocus">cbFocusLeft: this.onFocusLeftCallback</span>就不会触发了。自定义方法的优先级是高于默认回调的，也是留给开发者一个完全自主控制的空间。
    </div>
  </div>
</template>

<script>
import CodeView from '@/components/CodeView.vue';
// import TableView from "@/components/TableView.vue";
import { eventHtml, eventJs } from '@/configData/eventbind/eventBindData.js';

export default {
  name: 'EventBindPage',
  components: {
    CodeView,
    // TableView,
  },
  data() {
    return {
      eventHtml,
      eventJs,
    }
  },
  computed: {
    eventHtmlCode() {
      return this.eventHtml;
    },
    eventJsCode() {
      return this.eventJs;
    },
  },
}
</script>

<style>
</style>