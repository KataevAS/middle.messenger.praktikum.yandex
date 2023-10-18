import MainForm from '../../components/MainForm'
import { FIELDS, PATH } from '../../constants'
import API from '../../core/API'

import Block from '../../core/Block'
import Router from '../../core/Router'
import { listFormSigninPage } from './constants'

import styles from './SigninPage.module.css'

export class SigninPage extends Block {
  refs: {
    form: MainForm
  }

  constructor() {
    super({
      listForm: listFormSigninPage,
      onSubmit: () => {
        const password = this.refs.form.refs[FIELDS.PASSWORD].value
        const repeatPassword = this.refs.form.refs[FIELDS.REPEAT_PASSWORD].value

        if (password !== repeatPassword) {
          const error = { name: FIELDS.REPEAT_PASSWORD, message: 'Пароли не совпадают' }
          this.refs.form.refs[FIELDS.REPEAT_PASSWORD].setErrors([error])
          this.refs.form.setErrors([error])
        }

        const { form } = this.refs

        if (!form.errors.length) {
          const result = {} as Record<string, string>

          listFormSigninPage.forEach((item) => {
            const component = form.refs[item.name]
            if ('value' in component && component.value) {
              result[item.name] = component.value
            }
          })

          API.User.createUser(result)
            .then((res) => {
              if (res.error) {
                alert(res.error.message)
                return
              }

              if ('data' in res && res.data.id) {
                localStorage.setItem('user', res.data.id)
                const router = new Router()
                router.go(PATH.PROFILE)
              }
            })
            .catch((err) => {
              console.error(err)
            })
        } else {
          form.setValidate()
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
          title='Регистрация'
          btnName='Зарегистрироваться'
          link='/'
          linkName='Войти'
          listForm=listForm
          onSubmit=onSubmit
          ref='form'
          onChange=onChange
        }}}
      {{/MainLayout}}
    `
  }
}
