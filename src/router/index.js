import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
	{
		path: '/',
		name: '/',
		component: r => require.ensure([], () => r(require('@/pages/HomePage')), 'HomePage')
	},
	{
		path: '/home',
		name: 'home',
		component: r => require.ensure([], () => r(require('@/pages/HomePage')), 'HomePage')
	},
	{
		path: '/start/install',
		name: 'install',
		component: r => require.ensure([], () => r(require('@/pages/InstallPage')), 'InstallPage')
	},
	{
		path: '/start/update',
		name: 'update',
		component: r => require.ensure([], () => r(require('@/pages/UpdatePage')), 'UpdatePage')
	},
	{
		path: '/idea/layer',
		name: 'layer',
		component: r => require.ensure([], () => r(require('@/pages/LayerPage')), 'LayerPage')
	},
	{
		path: '/idea/scope',
		name: 'scope',
		component: r => require.ensure([], () => r(require('@/pages/ScopePage')), 'ScopePage')
	},
	{
		path: '/idea/boundary',
		name: 'boundary',
		component: r => require.ensure([], () => r(require('@/pages/BoundaryPage')), 'BoundaryPage')
	},
	{
		path: '/use/init',
		name: 'init',
		component: r => require.ensure([], () => r(require('@/pages/InitPage')), 'InitPage')
	},
	{
		path: '/use/scroll',
		name: 'scroll',
		component: r => require.ensure([], () => r(require('@/pages/ScrollPage')), 'ScrollPage')
	},
	{
		path: '/use/eventbind',
		name: 'eventbind',
		component: r => require.ensure([], () => r(require('@/pages/EventBindPage')), 'EventBindPage')
	},
	{
		path: '/use/databind',
		name: 'databind',
		component: r => require.ensure([], () => r(require('@/pages/DataBindPage')), 'DataBindPage')
	},
	{
		path: '/use/callback',
		name: 'callback',
		component: r => require.ensure([], () => r(require('@/pages/CallbackPage')), 'CallbackPage')
	},
	{
		path: '/api/initcontroller',
		name: 'initcontroller',
		component: r => require.ensure([], () => r(require('@/pages/InitControllerPage')), 'InitControllerPage')
	},
	{
		path: '/api/addnewcontroller',
		name: 'addnewcontroller',
		component: r => require.ensure([], () => r(require('@/pages/AddNewControllerPage')), 'AddNewControllerPage')
	},
	{
		path: '/api/wakeup',
		name: 'wakeup',
		component: r => require.ensure([], () => r(require('@/pages/WakeUpPage')), 'WakeUpPage')
	},
	{
		path: '/api/gotofocus',
		name: 'gotofocus',
		component: r => require.ensure([], () => r(require('@/pages/GoToFocusPage')), 'GoToFocusPage')
	},
	{
		path: '/api/getlocationinfo',
		name: 'getlocationinfo',
		component: r => require.ensure([], () => r(require('@/pages/GetLocationInfo')), 'GetLocationInfo')
	},{
		path: '/api/setscopeselecteditem',
		name: 'setscopeselecteditem',
		component: r => require.ensure([], () => r(require('@/pages/SetScopeSelectedItem')), 'SetScopeSelectedItem')
	}
]

export default new Router({
  routes,
  mode: 'history',
	strict: process.env.NODE_ENV !== 'production',
});
