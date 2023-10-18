import API from '../../core/API'
import Block from '../../core/Block'
import { Chat } from '../../types/common'
import Modal from '../Modal'

import styles from './Popup.module.css'

type Props = {
  chat: Chat
  isOpen?: boolean
  addClass?: string
}

const listForm = [
  {
    type: 'text',
    value: '',
    label: 'Введите id пользователя',
    name: 'id'
  }
]

export class Popup extends Block {
  props: Props

  refs: {
    modal: Modal
  }

  constructor(props: Props) {
    super({
      ...props,
      onClickAdd: () => {
        this.refs.modal.setProps({
          title: 'Добавить пользователя',
          btnName: 'Добавить',
          onSubmit: (value: { id: string }) => {
            API.Chat.addUser({
              users: [Number(value.id)],
              chatId: this.props.chat.id
            })
              .then((res) => {
                if (res.error) {
                  alert(res.error.message)
                } else {
                  alert('Пользователь успешно добавлен')
                }
              })
              .catch((err) => {
                console.error(err)
              })
          }
        })
        this.refs.modal.open()
      },
      onClickRemove: () => {
        this.refs.modal.setProps({
          title: 'Удалить пользователя',
          btnName: 'Удалить',
          onSubmit: (value: { id: string }) => {
            API.Chat.removeUser({
              users: [Number(value.id)],
              chatId: this.props.chat.id
            })
              .then((res) => {
                if (res.error) {
                  alert(res.error.message)
                } else {
                  alert('Пользователь успешно удален')
                }
              })
              .catch((err) => {
                console.error(err)
              })
          }
        })
        this.refs.modal.open()
      },
      listForm
    })
  }

  toggle() {
    this.setProps({
      isOpen: !this.props.isOpen
    })
  }

  setDisabled(disabled: boolean) {
    const button = this.getContent() as HTMLButtonElement
    button.disabled = disabled
  }

  protected render(): string {
    if (this.props.isOpen) {
      return `
        <div class='${styles.root} ${this.props.addClass ? this.props.addClass : ''}'>
          {{{ Button
            onClick=onClickAdd
            addClass='${styles.btn}'
            name='Добавить пользователя'
          }}}
          {{{ Button
            onClick=onClickRemove
            addClass='${styles.btn}'
            name='Удалить пользователя'
          }}}
          {{{ Modal
            title='Добавить чат'
            btnName='Добавить'
            listForm=listForm
            onSubmit=onSubmitModal
            ref='modal'
          }}}
        </div>`
    }

    return '<div></div>'
  }
}
