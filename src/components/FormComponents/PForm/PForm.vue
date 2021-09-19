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
        :skeleton="skeleton"
      >
        <template #label>
          {{ input.label }}
        </template>
      </component>
    </div>
    <div class="form__buttons-container">
      <slot name="buttons" v-if="$slots.buttons" />
      <submit-button
        v-else
        inner-color="var(--red)"
        height="50px"
        class="form__submit-button"
        type="submit"
        :skeleton="skeleton"
      >
        <slot v-if="$slots.submitText" name="submit-text" />
      </submit-button>
    </div>
  </form>
</template>

<script>
import TextInput from "../TextInput/TextInput";
import PButton from "../../UIComponents/PButton/PButton";

export default {
  name: "PForm",
  props: {
    method: {
      type: String,
      required: false,
      default: "post",
      validator: (value) => ["get", "post"].indexOf(value.toLowerCase()) !== -1,
    },
    inputs: {
      type: Array,
      required: true,
    },
    skeleton: {
      type: Boolean,
      required: false,
      default: false,
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

    getData() {
      return this.inputs.reduce((acc, val) => {
        if (val.name in acc) {
          if (Array.isArray(acc[val.name])) {
            acc[val.name].push(val.value);
          } else {
            acc[val.name] = [acc[val.name], val.value];
          }
        } else {
          acc[val.name] = val.value;
        }
        return acc;
      }, {});
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
        if (child.validate === undefined) return acc;
        child.validate();
        acc &&= !!child.isCorrect;
        return acc;
      }, true);

      if (isCorrect) this.$emit("submit", this.getData);
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
