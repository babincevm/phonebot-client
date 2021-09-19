import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import helpers from "./helpers";

Vue.config.productionTip = false;
helpers.setPolyfills();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
