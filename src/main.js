import Vue from 'vue';
import App from './App.vue';
import VueResource from "vue-resource";
import router from "./configs/routes";
import axios from './configs/axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

Vue.prototype.$http = axios;


const app = new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})


