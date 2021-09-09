<template>
  <form
    action=""
    enctype="multipart/form-data"
    :method="method"
    class="form"
    novalidate
    @submit.prevent="validate"
  >
    <div class="form__inputs">
      <component
        v-for="input in inputs"
        :key="input.name"
        :is="getComponent(input.type)"
        v-bind="input"
        v-model="input.value"
      >
        <template #label>
          {{ input.label }}
        </template>
      </component>
    </div>
    <div class="form__buttons-container">
      <submit-button
        inner-color="var(--red)"
        height="50px"
        class="form__submit-button"
        type="submit"
      >
        <slot name="submit-text"></slot>
      </submit-button>
    </div>
  </form>
</template>

<script>
import TextInput from "./TextInput";
import PButton from "../UIComponents/PButton";

export default {
  name: "PForm",
  props: {
    method: {
      type: String,
      required: false,
      default: "post",
      validator: (value) => ["get", "post"].indexOf(value) !== -1,
    },
    inputs: {
      type: Array,
      required: true,
    },
  },

  computed: {
    getComponent() {
      return (type) => {
        switch (type) {
          case "number": {
            return "number-input";
          }
          case "textarea": {
            return "textarea-input";
          }
          default: {
            return "text-input";
          }
        }
      };
    },
  },

  components: {
    "text-input": TextInput,
    "submit-button": PButton,
  },

  methods: {
    validate() {
      let isCorrect = this.$children.reduce((acc, child) => {
        if (child.isCorrect === undefined) return acc;
        child.validate();
        acc &&= !!child.isCorrect;
        return acc;
      }, true);

      if (isCorrect) this.$emit("submit");
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
