const app = Vue.createApp({
  data() {
    return {
      model: axios.create({
        //baseURL: `http://127.0.0.1:8000/`,
        //baseURL: `https://wishwishwish.herokuapp.com/`,
        baseURL: `http://library.kringe.space/`,
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      }),
    }
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

app.directive('focus', vFocus)
app.directive('click-outside', vClickOutside)
app.directive('longpress', vLongPress)

app.component('date-time', DateTime);
app.component('input-date-time', InputDateTime);

app.mount('#app')
