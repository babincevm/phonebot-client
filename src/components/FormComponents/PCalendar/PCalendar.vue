<template>
  <div class="calendar">
    <div @click="open">
      {{ `${day} ${genitiveMonthNames[month]} ${year}` }}
      first dow - {{ getFirstDayOfWeek() }} days amount - {{ getDaysAmount() }}
    </div>
    <transition name="scale">
      <div class="calendar__wrapper" v-if="isOpened">
        <ul class="calendar__year">
          <li class="calendar__year-prev" @click="() => year--">
            {{ year - 1 }}
          </li>
          <li class="calendar__year-current">{{ year }}</li>
          <li class="calendar__year-next" @click="year++">{{ year + 1 }}</li>
        </ul>
        <ul class="calendar__month">
          <li class="calendar__month-prev" @click="month--">
            {{ previousMonth() }}
          </li>
          <li class="calendar__month-current">
            {{ monthNames[month] }}
          </li>
          <li class="calendar__month-next" @click="month++">
            {{ nextMonth() }}
          </li>
        </ul>
        <div class="calendar__days" @click="isOpened = false">
          <div class="calendar__days-names">
            <div
              class="calendar__days-name"
              v-for="(name, index) in daysNames"
              :key="index"
            >
              {{ name }}
            </div>
            <div class="calendar__days-table">
              <div class="calendar__day" v-for="index in 36" :key="index">
                {{ getCurrentDate(index) }}
              </div>
            </div>
            first dow - {{ getFirstDayOfWeek() }} days amount -
            {{ getDaysAmount() }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import helpers from "@/helpers/functions.mjs";
const setStyleProperty = helpers.setStyleProperty;

export default {
  name: "PCalendar",
  props: {
    allowMultiSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: Date,
      required: false,
      default: new Date(),
    },
  },

  data() {
    return {
      isOpened: false,
      currentRow: 0,
      day: null,
      month: null,
      year: null,
      daysNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      genitiveMonthNames: [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ],
    };
  },

  methods: {
    setValues(value) {
      this.year = value.getFullYear();
      this.month = value.getMonth();
      this.day = value.getDate();
    },

    open({ layerX, layerY }) {
      setStyleProperty(this.$el, {
        property: "scale-transform-origin",
        value: `${layerX}px ${layerY}px`,
      });
      this.isOpened = true;
    },

    getFirstDayOfWeek() {
      return [6, 0, 1, 2, 3, 4, 5][new Date(this.year, this.month).getDay()];
    },

    getDaysAmount() {
      return new Date(this.year, this.month, 0).getDate();
    },
    getPrevMonthDaysAmount() {
      return new Date(this.year, this.month - 1, 0).getDate();
    },
    getNextMonthDaysAmount() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    nextMonth() {
      let next = this.month + 1;
      if (next === 12) {
        return this.monthNames[0];
      }
      return this.monthNames[next];
    },

    previousMonth() {
      let next = this.month - 1;
      if (next === -1) {
        return this.monthNames[11];
      }
      return this.monthNames[next];
    },
    getCurrentDate(index) {
      let firstDatOayOfWeek = this.getFirstDayOfWeek();
      if (this.currentRow === 0) {
        if (index < firstDatOayOfWeek) {
          return this.getPrevMonthDaysAmount() - (firstDatOayOfWeek + index);
        } else {
        }
      }
    },
  },

  mounted() {
    if (!this.value) return;
    this.setValues(this.value);
  },

  watch: {
    value: function (current) {
      this.setValues(current);
    },
    month: function (current) {
      if (current === -1) {
        this.month = 11;
        this.year--;
      } else if (current === 12) {
        this.month = 0;
        this.year++;
      }
    },
  },
  updated() {
    this.currentRow = 0;
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
