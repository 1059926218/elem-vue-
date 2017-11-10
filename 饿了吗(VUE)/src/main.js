// main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

// 导入css
import './assets/base.css'
import './assets/font-awesome-4.7.0/css/font-awesome.css'

import axios from 'axios';
Vue.prototype.http = axios;

Vue.use(VueRouter)
// 默认在点击和 click事件触发之间有300ms的延迟
// fastclick 可以避免移动端浏览器点击延迟
import FastClick from 'fastclick'
// 设置作用范围
FastClick.attach(document.body)

import {Actionsheet,AlertPlugin} from 'vux'
// 插件 使用弹窗
Vue.use(AlertPlugin)
// 注册为全局组件
Vue.component('Actionsheet',Actionsheet)





import Wechat from './components/Wechat.vue'
import Message from './components/Message.vue'
import Explore from './components/Explore.vue'
import News from './components/News.vue'
//import LunBo from './components/LunBo.vue'
import Adress from './components/Adress.vue'
const routes = [   
  { path: '/wechat', component: Wechat },
  { path: '/message', component: Message },
  { path: '/explore', component: Explore },
  { path: '/news', component: News },
  { path: '/adress',component:Adress},
  // 二级界面
//{ path: '/wechat/lunbo', component: LunBo }
]

const router = new VueRouter({
  routes
})
router.push('/wechat')

// 创建vue 实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
