const InviteCard = {
  props: {
    id: String,
    role: {
      validator: (role) => {
        return role in Role
      },
      default() {
        return Role.MEMBER;
      }
    },
    title: String,
    modified: String,
  },
  created () {
    this.fetch();
    setInterval(() => {
      this.pull();
    }, 5000);
  },
  data() {
    return {
      _editing: false,
      _role: this.role,
      _title: this.title,
      _modified: this.modified ? new Date(this.modified) : null,
      _details: null,
      _deadline: null,
    }
  },
  computed: {
    card: {
      set(card) { // from server
        this._modified = new Date(card.modified + 'Z')
        this._title = card.title
        this._details = card.details
        this._deadline = card.deadline ? new Date(card.deadline + 'Z') : null
      },
      get() { // to server
        return {
          mode: 'INVITATION',
          title: this._title,
          details: this._details,
          deadline: this._deadline ? this._deadline.toISOString().slice(0, -1) : null,
        };
      }
    }
  },
  methods: {
    fetch() {
      this.$root.model.get(`project/${this.id}`)
      .then(r => {
        this.$emit('role', r.data.role)
        this._role = r.data.role
        this.card = r.data;
      })
      .catch(e => {
        this.$root.reporter(e)
        this.$router.push('/');
      });
    },
    pull() {
      console.log("Pulling invite card...")
    },
    push() {
      console.log(this.card)
      this.$root.model.put(`project/${this.id}`, this.card)
      .then(r => {
        console.log("pushed")
        // this.hash = response.data.hash;
        // this.fetch()
      })
      .catch(this.$root.reporter);
    },
    commitDeadline(deadline) {
      this._deadline = deadline
    },
    edit() {
      if (this._role == Role.OWNER) {
        this._editing = true
      }
      else {
        window.alert("Permission denied")
      }
    },
    submit() {
      this._editing = false;
      this.push();
    },
  },
  emits: [
    "role",
  ],
  template:
  /*html*/
  `
  <div>
    <div v-if="this._editing" v-click-outside="submit">
      <input type="text"  v-model="this._title" v-focus placeholder="Event title" />
      <textarea  v-model="this._details" placeholder="Details"></textarea>
      <input-date-time :value="this._deadline" @input="commitDeadline"/>
    </div>
    <div v-else v-longpress="edit">
      <h1>{{ this._title }}</h1>
      <p v-if="this._modified">Modified: <date-time :value="this._modified" /></p>
      <p>{{ this._details }}</p>
      <p v-if="this._deadline">Datetime: <date-time :value="this._deadline" /></p>
    </div>
  </div>
  `,
}
