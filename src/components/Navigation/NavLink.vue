<template>
  <li
    class="navigation__link-wrapper"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div class="circle"></div>
    <router-link
      :to="path"
      class="navigation__link"
      exact-active-class="navigation__link--active"
    >
      <slot></slot>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    path: {
      type: String,
      required: true,
    },
  },

  methods: {
    mouseEnter() {
      this.$el.classList.add("navigation__link-wrapper--hovered");
    },

    mouseLeave() {
      this.$el.classList.remove("navigation__link-wrapper--hovered");
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
