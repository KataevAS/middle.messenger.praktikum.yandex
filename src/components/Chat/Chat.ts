import { FIELDS } from '../../constants'
import Block from '../../core/Block'
import { WSTransport } from '../../core/WSTransport'
import { Field } from '../../types/common'
import Popup from '../Popup'

import styles from './Chat.module.css'

const listForm: Field[] = [
  {
    name: FIELDS.MESSAGE,
    type: 'text',
    value: '',
    placeholder: 'Сообщение'
  }
]

type Props = Record<string, string> & {
  chat: {
    messages: []
  }
  socket: WSTransport
}

export class Chat extends Block {
  props: Props

  refs: {
    popup: Popup
  }

  constructor(props: Props) {
    super({
      ...props,
      listForm,
      onClickEdit: () => {
        this.refs.popup.toggle()
      },
      onSubmit: ({ message }: { message: string }) => {
        this.props.socket?.send({
          type: 'message',
          content: message
        })
      }
    })
  }

  protected render(): string {
    const placeholderClass = !this.props.chat ? styles.show : styles.hide
    const chatClass = this.props.chat ? styles.show : styles.hide

    return `
      <div class=${styles.root}>
        <div class='${styles.default} ${placeholderClass}'>Выберите чат чтобы отправить сообщение</div>
        <div class='${styles.chat} ${chatClass}'>
          <div class=${styles.header}>
            <div class=${styles.avatar}>
            {{{ Avatar }}}
            </div>
            <div class=${styles.name}>
              {{ chat.title }}
            </div>
            {{{ DefaultButton
              onClick=onClickEdit
              className='${styles.editBtn}'
              content='<div class=${styles.editBtnIcon}></div>'
            }}}
            {{{ Popup chat=chat ref='popup' }}}
          </div>

          {{{ MessagesList messages=messages userId=userId ref="list" }}}

          {{{ MessageForm className='${styles.form}' listForm=listForm onSubmit=onSubmit }}}
        </div>
      </div>
    `
  }
}
