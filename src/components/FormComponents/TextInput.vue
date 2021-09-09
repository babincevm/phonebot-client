<template>
  <div class="input__container">
    <div
      class="input__wrapper"
      ref="wrapper"
      :class="{
        'input__wrapper--has-value':
          !this.isFocused && this.value.trim().length > 0,
        'input__wrapper--correct': this.isCorrect === true,
        'input__wrapper--incorrect': this.isCorrect === false,
        'input__wrapper--focused': this.isFocused,
      }"
    >
      <input
        :type="type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        class="input"
        @input="$emit('input', value)"
        @focusin="focus"
        @focusout="focusout"
        v-model="value"
      />
      <label :for="name" v-if="$slots.label" class="input__label">
        <span>
          <slot name="label"></slot>
          <span class="input__label-required">{{ this.required && "*" }} </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    type: {
      type: String,
      required: false,
      default: "text",
      validator: (value) =>
        ["text", "tel", "email", "password"].indexOf(value) !== -1,
    },
    name: {
      type: String,
      required: true,
    },
    errorText: {
      type: String,
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    validator: {
      type: [Array, Function],
      required: false,
      default: null,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    email: {
      type: Boolean,
      required: false,
      default: false,
    },
    phone: {
      type: Boolean,
      required: false,
      default: false,
    },
    minLength: {
      type: Number,
      required: false,
      default: null,
    },
    maxLength: {
      type: Number,
      required: false,
      default: null,
    },
    alphabetic: {
      type: Boolean,
      required: false,
      default: false,
    },
    numeric: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      value: "",
      isCorrect: null,
      isFocused: false,
      needValidation: false,
    };
  },

  methods: {
    focus() {
      this.isFocused = true;
    },
    focusout() {
      this.isFocused = false;
      this.value = this.value.trim();
      this.needValidation = this.value.length > 0;
      this.validate();
    },

    validate() {
      if (!this.needValidation) return;
      this.isCorrect =
        this.validateRequired() &&
        this.validateAlphabetic() &&
        this.validateNumeric() &&
        this.validateMinLength() &&
        this.validateMaxLength() &&
        this.validateEmail() &&
        this.validatePhone() &&
        this.validateCustom();
    },

    validateRequired() {
      if (!this.required) return true;
      return this.value?.length > 0;
    },
    validateAlphabetic() {
      if (!this.alphabetic) return true;
      return /\w+/.test(this.value);
    },
    validateNumeric() {
      if (!this.numeric) return true;
      return /\d+/.test(this.value);
    },
    validateMinLength() {
      if (!this.minLength) return true;
      return this.value?.length > this.minLength;
    },
    validateMaxLength() {
      if (!this.maxLength) return true;
      return this.value?.length < this.maxLength;
    },
    validatePhone() {
      if (!this.phone) return true;
      return /^((?:\+7|[78])[ \-(]{0,2}9\d{2}[ \-)]{0,2}\d{3}[ -]?\d{2}[ -]?\d{2})$/.test(
        this.value
      );
    },
    validateEmail() {
      if (!this.email) return true;
      // RFC 2822 standard email validation
      return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        this.value
      );
    },
    validateCustom() {
      if (!this.validator) return true;
      if (Array.isArray(this.validator)) {
        return this.validator.reduce(
          (acc, validator) => acc && validator(this.value),
          true
        );
      }
      return this.validator(this.value);
    },
  },

  watch: {
    value: function () {
      this.validate();
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
