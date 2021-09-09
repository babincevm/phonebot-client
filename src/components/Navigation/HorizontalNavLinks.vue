<template>
  <nav class="">
    <ul>
      <nav-link v-for="link in navLinks" :key="link.path" :path="link.path">
        {{ link.name }}
      </nav-link>
    </ul>
  </nav>
</template>

<script>
import NavLink from "./NavLink";

export default {
  name: "HorizontalNavLinks",
  components: {
    "nav-link": NavLink,
  },
  props: {
    navLinks: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
