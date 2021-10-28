import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import helpers from "./helpers";

Vue.config.productionTip = false;
helpers.setPolyfills();
Vue.directive("style-props", function (el, { value }) {
  for (let property in value) {
    if (!Object.prototype.hasOwnProperty.call(value, property)) {
      continue;
    }
    if (value[property] === null) {
      el.style.removeProperty(property);
      continue;
    }

    el.style.setProperty(`--${property}`, value[property]);
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
