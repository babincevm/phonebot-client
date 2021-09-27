<template>
  <div class="user-info__container">
    <div class="user-info__wrapper">
      <user-form
        method="post"
        @submit="changeUserData"
        :inputs="inputs"
        :skeleton="isLoading"
      >
        <template #buttons>
          <p-button
            type="submit"
            inner-color="var(--green)"
            height="50px"
            class="form__submit-button"
            :skeleton="isLoading"
          >
            Сохранить
          </p-button>
          <p-button
            type="button"
            inner-color="var(--red)"
            height="50px"
            class="form__submit-button"
            :skeleton="isLoading"
            @click="setInputValues"
          >
            Сбросить
          </p-button>
        </template>
      </user-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PForm from "@/components/FormComponents/PForm/PForm";
import PButton from "@/components/UIComponents/PButton/PButton";

export default {
  name: "Profile",

  data() {
    return {
      isLoading: true,
      inputs: [
        {
          label: "Логин",
          name: "username",
          value: null,
          required: true,
        },
        {
          label: "Имя",
          name: "name",
          value: null,
          required: true,
        },
        {
          label: "E-mail",
          name: "email",
          value: null,
          required: true,
          email: true,
        },
        {
          label: "Телефон",
          name: "phone",
          value: null,
          required: true,
          phone: true,
        },
        {
          label: "Возраст",
          name: "age",
          value: null,
          required: true,
          numeric: true,
          min: 5,
          max: 100,
        },
        {
          label: "Дата рождения",
          type: "date",
          name: "birthdate",
          value: null,
          required: true,
        },
      ],
    };
  },

  methods: {
    ...mapActions("user", ["fetchProfile"]),

    changeUserData(...props) {
      console.log(props);
    },

    setInputValues() {
      this.inputs.forEach((input) => {
        switch (input.type) {
          case "date": {
            this.$set(input, "value", new Date(this.getUserData[input.name]));
            break;
          }
          default: {
            this.$set(input, "value", this.getUserData[input.name]);
          }
        }
      });
    },
  },

  computed: {
    ...mapGetters("user", ["getUserData"]),
  },

  components: {
    "user-form": PForm,
    "p-button": PButton,
  },

  async mounted() {
    await this.fetchProfile();
    this.setInputValues();
    this.isLoading = false;
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
