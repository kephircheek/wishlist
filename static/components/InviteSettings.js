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
  <div class="container">

    <h3 class="title is-3">Settings</h3>
    
    <div class="control">
      <button class="button" @click="exterminateSafe">Delete invite</button>
    </div>

  </div>
  `
}
