const InviteWishlist = {
  props: {
    id: String,
    role: {
      validator: (role) => {
        return role in Role
      },
      default() {
        return Role.MEMBER;
      }
    }
  },
  components: {
    'wish-card': WishCard,
    'wish-form': WishForm,
  },
  data() {
    return {
      _sorter: this.modifiedIncreaseSorter,
      _locked: false,
      _wishes: null,
    }
  },
  mounted() {
    this.fetch();
    setInterval(() => {
      // this.pull();
    }, 5000);
  },
  computed: {
    Role() {
      return Role
    },
  },
  methods: {
    lock() {
      this._locked = true
    },
    unlock() {
      this._locked = false
    },
    bind(card) {
      this._wishes.push(card)
      this.$root.model.get(`bind/${card.id}/project/${this.id}`)
      .then(r => {
        console.log('Binded')
      })
      .catch(e => {
        window.alert(e)
      })
    },
    unbind(wishId) {
      this.lock();
      index = this._wishes.findIndex((wish) => wish.id == wishId);
      this._wishes.splice(index, 1);
      this.$root.model.delete(`bind/${wishId}/project/${this.id}`)
      .then(r => {
        console.log('Unbinded')
        this.unlock()
      })
      .catch(e => {
        window.alert(e.toJSON())
      })
    },
    fetch() {
      this.$root.model.get(`item/`, {params: {project_id: this.id}})
      .then(r => {
        this._wishes = r.data
      })
      .catch(e => {
        window.alert(e.toJSON())
      });
    },
    pull() {
      if (this._locked) {
        setTimeout(() => { this.pull() }, 1000)
      } else {
        this.$root.model.get(`item/`, {params: {project_id: this.id}})
        .then(r => {
          for (let i = 0; i < r.data.length; i++) {
            const owish = r.data[i] // origin wish
            index = this._wishes.findIndex((wish) => wish.id == owish.id)
            if (index === -1) {
              this._wishes.push(owish);
            }
            else if (this._wishes[index].modified < owish.modified) {
              this._wishes.splice(index, 1, owish)
            }
          }
        })
        .catch(e => {
          window.alert(e.toJSON())
        })
      }
    },
    reserve(reservation) {
      this.$emit('reservation', reservation)
    },
  },
  emits: [
    "reservation"
  ],
  template:
  /*html*/
  `
  <div v-if="role === Role.OWNER">
    <wish-form @submit="bind"/>
  </div>
  <div v-for="wish in this._wishes" :key="wish.modified">
    <wish-card :role="role" v-bind="wish" @unbind="unbind" @reservation="reserve" @lock="lock" @unlock="unlock"/>
  </div>
  `
}
