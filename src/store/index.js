import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 系统级别
    cache: {},
    oauthInstance: {},
    userInfo: {},
    // 权限级别
    userName: sessionStorage.getItem('userName') || '',
    userTag: sessionStorage.getItem('userTag') || '',
    Rlook: false,
    Rcreat: false,
    Redit: false,
    Rdelete: false,
    schoolOptions: JSON.parse(sessionStorage.getItem('schoolOptions')) || [],
  },
  mutations: {
    setLoginCache(state, data) {
      state.cache = data;
    },
    setOauthInstance(state, data) {
      state.oauthInstance = data;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    },
    setUserName(state, data) {
      state.userName = data;
    },
    setUserTag(state, data) {
      state.userTag = data;
    },
    setRlook(state, data) {
      state.Rlook = data;
    },
    setRcreat(state, data) {
      state.Rcreat = data;
    },
    setRedit(state, data) {
      state.Redit = data;
    },
    setRdelete(state, data) {
      state.Rdelete = data;
    },
    setSchoolOptions(state, data) {
      state.schoolOptions = data;
    },
    clearAllLoginCache(state) {
      state.cache = {};
      state.oauthInstance = {};
      state.userInfo = {};
      state.userTag = '';
      state.Rlook = false;
      state.Rcreat = false;
      state.Redit = false;
      state.Rdelete = false;
    },
  },
  getters: {
    getUserTag(state) {
      return state.userTag;
    },
  },
  actions: {
    doLogout() {
      console.log('doLogout');
    },
  }
});

export default store;