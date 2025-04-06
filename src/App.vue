<template>
  <div id="app">
    <nav>
      <NavMenu />
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'App',
  components: {
    NavMenu,
  }
}
</script>

<style lang="less">
@import './assets/style/common.less';
</style>
