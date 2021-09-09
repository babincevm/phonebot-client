<template>
  <component :is="layout" id="app" :nav-links="links"></component>
</template>

<script>
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";

export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || "main"}-layout`;
    },

    links() {
      return this.$router.options.routes.reduce((acc, route) => {
        route.meta.useInMenu && acc.push(route);
        return acc;
      }, []);
    },
  },

  components: {
    "main-layout": MainLayout,
    "empty-layout": EmptyLayout,
  },

  updated() {},
};
</script>

<style lang="scss" src="@/assets/styles/main.scss"></style>
