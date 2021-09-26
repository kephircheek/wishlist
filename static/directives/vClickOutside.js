// https://cdn.jsdelivr.net/npm/vue3-directives@0.1.6/directives/v-click-outside.js
//
const vClickOutside = {
  mounted(el, binding) {
    el.clickEvent = function (e) {
      // Checking the click was not on the element nor it's children
      if (!(el == e.target || el.contains(e.target))) {
        // call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickEvent);
  },
};
