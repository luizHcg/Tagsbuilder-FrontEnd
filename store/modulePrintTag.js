import PrintTag from '~/src/model/PrintTag'

export const state = {
  PrintTag: new PrintTag(),
  ListPrintTag: new Array()
}

export const mutations = {
  Set (state, payload) {
    state.PrintTag = payload
  },
  SetList (state, payload) {
    state.ListPrintTag.push(payload)
  },
  RemoveList (state, payload) {
    state.ListPrintTag.splice(payload, 1)
  }
}
