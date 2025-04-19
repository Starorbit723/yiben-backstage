import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
	{
		path: '/',
		name: '/',
		component: r => require.ensure([], () => r(require('@/pages/LoginPage')), 'LoginPage')
	},
	{
		path: '/login',
		name: 'login',
		component: r => require.ensure([], () => r(require('@/pages/LoginPage')), 'LoginPage')
	},
	{
		path: '/manage',
		name: 'manage',
		component: r => require.ensure([], () => r(require('@/pages/ManagePage')), 'ManagePage'),
		children: [
			{
				name: "UserManagement",
				path: 'usermanagement',
				component: r => require.ensure([], () => r(require('@/pages/UserManagement')), 'UserManagement')
			}
		]
	},
]

export default new Router({
  routes,
  mode: 'history',
	strict: process.env.NODE_ENV !== 'production',
});
