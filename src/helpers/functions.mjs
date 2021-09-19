/**
 * @typedef {Object} PropertyObject
 * @property {String} property название свойства без --
 * @property {String} value значение свойства
 *
 * устанавливает значение CSS переменной для элемента
 * @param {Element} el элемент, которому нужно установить проперти
 * @param {[Array<PropertyObject>|PropertyObject]} properties массив или объект
 *     свойств
 */
function setStyleProperty(el, properties) {
  if (!el) return;

  if (Array.isArray(properties)) {
    properties.forEach((property) => {
      el.style.setProperty(`--${property.property}`, property.value);
    });
    return;
  }

  el.style.setProperty(`--${properties.property}`, properties.value);
}

/**
 * @decorator
 * @param {Function} func функция
 * @param {Number} wait время до срабатывания
 * @param {Boolean} immediate=false запускать функцию сразу, или же ждать
 * окончания wait
 * @return {(function(): *)|*} функцию, которая, пока она продолжает
 * вызываться, не будет запускаться.
 */
function debounce(func, wait, immediate = false) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default {
  setStyleProperty,
  debounce
}
