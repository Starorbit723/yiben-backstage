import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/*
	【Meta Rights】
	superAdmin: 超级管理员
	admin: 管理员
	educator: 教务
	teacher: 老师
	operation: 运营
	saler: 销售
	hr: 人力资源
*/ 
const routes = [
	{
		path: '/',
		name: '/',
		component: r => require.ensure([], () => r(require('@/pages/LoginPage')), 'LoginPage'),
		meta: {
			look: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			creat: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			edit: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			delete: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr']
		},
	},
	{
		path: '/login',
		name: 'login',
		component: r => require.ensure([], () => r(require('@/pages/LoginPage')), 'LoginPage'),
		meta: {
			look: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			creat: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			edit: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			delete: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr']
		},
	},
	{
		path: '/manage',
		name: 'manage',
		component: r => require.ensure([], () => r(require('@/pages/ManagePage')), 'ManagePage'),
		children: [
			{
				path: 'home',
				name: "home",
				component: r => require.ensure([], () => r(require('@/pages/HomePage')), 'HomePage'),
				meta: {
					look: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					creat: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					edit: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					delete: ['superAdmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr']
				},
			},
			{
				name: "UserManagement",
				path: 'usermanagement',
				component: r => require.ensure([], () => r(require('@/pages/UserManagement')), 'UserManagement'),
				meta: {
					look: ['superAdmin', 'admin', 'educator'],
					creat: ['superAdmin', 'admin', 'educator'],
					edit: ['superAdmin', 'admin', 'educator'],
					delete: ['superAdmin', 'admin']
				},
			},
			{
				name: "BookManagement",
				path: 'bookmanagement',
				component: r => require.ensure([], () => r(require('@/pages/BookManagement')), 'BookManagement'),
				meta: {
					look: ['superAdmin', 'admin', 'educator'],
					creat: ['superAdmin', 'admin', 'educator'],
					edit: ['superAdmin', 'admin', 'educator'],
					delete: ['superAdmin', 'admin']
				},
			},
			{
				name: "BookConfig",
				path: 'bookconfig',
				component: r => require.ensure([], () => r(require('@/pages/BookConfig')), 'BookConfig'),
			},
			{
				name: "TimeTable",
				path: 'timetable',
				component: r => require.ensure([], () => r(require('@/pages/TimeTable')), 'TimeTable'),
				meta: {
					rights: ['superAdmin', 'admin', 'educator','hr']
				},
			},
		]
	},
]

const router = new Router({
	routes,
	mode: 'history',
	strict: process.env.NODE_ENV !== 'production',
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
})

export default router;
