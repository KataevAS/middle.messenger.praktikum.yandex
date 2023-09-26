import Block from '../../core/Block'
import { listFormLoginPage } from './constants'

import styles from './LoginPage.module.css'

export class LoginPage extends Block {
  constructor() {
    super({ listForm: listFormLoginPage, username: 'Иван' })
  }

  protected render(): string {
    return `
            {{#> MainLayout}}
              {{{ MainForm
                addClass='${styles.form}'
                title='Вход'
                btnName='Авторизоваться'
                link='/signin'
                linkName='Нет аккаунта?'
                listForm=listForm
              }}}
            {{/MainLayout}}
      `
  }
}
