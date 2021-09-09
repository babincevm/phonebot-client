<template>
  <div class="smooth-background__container" v-show="el">
    <div class="smooth-background__wrapper">
      <div class="smooth-background" ref="background"></div>
    </div>
  </div>
</template>

<script>
import { setStyleProperty } from "../../helpers/functions.mjs";

export default {
  name: "SmoothBackground",
  props: {
    el: {
      type: Element,
      required: false,
      default: null,
    },
    background: {
      type: String,
      required: false,
      default: "var(--red)",
    },
  },

  mounted() {
    if (!this.$refs.background) return;
    setStyleProperty(this.$refs.background, {
      property: "background",
      value: this.background,
    });
  },

  updated() {
    if (!this.$refs.background) return;
    setStyleProperty(this.$refs.background, [
      {
        property: "top",
        value: `${this.el.offsetTop}px`,
      },
      {
        property: "height",
        value: `${this.el.clientHeight}px`,
      },
      {
        property: "width",
        value: `${this.el.clientWidth}px`,
      },
      {
        property: "left",
        value: `${this.el.offsetLeft}px`,
      },
    ]);
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
