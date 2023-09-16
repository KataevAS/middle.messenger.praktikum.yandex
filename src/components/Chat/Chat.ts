import { FIELDS } from '../../constants'
import Block from '../../core/Block'
import { Field } from '../../types/common'

import styles from './Chat.module.css'

const listForm: Field[] = [
  {
    name: FIELDS.MESSAGE,
    type: 'text',
    value: '',
    placeholder: 'Сообщение'
  }
]

type Props = Record<string, string>

export class Chat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      listForm
    })
  }

  protected render(): string {
    if (!this.props.chat) {
      return `
        <div class=${styles.default}>Выберите чат чтобы отправить сообщение</div>
      `
    }

    return `
      <div class=${styles.root}>
        <div class=${styles.header}>
          <div class=${styles.avatar}>
          {{{ Avatar }}}
          </div>
          <div class=${styles.name}>
            {{ chat.name }}
          </div>
          <div class=${styles.editBtn}></div>
        </div>

        {{{ MessagesList messages=chat.messages userId=userId }}}

        {{{ MessageForm className='${styles.form}' listForm=listForm}}}
      </div>
    `
  }
}
