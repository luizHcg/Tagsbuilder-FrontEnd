import ServerAxios from '~/src/config/server.axios'

export const actions = {
  HowCreateTag: async (_, { CREATED_BY, PRODUCT_CODE, CREATED_NAME }) => {
    return await new ServerAxios()
      .http.post('/tagWatcher', { CREATED_BY, PRODUCT_CODE, CREATED_NAME })
      .then((r) => {
        return r
      })
  },
  ListTagsGenerate: async (_, { page }) => {
    return await new ServerAxios()
      .http.get(`/tagWatcher/page/${page}`)
      .then((r) => {
        return r.data
      })
  }
}
