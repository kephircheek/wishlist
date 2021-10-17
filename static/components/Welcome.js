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
    <main class="hero-body py-0"><welcome-quickstart/></main>
    <footer class="hero-foot has-background-light"><welcome-footer/></footer>
  </section>
  `
}
