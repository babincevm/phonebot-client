<template>
  <section class="auth">
    <div class="auth-form__container">
      <div class="auth-form__wrapper">
        <auth-form :inputs="loginInputs" @submit="submit">
          <template #submit-text>Войти</template>
        </auth-form>
      </div>
    </div>
  </section>
</template>

<script>
import PForm from "../../components/FormComponents/PForm/PForm";
import { mapActions } from "vuex";

export default {
  name: "Auth",
  components: {
    "auth-form": PForm,
  },
  data() {
    return {
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
    };
  },

  methods: {
    ...mapActions("user", ["authorize"]),

    submit() {
      let authData = this.loginInputs.map((i) => i.value);
      this.authorize(authData);
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
<style lang="scss">
body {
  width: 100vw;
  height: 100vh;
}

.tabs__list {
  position: relative;
  z-index: 2;
}
</style>
