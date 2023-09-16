import Block from '../../core/Block'
import { CHATS } from './constants'

import styles from './ChatPage.module.css'

export class ChatPage extends Block {
  constructor() {
    super({
      chatList: CHATS,
      userId: 100,
      setActiveChage: (id: number) => {
        this.refs.chat.setProps({
          chat: CHATS.find((chat) => chat.id === id)
        })
        this.refs.chatList.setProps({
          activeChatId: id
        })
      }
    })
  }

  protected render(): string {
    return `
      <main class=${styles.root}>
        <section class=${styles.chatsList}>
          {{{ ChatList chatList=chatList userId=userId setActiveChage=setActiveChage ref='chatList' }}}
        </section>
        <section class=${styles.chat}>
         {{{ Chat chat=chat chatId=chatId userId=userId ref='chat' }}}
        </section>
      </main>
    `
  }
}
