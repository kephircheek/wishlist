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
  <div class="container columns">

    <div class="column is-half is-flex is-flex-direction-column is-justify-content-center">

      <div>
        <p class="subtitle is-1">
          Create and share
          <br>
          <span class="has-text-weight-bold">wishlists</span>
           for free
        </p>
        <p class="subtitle is-5">Presents won’t be the same!</p>
      </div>

      <form class="field has-addons is-flex is-justify-content-center is-align-content-around my-5" @submit.prevent="goToNewInvite" method="POST" v-focus>
        <div class="control">
          <input class="input is-rounded" v-model=inviteTitle type="text" name="title" placeholder="Tom's Birthday" required>
        </div>
        <div class="control">
          <input class="button is-rounded" type="submit" value="Create">
        </div>
      </form>

    </div>

    <div class="column is-half is-hidden-mobile">
      <img src="static/img/welcome-img-presents.png">
    </div>

  </div>
  `
}
