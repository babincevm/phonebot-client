import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import helpers from "./helpers";

Vue.config.productionTip = false;
helpers.setPolyfills();
let y = {
  a: {
    b: "b",
    c: "c",
  },
  d: "d",
};
y.flatten();
console.log(y);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
