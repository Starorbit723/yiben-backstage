import store from '@/store/index.js';

export const RightMixin = {
  data() {
    return {
    };
  },
  computed: {
    Rlook() {
      return store.state.Rlook;
    },
    Rcreat() {
      return store.state.Rcreat;
    },
    Redit() {
      return store.state.Redit;
    },
    Rdelete() {
      return store.state.Rdelete;
    },
  },
  beforeRouteEnter (to, from, next) {
    if (!store.getters.getUserTag && from.path !== '/login') {
      next({ name: 'login', replace: true });
      return;
    }
    if (to.meta.creat.indexOf(store.getters.getUserTag) !== -1) {
      store.commit('setRcreat', true);
    } else {
      store.commit('setRcreat', false);
    }
    if (to.meta.edit.indexOf(store.getters.getUserTag) !== -1) {
      store.commit('setRedit', true);
    } else {
      store.commit('setRedit', false);
    }
    if (to.meta.delete.indexOf(store.getters.getUserTag) !== -1) {
      store.commit('setRdelete', true);
    } else {
      store.commit('setRdelete', false);
    }
    if (to.meta.look.indexOf(store.getters.getUserTag) !== -1 && from.path !== '/login') {
      store.commit('setRlook', true);
      console.log('look:', store.state.Rlook, '| creat:', store.state.Rcreat, '| edit:', store.state.Redit, '| delete:', store.state.Rdelete);
      next();
    } else {
      store.commit('setRlook', false);
      next({ name: 'login', replace: true });
    }
  },
  methods: {
  },
  created() {
  }
};