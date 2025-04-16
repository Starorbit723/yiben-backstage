import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	cache: {},
	oauthInstance: {},
	userInfo: {}
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
	}
};

const getters = {
};

const actions = {
};

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
})
