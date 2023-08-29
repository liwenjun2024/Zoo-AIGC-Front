import { layout } from './../src/app';
export default [
  {
    name: '登录',
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './User/Login' }],
  },
  {name:'注册', path:'/user/register', layout:false, component: './User/Register'},
  { name: '首页', path: '/welcome', icon: 'smile', component: './Welcome' },
  { name: 'AI对话', path: '/ai_chat', icon: 'smile', component: './Dialogue/AI_chat' },
  { name: '测试页面', path: '/textindex', icon: 'smile', component: './textIndex' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
