<template>
  <nav
    class="navigation"
    :class="{
      'navigation--vertical': type === 'vertical',
      'navigation--horizontal': type === 'horizontal',
    }"
  >
    <ul class="navigation__links">
      <nav-link
        v-for="link in navLinks"
        :key="link.path"
        :path="link.path"
        ref="links"
        @click="activeChanged"
      >
        {{ link.name }}
      </nav-link>
    </ul>

    <background
      :el="activeLink"
      background="var(--green)"
      border-radius="10px"
    />
  </nav>
</template>

<script>
import NavLink from "../NavLink/NavLink";
import SmoothBackground from "@/components/UIComponents/SmoothBackground/SmoothBackground";

export default {
  name: "NavLinks",
  props: {
    navLinks: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      required: false,
      default: "vertical",
      validation: (val) => ["vertical", "horizontal"].indexOf(val) !== -1,
    },
  },

  data() {
    return {
      activeLink: null,
    };
  },

  methods: {
    activeChanged(el) {
      this.activeLink = el;
    },
  },

  components: {
    "nav-link": NavLink,
    background: SmoothBackground,
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
