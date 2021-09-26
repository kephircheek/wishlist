const InviteSettings = {
  props: {
    id: String
  },
  methods: {
    exterminate() {
      this.$root.model.delete(`project/${this.id}`)
      .then(r => {
        this.$router.push('/');
      })
      .catch(e => {
        window.alert(e.toJSON())
      });
    },
    exterminateSafe() {
      if (confirm('Delete invitation?')) {
        this.exterminate()
      }
    },
  },
  emits: [
  ],
  template:
  /*html*/
  `
  <div>
    <h3>Settings</h3>
    <button @click="exterminateSafe">Delete invite</button>
  </div>
  `
}
