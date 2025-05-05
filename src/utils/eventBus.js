import Vue from 'vue';

const eventBus = new Vue({
    methods: {
      emit(event, ...args) { // 发布
        this.$emit(event, ...args);
      },
      on(event, callback) { // 接收
        this.$on(event, callback);
      },
      off(event, callback) { // 销毁
        this.$off(event, callback);
      }
    }
  });

export default eventBus;