<template>
  <section class="ui">
    <div class="ui__form-example">
      <p-form :inputs="inputs">
        <template #submit-text>валидация</template>
      </p-form>
    </div>
  </section>
</template>

<script>
import PForm from "@/components/FormComponents/PForm/PForm";

export default {
  name: "UIFormComponents",
  components: {
    "p-form": PForm,
  },
  data() {
    return {
      inputs: [
        {
          label: "Обязательный текстовый инпут",
          name: "requiredTextInput",
          required: true,
        },
        {
          label: "Текстовый инпут",
          name: "textInput",
        },
        {
          label: "Email",
          name: "emailInput",
          required: true,
          email: true,
        },
        {
          label: "Телефон",
          name: "phoneInput",
          required: true,
          phone: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
