<template>
  <div class="corner-popup">
    <transition
      :name="getTransitionName()"
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
    >
      <innerPopup
        v-if="isOpen"
        :position="position"
        @close="$emit('close')"
        :time-shown="timeShown"
      >
        <slot></slot>
      </innerPopup>
    </transition>
  </div>
</template>

<script>
import helpers from "@/helpers/functions.mjs";
import Popup from "@/components/UIComponents/Popups/CornerPopup/Popup";

const setStyleProperty = helpers.setStyleProperty;

export default {
  name: "CornerPopup",

  props: {
    position: {
      type: String,
      required: false,
      default: "tr",
      validation: (v) => ["tr", "tl", "br", "bl"].indexOf(v) !== -1,
    },
    animation: {
      type: String,
      required: false,
      default: "ttb",
      validation: (v) => ["ttb", "btt", "ltr", "rtl"].indexOf(v) !== -1,
    },
    background: {
      type: String,
      required: false,
      default: "var(--green)",
    },
    timeShown: {
      type: Number,
      required: false,
      default: 5000,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    getTransitionName() {
      if (["btt", "ttb"].indexOf(this.animation) !== -1) return "slide-y-vars";
      return "slide-x-vars";
    },

    beforeEnter() {
      setStyleProperty(this.$el, {
        property: "opacity-from",
        value: "0",
      });
      switch (this.animation) {
        case "rtl": {
          setStyleProperty(this.$el, {
            property: "translate-enter-from",
            value: "150%",
          });
          break;
        }
        case "ltr": {
          setStyleProperty(this.$el, {
            property: "translate-enter-from",
            value: "-150%",
          });
          break;
        }
        case "btt": {
          setStyleProperty(this.$el, {
            property: "translate-enter-from",
            value: "150%",
          });
          break;
        }
        default: {
          setStyleProperty(this.$el, {
            property: "translate-enter-from",
            value: "-150%",
          });
          break;
        }
      }
    },
    beforeLeave() {
      switch (this.animation) {
        case "rtl": {
          setStyleProperty(this.$el, {
            property: "translate-leave-to",
            value: "150%",
          });
          break;
        }
        case "ltr": {
          setStyleProperty(this.$el, {
            property: "translate-leave-to",
            value: "-150%",
          });
          break;
        }
        case "btt": {
          setStyleProperty(this.$el, {
            property: "translate-leave-to",
            value: "150%",
          });
          break;
        }
        default: {
          setStyleProperty(this.$el, {
            property: "translate-leave-to",
            value: "-150%",
          });
          break;
        }
      }
    },
  },

  mounted() {
    setStyleProperty(this.$el, {
      property: "popup-bg",
      value: this.background,
    });
  },

  components: {
    innerPopup: Popup,
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
