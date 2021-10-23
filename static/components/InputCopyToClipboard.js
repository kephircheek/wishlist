const InputCopyToClipboard = {
  props: {
    value: String,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    copy() {
      this.$refs.target.focus();
      document.execCommand('copy');
    }
  },
  template:
  `
  <input type="text" :readonly="readonly" v-on:focus="$event.target.select()" ref="target" :value="value" />
  <button @click="copy">copy</button>
  `
}
