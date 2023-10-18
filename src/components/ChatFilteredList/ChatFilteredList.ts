import { FIELDS } from '../../constants'
import API from '../../core/API'
import Block from '../../core/Block'
import { Chat } from '../../types/common'
import Modal from '../Modal'

import styles from './ChatFilteredList.module.css'

type Props = {
  createNewChatCb: () => void
  chatList: Chat[]
}

export const fields = [
  {
    label: 'Название чата',
    type: 'text',
    name: FIELDS.DISPLAY_NAME,
    value: ''
  }
]

export class ChatFilteredList extends Block {
  props: Props

  refs: {
    modal: Modal
  }

  constructor(props: Props) {
    super({
      ...props,
      listForm: fields,
      onSubmitModal: (data: Record<string, unknown>) => {
        API.Chat.createChat({ title: data[FIELDS.DISPLAY_NAME] })
          .then(() => {
            this.props.createNewChatCb()
          })
      },
      onClickAdd: () => {
        this.refs.modal.open()
      }
    })
  }

  protected render(): string {
    if (!this.props.chatList) {
      return '<div></div>'
    }

    return `
      <ul class=${styles.root}>
        {{#each chatList}}
          <li>
            {{{ ChatCard
              id=id
              userId=userId
              name=title
              newMessages=unread_count
              lastMessage=last_message
              setActiveChat=setActiveChat
              activeChatId=activeChatId
            }}}
          </li>
        {{/each}}
        <li>
          {{{ AddChatBtn onClick=onClickAdd }}}
          {{{ Modal
            title='Добавить чат'
            btnName='Добавить'
            listForm=listForm
            onSubmit=onSubmitModal
            ref='modal'
          }}}
        </li>
      </ul>
    `
  }
}
