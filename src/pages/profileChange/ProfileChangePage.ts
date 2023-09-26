import Block from '../../core/Block'
import { Field } from '../../types/common'
import { listFormProfileChangePage } from './constants'

import styles from './ProfileChangePage.module.css'

interface Props {
  [key: string]: unknown
  listForm: Field[]
  username: string
}

export class ProfileChangePage extends Block {
  props: Props

  constructor() {
    super({
      listForm: listFormProfileChangePage,
      username: 'Иван'
    })
  }

  protected render(): string {
    return `
      {{#> ProfileLayout}}
        <div class=${styles.info}>
          {{{ ProfileForm btnName='Сохранить' listForm=listForm ref='form' }}}
        </div>
      {{/ProfileLayout}}
    `
  }
}
