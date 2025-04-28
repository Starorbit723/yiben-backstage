<template>
  <div class="manage-page">
    <Header></Header>
    <div class="router-zone" :style="{ height: vheight }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'ManagePage',
  components: {
    Header
  },
  data() {
    return {
      
    }
  },
  computed: {
    vheight() {
      return `${window.innerHeight - 60}px`;
    }
  },
  mounted() {
    
  },
  methods:{
    
  }
}
</script>

<style lang="less">
.manage-page{
  height: 100%;
  .router-zone{
    width: 100%;
    overflow-y: scroll;
  }
}
</style>