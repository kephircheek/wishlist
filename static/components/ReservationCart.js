const ReservationCard = {
  props: {
    id: {
      type: String,
      required: true
    },
    secret: {
      type: String,
      required: true
    },
    title: String,
    link: String,
  },
  computed: {
    cancellationCode() {
      return `${this.id}-${this.secret}`
    }
  },
  data() {
    return {
      _title: this.title,
      _link: this.link,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$root.model.get(`item/${this.id}`)
      .then(r => {
        this._title = r.data.title;
        this._link = r.data.link;
      })
      .catch(this.$root.reporter);
    },
    copyCode() {
      navigator.clipboard.writeText(this.cancellationCode);
      window.alert("Copied to clipboard")
    },
  },
  template:
  /*html*/
  `
  <div class="card mb-3">
    <div class="card-content">
      <div class="block">
        <p class="title is-5">{{ this._title }}</p>
        <p class="subtitle is-7"><a class="text-color-pink" href="{{ this._link }}">{{ this._link }}</a></p>
        <p class="subtitle is-7">Cancelation code:</p>
      </div>

      <div class="control">
        <input class="input" type="text" :value="cancellationCode" readonly>
      </div>
      <!-- <button class="button is-static" @click="copyCode">{{ cancellationCode }}</button> -->
    </div>
  </div>
  `
}


const ReservationCart = {
  components: {
    "reservation-card": ReservationCard,
  },
  data() {
    return {
      _cancellationCode: null,
      _reservations: [],
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    reservationId() {
      return this._cancellationCode.split('-')[0]
    },
    reservationSecret() {
      return this._cancellationCode.split('-')[1]
    },
  },
  methods: {
    fetch() {
      this.$root.model.get('session/released')
      .then(r => {
        this._reservations = r.data
      })
      .catch(this.$root.reporter);
    },
    cancel() {
      id = this.reservationId
      secret = this.reservationSecret
      this._cancellationCode = null
      index = this._reservations.findIndex(r => r.id === id)
      reservation = this._reservations.splice(index, 1) ? index > -1 : null
      this.$root.model.delete(`item/${id}/release`, {params: {secret: secret}})
      .then(r => {
        this.$emit('cancellation', id)
        console.log('cancel reservation')
      })
      .catch(e => {
        if (reservation) {
          this._reservations.splice(index, 0, reservation);
        }
        this.$root.reporter(e)
      });
    },
  },
  emits: [
    'cancellation',
  ],
  template:
  /*html*/
  `
  <div class="container mb-5">

    <h3 class="title is-3">Reservation Cart</h3>

    <div class="field has-addons is-justify-content-center">
      
      <div class="control is-expanded">
        <input class="input" v-model="this._cancellationCode" placeholder="Cancellation code"/>
      </div>

      <div class="control">
        <button class="button" @click="cancel">Cancel</button>
      </div>

    </div>

    <reservation-card v-for="reservation in this._reservations" :key="reservation.id" v-bind="reservation" />

  </div>
  `
}
