const WelcomeQuickstart = {
  data() {
    return {
      inviteTitle: null,
      errors: [],
    }
  },
  methods: {
    goToNewInvite() {
      this.$root.model.post(
        'project/', {
          title: this.inviteTitle,
          mode: 'INVITATION',
        }
      ).then(response => {
        this.$router.push({
          name: 'invite',
          params: {
            id: response.data.id,
            role: Role.OWNER,
            title: this.inviteTitle,
            modified: new Date()
          },
        });
      })
      .catch(e => {
        this.errors.push(e);
        window.alert(e)
      });
    },
  },
  template:
  /*html*/
  `
  <form class="welcome-quickstart" @submit.prevent="goToNewInvite" method="POST" v-focus>
    <input v-model=inviteTitle type="text" name="title" placeholder="Event title" required>
    <input type="submit" value="Create">
  </form>
  `
}
