const WishInput = {
  props: {
    mode: String,
    title: String,
    link: String,
  },
  data() {
    return {
      _title: this.title,
      _link: this.link
    }
  },
  computed: {
    card() {
      return {
        mode: 'WISH',
        title: this._title,
        link: this._link,
        relevance: true,
        modified: new Date()
      }
    },
  },
  methods: {
    input() {
      this.$emit('input', this.card);
    },
    reset() {
      console.log('RESET')
      this._title = null
      this._link = null
    }
  },
  emits: [
    'input'
  ],
  template:
  /*html*/
  `
  <input @input="input" v-model="this._title" type="text" placeholder="Title" required>
  <input @input="input" v-model="this._link"  type="text" placeholder="Link">
  `
}
