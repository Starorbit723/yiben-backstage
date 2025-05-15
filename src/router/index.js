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
			name: '登录',
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
				name: "Home",
				path: '/manage/home',
				component: r => require.ensure([], () => r(require('@/pages/HomePage')), 'HomePage'),
				meta: {
					name: '首页',
					showOnMenu: true,
					look: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					creat: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					edit: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr'],
					delete: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler', 'hr']
				},
			},
			{
				name: "UserManagement",
				path: '/manage/usermanagement',
				component: r => require.ensure([], () => r(require('@/pages/UserManagement')), 'UserManagement'),
				meta: {
					name: '用户管理',
					showOnMenu: true,
					look: ['superadmin', 'admin', 'educator'],
					creat: ['superadmin', 'admin', 'educator'],
					edit: ['superadmin', 'admin', 'educator'],
					delete: ['superadmin', 'admin']
				},
			},
			{
				name: "BookManagement",
				path: '/manage/bookmanagement',
				component: r => require.ensure([], () => r(require('@/pages/BookManagement')), 'BookManagement'),
				meta: {
					name: '预约管理',
					showOnMenu: true,
					look: ['superadmin', 'admin', 'educator', 'teacher', 'operation', 'saler'],
					creat: ['superadmin', 'admin', 'educator'],
					edit: ['superadmin', 'admin', 'educator'],
					delete: ['superadmin', 'admin']
				},
			},
			// {
			// 	name: "BookConfig",
			// 	path: 'bookconfig',
			// 	component: r => require.ensure([], () => r(require('@/pages/BookConfig')), 'BookConfig'),
			// 	meta: {
			// 		name: '预约配置',
			// 		look: ['superadmin', 'admin', 'educator'],
			// 		creat: ['superadmin', 'admin', 'educator'],
			// 		edit: ['superadmin', 'admin', 'educator'],
			// 		delete: ['superadmin', 'admin']
			// 	},
			// },
			{
				name: "TimeTable",
				path: '/manage/timetable',
				component: r => require.ensure([], () => r(require('@/pages/TimeTable')), 'TimeTable'),
				meta: {
					name: '课程管理',
					showOnMenu: true,
					look: ['superadmin', 'admin', 'educator', 'teacher'],
					creat: ['superadmin', 'admin', 'educator'],
					edit: ['superadmin', 'admin', 'educator'],
					delete: ['superadmin', 'admin']
				},
			},
			{
				name: "OperationManagement",
				path: '/manage/operationmanagement',
				component: r => require.ensure([], () => r(require('@/pages/OperationManagement')), 'OperationManagement'),
				meta: {
					name: '运营管理',
					showOnMenu: true,
					look: ['superadmin', 'admin', 'educator', 'operation'],
					creat: ['superadmin', 'admin', 'educator', 'operation'],
					edit: ['superadmin', 'admin', 'educator', 'operation'],
					delete: ['superadmin', 'admin']
				},
			},
			{
				name: "ResourceManagement",
				path: '/manage/resourcemanagement',
				component: r => require.ensure([], () => r(require('@/pages/ResourceManagement')), 'ResourceManagement'),
				meta: {
					name: '资源管理',
					showOnMenu: true,
					look: ['superadmin', 'admin', 'educator', 'operation'],
					creat: ['superadmin', 'admin', 'operation'],
					edit: ['superadmin', 'admin', 'operation'],
					delete: ['superadmin', 'admin']
				},
			},
			{
				name: "QuestionnaireManagement",
				path: '/manage/questionnairemanagement',
				component: r => require.ensure([], () => r(require('@/pages/QuestionnaireManagement')), 'QuestionnaireManagement'),
				meta: {
					name: '问卷管理',
					showOnMenu: true,
					look: ['superadmin', 'admin', 'educator', 'operation'],
					creat: ['superadmin', 'admin', 'operation'],
					edit: ['superadmin', 'admin', 'operation'],
					delete: ['superadmin', 'admin']
				},
			},
			{
				name: "QuestionnaireDetail",
				path: '/manage/questionnairedetail/:questionnaireId',
				component: r => require.ensure([], () => r(require('@/pages/QuestionnaireDetail')), 'QuestionnaireDetail'),
				meta: {
					name: '问卷详情',
					showOnMenu: false,
					look: ['superadmin', 'admin', 'educator', 'operation'],
					creat: ['superadmin', 'admin', 'operation'],
					edit: ['superadmin', 'admin', 'operation'],
					delete: ['superadmin', 'admin']
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

export default router;
