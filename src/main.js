import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import cloudbase from "@cloudbase/js-sdk";
import router from './router';
import store from './store';
import eventBus from "./utils/eventBus.js";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$cloudbase = cloudbase.init({
	env: "cloud1-0gvvdaq4c40b8f74",
	clientId: "AAU5PwABE-ooYTmgFWo" // 应用ID
});
Vue.prototype.$auth = Vue.prototype.$cloudbase.auth();
Vue.prototype.$bus = eventBus;

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
});