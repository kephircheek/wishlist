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

    <div class="column is-6 is-flex is-flex-direction-column is-justify-content-center">

      <div>
        <p class="subtitle is-1">
          Create and share
          <br>
          <span class="has-text-weight-bold">wishlists</span>
           for free
        </p>
        <p class="subtitle is-5">Presents won’t be the same!</p>
      </div>

      <form class="field has-addons is-flex is-justify-content-center is-align-content-around mt-5" @submit.prevent="goToNewInvite" method="POST" v-focus>
        <div class="control">
          <input class="input" v-model=inviteTitle type="text" name="title" placeholder="Tom's Birthday" required>
        </div>
        <div class="control">
          <input class="button" type="submit" value="Create">
        </div>
      </form>

      <p class="subtitle is-7">By clicking this button, I agree the <span><a class="text-color-pink" href="">user agreement</a></span></p>
      
    </div>

    <div class="column is-6 is-hidden-mobile">
      <img src="static/img/3dhands-1.png" width=500>
    </div>

  </div>
  `
}
