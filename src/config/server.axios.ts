import HttpRequest from 'axios'
import { HOST } from './config.server.json'

class ServerAxios {
  http = HttpRequest.create({
    baseURL: HOST,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('tb-token')}`
    }
  })

  public async findAll (page: number) {
    return await this.http.get(`/pcprodut/page/${page}`).then((r) => {
      return r.data
    })
  }

  public async findBy (attr: string, content: string, page: number) {
    return await this.http
      .get(`/pcprodut/page/${page}/like/${content}/${attr}`)
      .then((r) => {
        return r.data
      })
  }

  public async findById (attr: string) {
    return await this.http.get(`/pcprodut/${attr}`).then((r) => {
      return r.data
    })
  }
}

export default ServerAxios
