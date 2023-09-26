import MainForm from '../../components/MainForm'
import { FIELDS } from '../../constants'
import Block from '../../core/Block'
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
      }
    })
  }

  protected render(): string {
    return `
      {{#> MainLayout}}
        {{{ MainForm
          addClass='${styles.form}'
          title='Регистрация'
          btnName='Зарегистрироваться'
          link='/login'
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
