<template>
  <header class="header">
    <div class="header__links-wrapper">
      <nav-links
        v-if="navLinks.length > 0"
        :nav-links="navLinks"
        type="horizontal"
      ></nav-links>
    </div>
  </header>
</template>

<script>
import NavLinks from "../NavLinks/NavLinks";

export default {
  name: "PHeader",
  props: {
    navLinks: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    "nav-links": NavLinks,
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
