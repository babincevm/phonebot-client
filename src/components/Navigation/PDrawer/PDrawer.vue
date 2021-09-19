<template>
  <aside class="drawer" :class="{ 'drawer--opened': isOpen }">
    <div class="drawer__container">
      <div class="drawer__wrapper">
        <p-navigation :navLinks="navLinks"></p-navigation>
      </div>
    </div>
    <p-button
      @click="toggleDrawer"
      class="drawer__opener"
      size="45px"
      inner-color="var(--red)"
      circle
    >
      <template> </template>
    </p-button>

    <transition name="fade">
      <div class="drawer__overlay" v-show="isOpen" @click="toggleDrawer"></div>
    </transition>
  </aside>
</template>

<script>
import PButton from "../../UIComponents/PButton/PButton";
import helpers from "@/helpers/functions.mjs";
import NavLinks from "../NavLinks/NavLinks";

const setStyleProperty = helpers.setStyleProperty;

export default {
  name: "PDrawer",

  props: {
    navLinks: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  components: {
    "p-button": PButton,
    "p-navigation": NavLinks,
  },

  methods: {
    toggleDrawer() {
      setStyleProperty(this.$el, {
        property: "left",
        value: this.isOpen ? `-${this.$el.clientWidth}px` : "0",
      });
      document.body.classList.toggle("no-scroll");
      this.isOpen = !this.isOpen;
    },
  },

  mounted() {
    setStyleProperty(this.$el, {
      property: "left",
      value: `-${this.$el.clientWidth}px`,
    });
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
