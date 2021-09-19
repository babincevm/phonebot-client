<template>
  <aside
    class="corner-popup__container"
    :class="`corner-popup__container--${position}`"
    @click="$emit('close')"
  >
    <div class="corner-popup__wrapper">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Popup",
  props: {
    position: {
      type: String,
      required: false,
      default: "tr",
      validation: (v) => ["tr", "tl", "br", "bl"].indexOf(v) !== -1,
    },
    timeShown: {
      type: Number,
      required: false,
      default: 5000,
    },
  },

  mounted() {
    setTimeout(() => this.$emit("close"), this.timeShown);
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
