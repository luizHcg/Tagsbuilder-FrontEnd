import PcProdut from '~/src/model/PcProdut'
import ServerAxios from '~/src/config/server.axios'

export const state = {
  PcProdut: new PcProdut(),
  ListPcProdut: new Array(),
  CountLenghtPcProdut: 0
}

export const mutations = {
  Set (state, payload) {
    state.PcProdut = payload
  },
  SetList (state, payload) {
    state.ListPcProdut = payload
  },
  SetRows (state, payload) {
    state.CountLenghtPcProdut = payload
  }
}

export const actions = {
  SetProdut ({ commit }, item) {
    commit('Set', item)
  },
  SetListProdut ({ commit }, item) {
    commit('SetList', item)
  },
  FindAll ({ commit }, page) {
    new ServerAxios().findAll(page).then((r) => {
      commit('SetList', r.list)
      commit('SetRows', r.count)
    })
  },
  FindFilter: async ({ commit }, obj) => {
    return await new ServerAxios().findBy(obj.attr, obj.content, obj.page)
      .then((r) => {
        commit('SetList', r.list)
        commit('SetRows', r.count)
      })
  },
  FindById: async (_, id) => {
    return await new ServerAxios().findById(id.toString())
      .then((r) => {
        return r
      })
  }
}
