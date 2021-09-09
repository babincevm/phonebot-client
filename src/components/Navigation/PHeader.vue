<template>
  <header class="header">
    <div class="header__wrapper">
      <nav-links :nav-links="navLinks"></nav-links>
    </div>
  </header>
</template>

<script>
import HorizontalNavLinks from "./HorizontalNavLinks";

export default {
  name: "PHeader",
  props: {
    navLinks: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    "nav-links": HorizontalNavLinks,
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
