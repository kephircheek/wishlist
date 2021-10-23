const WishCard = {
  components: {
    'wish-input': WishInput,
    'wish-link': WishLink,
  },
  props: {
    role: {
      validator: (role) => {
        return role in Role
      },
      default() {
        return Role.MEMBER;
      }
    },
    id: String,
    mode: String,
    archive: Boolean,
    title: String,
    link: String,
    modified: [String, Date],
    relevance: Boolean,
    cost: Number,
    project_ids: Array,
  },
  data() {
    return {
      _editing: false,
      _archive: this.archive,
      _title: this.title,
      _link: this.link,
      _modified: this.modified instanceof Date ? this.modified : new Date(this.modified + 'Z'),
      _relevance: this.relevance,
      _cost: this.cost,
    }
  },
  computed: {
    Role() {
      return Role
    },
    isChanged() {
      if (
        (this.title != this.card.title)
        || (this.link != this.card.link)
      ) {
        return true
      }
      return false
    },
    card: {
      set(card) {
        this._title = card.title;
        this._link = card.link;
      },
      get() {
        return {
          mode: 'WISH',
          title: this._title,
          link: this._link,
        }
      }
    },
    modifiedDate() {
      return
    }
  },
  methods: {
    edit() {
      this._editing = true
    },
    commit(card) {
      this.card = card
    },
    submit() {
      this._editing = false;
      if (this.isChanged) {
        this.update();
        this._modified = new Date();
      }
    },
    update() {
      this.$emit('lock')
      this.$root.model.put(`item/${this.id}`, this.card)
      .then(r => {
        this.$emit('unlock')
        console.log(`updated`)
      })
      .catch(e => {
        window.alert(e)
      })
    },
    unbind() {
      this.$emit('unbind', this.id)
    },
    fulfill() {
      this.$emit('lock')
      this._archive = true
      this.$root.model.get(`item/${this.id}/archive`)
      .then(r => {
        this.$emit('unlock')
        console.log('archived')
      })
      .catch(e => {
        window.alert(e)
      })
    },
    unfulfill() {
      this.$emit('lock')
      this._archive = false
      this.$root.model.delete(`item/${this.id}/archive`)
      .then(r => {
        this.$emit('unlock')
        console.log('unarchived')
      })
      .catch(e => {
        window.alert(e)
      })
    },
    reserve() {
      this.$emit('lock')
      this._relevance = false
      this.$root.model.get(`item/${this.id}/release`)
      .then(r => {
        this.$emit('unlock')
        this.$emit('reservation', {
          id: this.id,
          secret: r.data.secret,
          title: this._title,
          link: this._link,
        })
        console.log('reservation', this.id)
      })
      .catch(e => {
        this._relevance = true
        this.$root.reporter(e)
      })
    },
  },
  emits: [
    'lock',
    'unlock',
    'unbind',
    'reservation',
  ],
  template:
  /*html*/
  `
  <div>
    <div v-if="role === Role.OWNER">
      <div @submit="submit" @edit="edit">
        <div v-if="this._editing" v-click-outside="submit">
          <wish-input v-bind="card" @input="commit" />
          <button v-if="!this._archive" @click="unbind">Unbind</button>
          <button v-else @click="unfulfill">Unfulfill</button>
        </div>
        <div v-else v-longpress="edit">
          {{ this._title }} |
          <wish-link :url="this._link" /> |
          <date-time :value="this._modified" /> |
          {{ this._relevance }}
          <button v-if="!this._archive" @click="fulfill">Fulfill</button>
        </div>
      </div>
    </div>
    <div v-if="role === Role.MEMBER && this._relevance && !this._archive">
      <span>
        {{ this._title }} |
        <wish-link :url="this._link" /> |
        <date-time :value="this._modified" /> |
        {{ this._relevance }}
      </span>
      <button v-if="!this._archive" @click="reserve">Reserve</button>
    </div>
  </div>
  `
}
