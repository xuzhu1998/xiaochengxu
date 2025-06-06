import Vue from 'vue'
import App from './App'
import {Base} from "./common/Base.js"
import share from './common/share.js'
// #ifndef VUE3
Vue.config.productionTip = false
Vue.prototype.$base=new Base()
Vue.mixin(share)
App.mpType = 'app'
const app = new Vue({
    ...App,share
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}


// #endif