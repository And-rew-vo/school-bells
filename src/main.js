import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

let url = new URL(window.location.href);

const socket = new VueSocketIO({
  debug: false,
  connection: `${url.protocol}//${url.hostname}:3000`,
  withCredentials: true,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
});

Vue.use(socket);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
