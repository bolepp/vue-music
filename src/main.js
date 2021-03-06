import'babel-polyfill' // 解决ie9和一些低版本的高级浏览器对es6新语法并不支持的问题，并能支持ES6所有的新方法
import Vue from 'vue'
import App from './App'
import router from './router'  //引入到vue实例
import fastclick from 'fastclick' // 点击300毫秒延迟
import 'common/scss/index.scss'
import VueLazyload from 'vue-lazyload'
import store from './store'

/* eslint-disable no-unused-vars*/
import VConsole from 'vconsole'
var vConsole = new VConsole()  // 上线注释掉
console.log(vConsole) // 上线注释掉

// if (process.env.NODE_ENV === 'production') { // 来判断是不是生产环境？
//   fastclick.attach(document.body)
// }
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.gif')
})  

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,     //引入到vue实例
  store,
  template: '<App/>',
  components: { App }
})
