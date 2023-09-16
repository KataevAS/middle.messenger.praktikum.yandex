import Block from '../../core/Block'
import { Form } from '../../core/Form'
import { listFormPasswordChangePage } from './constants'

import styles from './PasswordChangePage.module.css'

export class PasswordChangePage extends Block {
  refs: {
    form: Form
  }

  constructor() {
    super({
      listForm: listFormPasswordChangePage,
      username: 'Иван'
    })
  }

  protected render(): string {
    return `
      {{#> ProfileLayout}}
        <div class=${styles.info}>
          {{{ ProfileForm btnName='Сохранить' listForm=listForm isEqualPassword=true onSubmit=onSubmit ref='form' }}}
        </div>
      {{/ProfileLayout}}
    `
  }
}
