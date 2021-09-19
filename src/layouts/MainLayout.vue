<template>
  <main class="main">
    <header-upper :nav-links="children" />
    <navigation-drawer v-if="navLinks" :nav-links="navLinks" />
    <section class="container">
      <router-view />
    </section>
  </main>
</template>

<script>
import PDrawer from "../components/Navigation/PDrawer/PDrawer";
import PHeader from "../components/Navigation/PHeader/PHeader";

export default {
  name: "MainLayout",
  components: {
    "navigation-drawer": PDrawer,
    "header-upper": PHeader,
  },

  computed: {
    children() {
      let children = [];
      let parent = this.$route.matched[0];
      const route = this.$router.options.routes.find(
        (route) => route.path === parent.path
      );

      if (route && Array.isArray(route.children)) {
        children = route.children.reduce((acc, child) => {
          if (!child.meta?.menuText) return acc;

          acc.push({
            name: child.meta.menuText,
            path: `${route.path}/${child.path}`,
          });
          return acc;
        }, []);
      } else if (route) {
        children = [];
      }
      return children;
    },
    navLinks() {
      return this.$router.options.routes.reduce((acc, route) => {
        route.meta.useInMenu &&
          acc.push({
            path: route.path,
            name: route.meta.menuText,
          });
        return acc;
      }, []);
    },
  },
};
</script>
