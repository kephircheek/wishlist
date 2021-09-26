const routes = [
  { name: 'welcome', path: '/', component: Welcome},
  { name: 'invite', path: '/invite/:id', component: Invite, props: true },
]

const router = VueRouter.createRouter({
  // history: VueRouter.createWebHistory(),
  history: VueRouter.createWebHashHistory(),
  routes: routes,
})
