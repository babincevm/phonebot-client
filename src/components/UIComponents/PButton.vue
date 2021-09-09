<template>
  <button class="button" :type="type" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
import helpers from "@/helpers/";
export default {
  name: "PButton",
  props: {
    size: {
      type: String,
      required: false,
      default: null,
    },
    width: {
      type: String,
      required: false,
      default: "100%",
    },
    height: {
      type: String,
      required: false,
      default: "100%",
    },
    borderColor: {
      type: String,
      required: false,
      default: "unset",
    },
    innerColor: {
      type: String,
      required: false,
      default: "transparent",
    },
    circle: {
      type: Boolean,
      required: false,
      default: false,
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: "button",
    },
  },

  methods: {
    setProps() {
      helpers.setStyleProperty(this.$el, [
        {
          property: "button-width",
          value: this.size ?? this.width,
        },
        {
          property: "button-height",
          value: this.size ?? (this.circle ? this.width : this.height),
        },
        {
          property: "button-color",
          value: this.borderColor,
        },
        {
          property: "button-background",
          value: this.innerColor,
        },
        {
          property: "border-radius",
          value: this.circle ? "50%" : this.rounded ? "20%" : "0",
        },
      ]);
    },
  },

  mounted() {
    this.setProps();
  },

  updated() {
    this.setProps();
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
