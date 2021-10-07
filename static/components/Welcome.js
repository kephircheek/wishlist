const Welcome = {
  components: {
    'welcome-header': WelcomeHeader,
    'welcome-quickstart': WelcomeQuickstart,
    'welcome-footer': WelcomeFooter,
  },
  data() {
    return {}
  },
  computed: {
  },
  created() {
  },
  methods: {
  },
  template: 
  /*html*/
  `
  <section class="hero is-fullheight">
    <header class="hero-head"><welcome-header/></header>
    <main class="hero-body"><welcome-quickstart/></main>
    <footer class="hero-foot"><welcome-footer/></footer>
  </section>
  `
}
