/**
 * @typedef {Object} PropertyObject
 * @property {String} property название свойства без --
 * @property {String} value значение свойства
 *
 * устанавливает значение CSS переменной для элемента
 * @param {Element} el элемент, которому нужно установить проперти
 * @param {[Array<PropertyObject>|PropertyObject]} properties массив или объект свойств
 */
export function setStyleProperty(el, properties) {
  if (Array.isArray(properties)) {
    properties.forEach((property) => {
      el.style.setProperty(`--${property.property}`, property.value);
    });
    return;
  }

  el.style.setProperty(`--${properties.property}`, properties.value);
}
