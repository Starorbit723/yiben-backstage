import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	cache: {},
	oauthInstance: {},
	userInfo: {},
	userTag: 'admin',
	Rlook: false,
  Rcreat: false,
	Redit: false,
	Rdelete: false
};

const mutations = {
	setLoginCache(state, data) {
		state.cache = data;
	},
	setOauthInstance(state, data) {
		state.oauthInstance = data;
	},
	setUserInfo(state, data) {
		state.userInfo = data;
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
};

const getters = {
	getUserTag() {
		return state.userTag;
	},
};

const actions = {
};

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
})
