<template>
  <section class="auth">
    <div class="auth-form__container">
      <tabs :tabs="tabs" @changeTab="changeTab"></tabs>
      <transition-group
        name="slide-x-vars"
        tag="div"
        style="display: flex; height: 100%; position: relative"
        @before-enter="beforeEnter"
      >
        <div class="auth-form__wrapper" key="0" v-show="activeTab === 0">
          <auth-form :inputs="loginInputs" @submit="submit">
            <template #submit-text>Войти</template>
          </auth-form>
        </div>
        <div class="auth-form__wrapper" v-show="activeTab === 1" key="1">
          <auth-form :inputs="registerInputs">
            <template #submit-text>Зарегестрироваться</template>
          </auth-form>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import PForm from "../../components/FormComponents/PForm";
import PTabs from "../../components/UIComponents/PTabs";
import { setStyleProperty } from "../../helpers/functions.mjs";
import { mapActions } from "vuex";

export default {
  name: "Auth",
  components: {
    "auth-form": PForm,
    tabs: PTabs,
  },
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          id: 0,
          name: "Вход",
        },
        {
          id: 1,
          name: "Регистрация",
        },
      ],
      loginInputs: [
        {
          name: "login",
          type: "text",
          required: true,
          label: "Логин",
        },
        {
          name: "password",
          type: "password",
          required: true,
          label: "Пароль",
        },
      ],
      registerInputs: [
        {
          name: "email",
          type: "email",
          required: true,
          email: true,
          label: "E-mail",
        },
        {
          name: "login",
          type: "text",
          required: true,
          label: "Логин",
        },
        {
          name: "password",
          type: "password",
          required: true,
          label: "Пароль",
        },
        {
          name: "repeat_password",
          type: "password",
          required: true,
          label: "Повторите пароль",
        },
      ],
    };
  },

  methods: {
    ...mapActions("user", ["authorize"]),
    changeTab(active) {
      this.activeTab = active;
    },

    beforeEnter() {
      let isToLeft = this.activeTab === 0;
      setStyleProperty(this.$root.$el, [
        {
          property: "translate-enter-form",
          value: `${isToLeft ? "-100" : "100"}%`,
        },
        {
          property: "translate-leave-to",
          value: `${isToLeft ? "100" : "-100"}%`,
        },
      ]);
    },

    submit() {
      let authData = this.loginInputs.map((i) => i.value);
      this.authorize(authData);
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
<style lang="scss">
.tabs__list {
  position: relative;
  z-index: 2;
}
</style>
