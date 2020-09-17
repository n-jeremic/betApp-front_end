import Vue from 'vue'
import VueRouter from 'vue-router'
import Fixtures from '../components/fixturesPage/FixturesPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Fixtures
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
