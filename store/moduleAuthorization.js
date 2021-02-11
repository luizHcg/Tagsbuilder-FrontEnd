import ServerAxios from '~/src/config/server.axios'

export const actions = {
  Authorization: async (_, { login, password }) => {
    return await new ServerAxios()
      .http.post('/CtrlPrgUsr', { login, password })
      .then((r) => {
        if (r.status !== 401) {
          localStorage.setItem('tb-code', r.data.result.SEQUSR)
          localStorage.setItem('tb-type', r.data.result.TIPO)
          localStorage.setItem('tb-username', `${r.data.result.PcEmpr.NOME} cód: ${r.data.result.LOGIN}`)
          localStorage.setItem('tb-token', r.data.token)
          localStorage.setItem('tb-token-experi-in', (86399 * 1000).toLocaleString('pt-BR'))
        }
      })
  },
  ClearAuthorization () {
    localStorage.clear()
  }
}

export const getters = {
  GetUser () { return localStorage.getItem('tb-username') ?? undefined },
  GetCode () { return localStorage.getItem('tb-code') ?? undefined },
  GetToken () { return localStorage.getItem('tb-token') ?? undefined },
  GetType () { return localStorage.getItem('tb-type') ?? undefined },
  GetLogin () { return localStorage.getItem('tb-login') ?? undefined }
}
