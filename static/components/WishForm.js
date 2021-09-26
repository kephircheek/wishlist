const WishForm = {
  components: {
    'wish-input': WishInput,
  },
  data() {
    return {
      card: null
    }
  },
  methods: {
    commit(card) {
      this.card = card;
    },
    submit() {
      if (this.card === null) {
        return
      }
      this.insert().then(r => {
        card = {...r.data, ...this.card, }
        console.log(card)
        this.$emit("submit", card)
        this.$refs.input.reset()
        this.card = null
      })
    },
    insert() {
      return this.$root.model.post(`item/`, this.card)
      .catch(e => {
        window.alert(e)
      })
    }
  },
  emits: [
    'submit'
  ],
  template:
  /*html*/
  `
  <wish-input @input="commit" ref="input" />
  <button @click="submit">Submit</button>
  `
}
