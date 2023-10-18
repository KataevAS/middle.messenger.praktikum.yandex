import MainForm from '../../components/MainForm'
import { PATH } from '../../constants'
import API from '../../core/API'
import Block from '../../core/Block'
import Router from '../../core/Router'
import { listFormLoginPage } from './constants'

import styles from './LoginPage.module.css'

export class LoginPage extends Block {
  refs: {
    form: MainForm
  }

  constructor() {
    super({
      listForm: listFormLoginPage,
      username: 'Иван',
      onSubmit: () => {
        const { form } = this.refs

        if (!form.errors.length) {
          const result = {} as Record<string, string>

          listFormLoginPage.forEach((item) => {
            const component = form.refs[item.name]
            if ('value' in component && component.value) {
              result[item.name] = component.value
            }
          })

          API.User.login(result)
            .then((res) => {
              if (res.error) {
                alert(res.error.message)
                return
              }

              if ('data' in res && res.data) {
                API.User.getUser()
                  .then((res) => {
                    if (res.error) {
                      alert(res.error.message)
                    }

                    if ('data' in res) {
                      const userData = res.data

                      localStorage.setItem('user', userData.id)
                      localStorage.setItem('userAva', userData.avatar)

                      const router = new Router()
                      router.go(PATH.MESSENGER)
                    }
                  })
              }
            })
            .catch((err) => {
              console.error(err)
            })
        }
      }
    })
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      const router = new Router()
      router.go(PATH.MESSENGER)
    }
  }

  protected render(): string {
    return `
            {{#> MainLayout}}
              {{{ MainForm
                addClass='${styles.form}'
                title='Вход'
                btnName='Авторизоваться'
                link='/sign-up'
                linkName='Нет аккаунта?'
                listForm=listForm
                onSubmit=onSubmit
                ref='form'
              }}}
            {{/MainLayout}}
      `
  }
}
