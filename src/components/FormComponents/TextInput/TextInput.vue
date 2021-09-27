<template>
  <div class="input__container">
    <div
      class="input__wrapper"
      ref="wrapper"
      :class="{
        'input__wrapper--has-value':
          (currentValue === null && value !== null) ||
          (!isFocused && currentValue.trim().length > 0),
        'input__wrapper--correct': isCorrect === true,
        'input__wrapper--incorrect': isCorrect === false,
        'input__wrapper--focused': isFocused,
      }"
      v-if="value !== null"
    >
      <input
        :type="type"
        :name="name"
        :id="name"
        ref="input"
        :placeholder="placeholder"
        class="input"
        @input="input"
        @focusin="focus"
        @focusout="focusout"
        v-model="currentValue"
      />
      <label :for="name" v-if="$slots.label" class="input__label">
        <span>
          <slot name="label"></slot>
          <span class="input__label-required" v-if="required">*</span>
        </span>
      </label>
    </div>
    <skeleton v-else></skeleton>
  </div>
</template>

<script>
import Skeleton from "@/components/UIComponents/Skeleton/Skeleton";

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
    min: {
      type: Number,
      required: false,
      default: null,
    },
    max: {
      type: Number,
      required: false,
      default: null,
    },
    value: {
      type: [String, Number],
      required: false,
      default: "",
    },
    skeleton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      isCorrect: null,
      isFocused: false,
      currentValue: null,
    };
  },

  methods: {
    focus() {
      this.isFocused = true;
    },
    focusout() {
      this.currentValue = this.currentValue.trim();
      this.isFocused = false;
      this.validate();
    },

    validate() {
      this.isCorrect =
        this.validateRequired() &&
        this.validateAlphabetic() &&
        this.validateNumeric() &&
        this.validateMinValue() &&
        this.validateMaxValue() &&
        this.validateMinLength() &&
        this.validateMaxLength() &&
        this.validateEmail() &&
        this.validatePhone() &&
        this.validateCustom();
    },

    input() {
      this.validate();
      this.$emit("input", this.currentValue);
    },

    validateRequired() {
      if (!this.required) return true;
      return this.currentValue.length > 0;
    },
    validateAlphabetic() {
      if (!this.alphabetic) return true;
      return !/\d+/.test(this.currentValue);
    },
    validateNumeric() {
      if (!this.numeric) return true;
      return !/\D+/.test(this.currentValue);
    },
    validateMinLength() {
      if (!this.minLength) return true;
      return this.currentValue.length > this.minLength;
    },
    validateMaxLength() {
      if (!this.maxLength) return true;
      return this.currentValue.length < this.maxLength;
    },
    validatePhone() {
      if (!this.phone) return true;
      return /^((?:\+7|[78])[ \-(]{0,2}9\d{2}[ \-)]{0,2}\d{3}[ -]?\d{2}[ -]?\d{2})$/.test(
        this.currentValue
      );
    },
    validateEmail() {
      if (!this.email) return true;
      // RFC 2822 standard email validation
      return /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9A-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(
        this.currentValue
      );
    },
    validateCustom() {
      if (!this.validator) return true;
      if (Array.isArray(this.validator)) {
        return this.validator.reduce(
          (acc, validator) => acc && validator(this.currentValue),
          true
        );
      }
      return this.validator(this.currentValue);
    },

    validateMinValue() {
      if (!this.min) return true;
      return this.currentValue > this.min;
    },
    validateMaxValue() {
      if (!this.max) return true;
      return this.currentValue < this.max;
    },

    setValue(value) {
      this.currentValue = value?.toString();
      if (!this.currentValue) return;
      this.validate();
    },
  },

  components: {
    skeleton: Skeleton,
  },

  mounted() {
    this.setValue(this.value?.toString());
  },

  watch: {
    value: function (current) {
      this.setValue(current);
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
