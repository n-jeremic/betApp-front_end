import Vue from 'vue'
import Vuex from 'vuex'
import soccerApiModule from './modules/soccerApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    soccerApi: soccerApiModule
  }
})
