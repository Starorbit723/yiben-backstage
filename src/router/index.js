import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/*
	【Meta Rights】
	superadmin: 超级管理员
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
			look: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			creat: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			edit: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			delete: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr']
		},
	},
	{
		path: '/login',
		name: 'login',
		component: r => require.ensure([], () => r(require('@/pages/LoginPage')), 'LoginPage'),
		meta: {
			look: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			creat: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			edit: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
			delete: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr']
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
					look: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					creat: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					edit: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					delete: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr']
				},
			},
			{
				name: "UserManagement",
				path: 'usermanagement',
				component: r => require.ensure([], () => r(require('@/pages/UserManagement')), 'UserManagement'),
				meta: {
					look: ['superadmin', 'admin', 'educator'],
					creat: ['superadmin', 'admin', 'educator'],
					edit: ['superadmin', 'admin', 'educator'],
					delete: ['superadmin', 'admin']
				},
			},
			{
				name: "BookManagement",
				path: 'bookmanagement',
				component: r => require.ensure([], () => r(require('@/pages/BookManagement')), 'BookManagement'),
				meta: {
					look: ['superadmin', 'admin', 'educator'],
					creat: ['superadmin', 'admin', 'educator'],
					edit: ['superadmin', 'admin', 'educator'],
					delete: ['superadmin', 'admin']
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
					rights: ['superadmin', 'admin', 'educator','hr']
				},
			},
			{
				name: "OperationManagement",
				path: 'operationmanagement',
				component: r => require.ensure([], () => r(require('@/pages/OperationManagement')), 'OperationManagement'),
			},
			{
				name: "ResourceManagement",
				path: 'resourcemanagement',
				component: r => require.ensure([], () => r(require('@/pages/ResourceManagement')), 'ResourceManagement'),
			}
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
