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
  <div>
    <invite-card @role="setRole" :role="role" :id="id" :title="title" :modified="modified"/>
    <invite-wishlist ref="inviteWishlist" :role="this._role" :id="id" @reservation="pushReservation"/>
    <invite-settings v-if="this._role === Role.OWNER" :id="id" />
    <reservation-cart ref="reservationCart" @cancellation="updateWishlist"/>
  </div>
  `,
}
