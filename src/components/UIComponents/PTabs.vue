<template>
  <div class="tabs">
    <ul class="tabs__list">
      <p-button
        v-for="tab in tabs"
        :key="tab.id"
        @click="changeTab({ activeTab: tab.id, el: $event.target })"
        class="tabs__tab"
        ref="tab"
      >
        {{ tab.name }}
      </p-button>
    </ul>
    <smooth-background :el="activeElement" />
  </div>
</template>

<script>
import PButton from "./PButton";
import SmoothBackground from "./SmoothBackground";
export default {
  name: "PTabs",
  components: {
    "p-button": PButton,
    "smooth-background": SmoothBackground,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  data() {
    return {
      active: this.activeTab,
      tab: null,
    };
  },

  methods: {
    changeTab({ activeTab, el }) {
      if (this.active === activeTab) return;

      this.active = activeTab;
      this.tab = el;
      this.$emit("changeTab", activeTab);
    },
  },

  mounted() {
    this.tab = this.$refs.tab[0].$el;
  },

  computed: {
    activeElement() {
      return this.tab;
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
