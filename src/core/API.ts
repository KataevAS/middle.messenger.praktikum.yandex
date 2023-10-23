import { HOST } from '../constants'
import { APIChat } from './APIChat'
import { HTTPTransport } from './HTTPTransport'

class APIUser {
  http = new HTTPTransport()

  async createUser(userData: Record<string, unknown>) {
    return this.http
      .post(`${HOST}/auth/signup`, {
        data: userData
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: res.response }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса createUser: ', res.response)
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации createUser')
        }
        if (res.status === 500) {
          console.error('Ошибка ответа при запросе createUser')
        }
        return { error: { message: 'Ошибка регистрации, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async login(userData: Record<string, unknown>) {
    return this.http
      .post(`${HOST}/auth/signin`, {
        data: userData
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: 'ok' }
        }
        if (res.status === 400) {
          const { response } = res
          if (response?.reason === 'User already in system') {
            return { data: 'ok' }
          }
          console.error('Ошибка запроса login: ', response)
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации login')
        }
        if (res.status === 500) {
          console.error('Ошибка ответа при запросе login')
        }
        return { error: { message: 'Ошибка входа, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async logout() {
    return this.http
      .post(`${HOST}/auth/logout`)
      .then((res) => {
        if (res.status === 200) {
          return { data: 'ok' }
        }
        return { error: { message: 'Ошибка выхода, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async getUser() {
    return this.http
      .get(`${HOST}/auth/user`)
      .then((res) => {
        if (res.status === 200) {
          return { data: res.response }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса getUser: ', res.response)
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации getUser')
        }
        return { error: { message: 'Ошибка получения данных профиля, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async changeUser(userData: Record<string, unknown>) {
    return this.http
      .put(`${HOST}/user/profile`, {
        data: userData
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: res.response }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса changeUser: ', res.response)
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации changeUser')
        }
        return { error: { message: 'Ошибка изменения данных профиля, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async changePassword(userData: Record<string, unknown>) {
    return this.http
      .put(`${HOST}/user/password`, {
        data: userData
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: 'ok' }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса changePassword: ', res.response)
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации changePassword')
        }
        return { error: { message: 'Ошибка изменения пароля, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  async uploadAvatar(userData: FormData) {
    return this.http
      .put(`${HOST}/user/profile/avatar`, {
        data: userData
      })
      .then((res) => {
        if (res.status === 200) {
          return { data: res.response }
        }
        if (res.status === 400) {
          console.error('Ошибка запроса uploadAvatar: ', res.response)
        }
        if (res.status === 401) {
          console.error('Ошибка авторизации uploadAvatar')
        }
        return { error: { message: 'Ошибка загрузки изображения, попробуйте еще раз' } }
      })
      .catch((err) => {
        return { error: err }
      })
  }
}

namespace API {
  export const User = new APIUser()
  export const Chat = new APIChat()
}

export default API
