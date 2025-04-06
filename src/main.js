import Vue from 'vue'
import App from './App'
import cloudbase from "@cloudbase/js-sdk"
import router from './router'
import store from './store'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'


Vue.component('PrismEditor', PrismEditor)
Vue.config.productionTip = false;

Vue.prototype.$cloudbase = cloudbase.init({
	env: "cloud1-0gvvdaq4c40b8f74",
	clientId: "AAU5PwABE-ooYTmgFWo" // 应用ID
});
// console.log('app', this.$cloudbase);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})