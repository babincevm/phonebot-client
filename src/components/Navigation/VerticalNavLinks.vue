<template>
  <nav class="navigation navigation--vertical">
    <ul class="navigation__links">
      <nav-link v-for="link in navLinks" :key="link.path" :path="link.path">
        {{ link.name }}
      </nav-link>
    </ul>
  </nav>
</template>

<script>
import NavLink from "./NavLink";

export default {
  name: "VerticalNavLinks",
  props: {
    navLinks: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    "nav-link": NavLink,
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
