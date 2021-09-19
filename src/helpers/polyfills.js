export function setPolyfills() {
  // if (!Object.prototype.flatten) {
  //   Object.defineProperty(Object.prototype, "flatten", {
  //     enumerable: false,
  //     configurable: false,
  //     writable: false,
  //     value: function () {
  //       let result = {};
  //       for (const i in this) {
  //         if (typeof this[i] === "object") {
  //           const temp = this.flatten(this[i]);
  //           for (const j in temp) {
  //             result[i + "." + j] = temp[j];
  //           }
  //         } else {
  //           result[i] = this[i];
  //         }
  //       }
  //       return result;
  //     },
  //   });
  // }
}
