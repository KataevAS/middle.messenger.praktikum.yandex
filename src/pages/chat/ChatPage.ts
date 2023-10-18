import { Chat as ChatType, Message } from '../../types/common'
import Block from '../../core/Block'

import styles from './ChatPage.module.css'
import Router from '../../core/Router'
import { PATH } from '../../constants'
import API from '../../core/API'
import Chat from '../../components/Chat'
import ChatList from '../../components/ChatList'
import { SocketEvent, WSTransport } from '../../core/WSTransport'

export class ChatPage extends Block {
  refs: {
    chat: Chat
    chatList: ChatList
  }

  socket: WSTransport

  activeChat?: ChatType

  constructor() {
    super({
      userId: localStorage.getItem('user'),
      createNewChatCb: () => {
        this.getChats()
      },
      setActiveChat: (id: number) => {
        this.activeChat = this.refs.chatList.props.chatList.find((chat) => chat.id === id)

        if (this.activeChat) {
          API.Chat.getToketChat({ id: this.activeChat.id })?.then((res) => {
            if (res && 'data' in res && 'token' in res.data && this.activeChat) {
              const { token } = res.data

              if (this.socket) {
                this.socket.close()
              }

              const url = `wss://ya-praktikum.tech/ws/chats/${this.props.userId}/${this.activeChat.id}/${token}`

              this.socket = new WSTransport(url)

              this.socket.connect().then(() => {
                this.socket.send({
                  content: '0',
                  type: 'get old'
                })

                this.refs.chat.setProps({
                  socket: this.socket
                })
              })

              this.socket.on(SocketEvent.Message, (data: { content: string; type: string }) => {
                if (!this.activeChat) {
                  return
                }

                if (Array.isArray(data)) {
                  this.activeChat = {
                    ...this.activeChat,
                    messages: data.reverse()
                  }

                  this.refs.chat.setProps({
                    messages: this.activeChat.messages
                  })
                } else {
                  if (data.type === 'user connected') {
                    return
                  }

                  this.activeChat = {
                    ...this.activeChat,
                    messages: [...this.activeChat.messages, data as Message]
                  }

                  this.refs.chat.setProps({
                    messages: this.activeChat?.messages
                  })
                }
              })
            }
          })

          this.refs.chat.setProps({
            chat: this.activeChat
          })
          this.refs.chatList.setProps({
            activeChatId: this.activeChat.id
          })
        }
      }
    })
  }

  getChats(props?: { offset?: number; limit?: number }) {
    const offset = props?.offset || 0
    const limit = props?.limit || 10

    API.Chat.getChat({ offset, limit }).then((res) => {
      if ('data' in res) {
        this.refs.chatList.setProps({ chatList: res.data })
      }
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('user')) {
      const router = new Router()
      router.go(PATH.LOGIN)
    }

    this.getChats()
  }

  protected render(): string {
    return `
      <main class=${styles.root}>
        <section class=${styles.chatsList}>
          {{{ ChatList
            chatList=chatList
            userId=userId
            setActiveChat=setActiveChat
            createNewChatCb=createNewChatCb
            ref='chatList'
          }}}
        </section>
        <section class=${styles.chat}>
         {{{ Chat chat=chat chatId=chatId userId=userId socket=socket ref='chat' }}}
        </section>
      </main>
    `
  }
}
