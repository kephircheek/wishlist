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
  <div class="field is-horizontal">

    <div class="field-label">
      <label class="label"><i class="fas fa-gift"></i></label>
    </div>

    <div class="field-body">

      <div class="field">
        <div class="control">
          <input class="input" @input="input" v-model="this._title" type="text" placeholder="Gift Name" required>
        </div>
      </div>

    </div>

  </div>

  <div class="field is-horizontal">

    <div class="field-label">
      <label class="label"><i class="fas fa-link"></i></label>
    </div>

    <div class="field-body">

      <div class="field">
        <div class="control">
          <input class="input" @input="input" v-model="this._link"  type="text" placeholder="Link">
        </div>  
      </div>

    </div>

  </div>
  `
}
