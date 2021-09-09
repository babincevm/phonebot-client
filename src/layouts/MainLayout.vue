<template>
  <main class="main">
    <header-upper :nav-links="childNavLinks"></header-upper>
    <navigation-drawer v-if="navLinks" :nav-links="navLinks" />
    <section class="container">
      <router-view />
    </section>
  </main>
</template>

<script>
import PDrawer from "../components/Navigation/PDrawer";
import PHeader from "../components/Navigation/PHeader";

export default {
  name: "MainLayout",
  components: {
    "navigation-drawer": PDrawer,
    "header-upper": PHeader,
  },
  props: {
    navLinks: {
      type: Array,
      required: false,
      default: () => [],
    },
    childNavLinks: {
      type: Array,
      required: false,
      default: null,
    },
  },
};
</script>
