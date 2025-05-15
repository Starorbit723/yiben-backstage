<template>
  <div class="questionnairedetail-page">
    {{questionnaireId}}
  </div>
</template>

<script>
import { RightMixin } from "@/plugins/mixin.js";

export default {
  name: 'QuestionnaireDetail',
  mixins: [ RightMixin ],
  data() {
    return {
      questionnaireId: '',
    }
  },
  created() {
    this.questionnaireId = this.$route.params.questionnaireId;
  },
  mounted() {
    
  },
  methods:{
    
  }
}
</script>

<style lang="less">
.questionnairedetail-page{
  
}
</style>