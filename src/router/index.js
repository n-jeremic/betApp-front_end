import Vue from 'vue'
import VueRouter from 'vue-router'

import FixturesPage from '../components/fixturesPage/FixturesPage.vue'
import LeaguesPage from '../components/leaguesPage/LeaguesPage.vue'
import TeamsPage from '../components/teamsPage/TeamsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/fixtures'
  },
  {
    path: '/fixtures',
    component: FixturesPage
  },
  {
    path: '/leagues',
    component: LeaguesPage
  },
  {
    path: '/teams',
    component: TeamsPage
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
