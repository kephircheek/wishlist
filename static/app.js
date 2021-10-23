const app = Vue.createApp({
  created() {
    // ping server to wake up because heroku
    this.model.get()
    .catch(this.reporter)
  },
  computed: {
    accessToken() {
      let token =  this.$cookie.get('accessToken') || uuidv4().split("-").join("")
      this.$cookie.set('accessToken', token)
      return token;
    },
    model() {
      return axios.create({
        baseURL: `https://liebelib.herokuapp.com/`,
        headers: {
          'X-Session-ID': this.accessToken,
          'Content-Type': 'application/json'
        }
      })
    },
  },
  methods: {
    reporter: (error) => {
      console.log(error);
      if (error.hasOwnProperty('toJSON')) {
        window.alert(JSON.stringify(error.toJSON(), null, 2))
      }
      else {
        window.alert(JSON.stringify(error, null, 2))
      }
    },
  },
  template:
  /*html*/
  `
  <router-view></router-view>
  `
})

app.use(router)
app.use(vCookie)

app.directive('focus', vFocus)
app.directive('click-outside', vClickOutside)
app.directive('longpress', vLongPress)

app.component('date-time', DateTime);
app.component('input-date-time', InputDateTime);

app.mount('#app')
