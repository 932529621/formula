import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/font.css'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import moment from 'moment';
//挂载到原型
Vue.prototype.$moment = moment ;
Vue.prototype.$axios=axios;
Vue.use(vuetify);
Vue.use(Vuelidate);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("http://localhost:3000", {
      transports: ["websocket"],
    }),
     options: {     //Optional options, 
      autoConnect:false, //关闭自动连接，在用户登录后在连接。
    }

  })
);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  
  render: h => h(App)
}).$mount('#app')
