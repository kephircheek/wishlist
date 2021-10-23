const InputDateTime = {
  props: {
    value: Date
  },
  data() {
    return {
      _date: this.value ? dayjs(this.value).format('YYYY-MM-DD') : null,
      _time: this.value ? dayjs(this.value).format('HH:mm') : null
    }
  },
  computed: {
    datetime() {
      return (this._date && this._time) ? new Date(this._date + 'T' + this._time) : null
    },
  },
  methods: {
    input() {
      this.$emit('input', this.datetime);
    },
  },
  emits: [
    'input',
  ],
  template:
  /*html*/
  `
  {{ [this._date, this._time] }}
  <input @input="input" type="date" v-model="this._date" />
  <input @input="input" type="time" v-model="this._time" />
  `
}

const DateTime = {
  props: {
    value: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      isFromNowFormat: true,
      format: 'ddd, DD MMM YYYY HH:mm',
    }
  },
  computed: {
    datetime() {
      return dayjs(this.value)
    },
  },
  methods: {
    switchFormat() {
      this.isFromNowFormat = !this.isFromNowFormat
    },
  },
  template:
  /*html*/
  `
  <span @click="switchFormat">
    <span v-if="isFromNowFormat">{{ datetime.fromNow() }}</span>
    <span v-else>{{ datetime.format(this.format) }}</span>
  </span>
  `
}
