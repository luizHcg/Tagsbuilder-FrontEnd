import Tag from '~/src/model/Tag'

export const state = {
  Tag: new Tag()
}

export const mutations = {
  Set (state, payload) {
    state.Tag = payload
  }
}

export const getters = {
  GetTag: (state) => {
    return state.Tag ?? new Tag()
  }
}
