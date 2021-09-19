<template>
  <component :is="layout" id="app"></component>
</template>

<script>
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";

export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || "main"}-layout`;
    },
  },

  components: {
    "main-layout": MainLayout,
    "empty-layout": EmptyLayout,
  },
};
</script>

<style lang="scss" src="@/assets/styles/main.scss"></style>
