import Block from '../../core/Block'
import { listFormProfilePage } from './constants'

import styles from './ProfilePage.module.css'

export class ProfilePage extends Block {
  constructor() {
    super({ listForm: listFormProfilePage, username: 'Иван' })
  }

  protected render(): string {
    return `
      {{#> ProfileLayout}}
        <h1 class=${styles.username}>{{username}}</h1>
    
        <div class=${styles.info}>
          {{{ ProfileForm disabled=true listForm=listForm }}}
        </div>
    
        {{{ Link addClass='${styles.link}' href='/profile-change' title='Изменить данные'}}}
        {{{ Link addClass='${styles.link}' href='/password-change' title='Изменить пароль'}}}
        {{{ Link addClass='${styles.link} ${styles.exitLink}' href='/' title='Выйти'}}}
      {{/ProfileLayout}}
    `
  }
}
