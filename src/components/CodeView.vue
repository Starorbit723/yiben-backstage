<template>
  <div class="codeview-content">
    <pre :class="'language-'+codeType" v-html="codeContent"></pre>
  </div>
</template>

<script>
import 'prismjs/themes/prism.css'
// 引入插件
import Prism from "prismjs"
// 引入插件对应主题样式
// import 'prismjs/themes/prism-twilight.min.css'

export default {
  name: 'CodeView',
  props: {
    codeText: {
      type: String
    },
    codeType: {
      type: String // html/javascript/css
    },
  },
  data() {
    return {
      text: `
        import { ScopeController } from 'utils/scopeController';
        const controllerCase = new ScopeController();
        <div class="aa"></div>
      `,
      codeContent: '',
    }
  },
  mounted () {
		this.transfHighlightCode()
	},
	methods: {
		/**
		 * 转换高亮显示代码
		 */
		transfHighlightCode () {
      this.codeContent = Prism.highlight(this.codeText, Prism.languages[this.codeType], this.codeType);
		},
  }
}
</script>

<style lang="less" scoped>
.codeview-content{
  margin-top: 20px;
  color: #FFF;
  code{
    width: 100%;
    height: 100%;
    font-size: 16px;
    line-height: 30px;
  }
}
</style>
