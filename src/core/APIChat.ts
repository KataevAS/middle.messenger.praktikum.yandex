import { HTTPTransport } from './HTTPTransport'

export class APIChat {
  http = new HTTPTransport()

  instance = 'https://ya-praktikum.tech/api/v2'

  async getChat(data: Record<string, unknown>) {
    return this.http
      .get(`${this.instance}/chats`, {
        data
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: JSON.parse(res.response) }
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации getChat')
        }
        if (res.status === 500) {
          console.error('Ошибка ответа при запросе getChat')
        }
        return { error: { message: 'Ошибка получения чатов, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async createChat(data: Record<string, unknown>) {
    return this.http
      .post(`${this.instance}/chats`, {
        data
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: JSON.parse(res.response) }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса createChat: ', JSON.parse(res.response))
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации createChat')
        }
        if (res.status === 500) {
          console.error('Ошибка ответа при запросе createChat')
        }
        return { error: { message: 'Ошибка создания чата, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async addUser(data: Record<string, unknown>) {
    return this.http
      .put(`${this.instance}/chats/users`, {
        data
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: 'ok' }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса addUser: ', JSON.parse(res.response))
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации addUser')
        }
        if (res.status === 500) {
          console.error('Ошибка ответа при запросе addUser')
        }
        return { error: { message: 'Ошибка добавления пользователя, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async removeUser(data: Record<string, unknown>) {
    return this.http
      .delete(`${this.instance}/chats/users`, {
        data
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: 'ok' }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса removeUser: ', JSON.parse(res.response))
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации removeUser')
        }
        if (res.status === 500) {
          console.error('Ошибка ответа при запросе removeUser')
        }
        return { error: { message: 'Ошибка удаления пользователя, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async getToketChat(data: Record<string, unknown>) {
    if (!data?.id) {
      return null
    }

    return this.http
      .post(`${this.instance}/chats/token/${data.id}`, {
        data
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: JSON.parse(res.response) }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса getToketChat: ', JSON.parse(res.response))
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации getToketChat')
        }
        if (res.status === 500) {
          console.error('Ошибка ответа при запросе getToketChat')
        }
        return { error: { message: 'Ошибка получения чата, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }
}
