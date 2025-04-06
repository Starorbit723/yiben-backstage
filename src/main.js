import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'


Vue.component('PrismEditor', PrismEditor)
Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})