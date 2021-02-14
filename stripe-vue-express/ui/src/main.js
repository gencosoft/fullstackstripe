import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATKL-LBKPSIX_1GNGTT-8hXpB3CjVYGRU",
  authDomain: "fullstackstripe-auth.firebaseapp.com",
  projectId: "fullstackstripe-auth",
  storageBucket: "fullstackstripe-auth.appspot.com",
  messagingSenderId: "677352918694",
  appId: "1:677352918694:web:e1c4d43ff719105fdcee67",
};

firebase.initializeApp(firebaseConfig);

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
