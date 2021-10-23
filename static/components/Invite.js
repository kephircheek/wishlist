const Invite = {
  props: {
    id: String,
    role: {
      validator: (role) => {
        return role in Role
      },
      default () {
        return Role.MEMBER
      }
    },
    title: String,
    modified: String,
  },
  components: {
    'welcome-header': WelcomeHeader,
    'welcome-footer': WelcomeFooter,
    'invite-card': InviteCard,
    'invite-wishlist': InviteWishlist,
    'invite-settings': InviteSettings,
    'reservation-cart': ReservationCart,
  },
  data() {
    return {
      _role: this.role
    }
  },
  computed: {
    Role() {
      return Role
    },
  },
  methods: {
    setRole(role) {
      this._role = role
    },
    pushReservation(reservation) {
      console.log(reservation)
      this.$refs.reservationCart._reservations.push(reservation)
    },
    updateWishlist(wish_id) {
      this.$refs.inviteWishlist.pull()
    },
  },
  template:
  /*html*/
  `
  <section class="hero is-fullheight">

    <header class="hero-head"><welcome-header/></header>

    <main class="hero-body is-align-items-flex-start">

      <div class="container columns mx-0">

        <div class="column is-4 px-5 py-5 is-flex-direction-column is-justify-content-center">
          <invite-card @role="setRole" :role="role" :id="id" :title="title" :modified="modified"/>
        </div>  

        <div class="column is-4 px-5 py-5 is-flex-direction-column is-justify-content-center">
          <invite-wishlist ref="inviteWishlist" :role="this._role" :id="id" @reservation="pushReservation"/>
        </div>  

        <div class="column is-4 px-5 py-5 is-flex-direction-column is-justify-content-center is-align-content-space-evenly">
          <reservation-cart ref="reservationCart" @cancellation="updateWishlist"/>
          <invite-settings v-if="this._role === Role.OWNER" :id="id" />
        </div>  

      </div>

    </main>

    <footer class="hero-foot has-background-light"><welcome-footer/></footer>

  </section>
  `,
}
