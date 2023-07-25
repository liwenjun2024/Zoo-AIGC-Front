export default [
  { name:'登录', path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { name:'欢迎页面', path: '/welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员页面',
    routes: [
      { name: '管理员1', path: '/admin', redirect: '/admin/sub-page' },
      { name: '管理员2', path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
