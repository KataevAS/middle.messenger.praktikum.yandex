import Block from '../../core/Block'
import { Chat as ChatType } from '../../types/common'

import styles from './ChatList.module.css'

type Props = {
  chatList: Array<ChatType>
}

export class ChatList extends Block {
  props: Props

  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    return `
      <div class=${styles.root}>

        <div class=${styles.header}>

          {{{ DefaultLink
            href='/profile'
            addClass='${styles.profileLink}'
            content='
              <div>
                Профиль
                <i class=${styles.arrow}></i>
              </div>
            '
          }}}

        </div>

        <form class=${styles.search}>
          {{{ InputSearch }}}
        </form>

        {{{ ChatFilteredList
          chatList=chatList
          userId=userId
          setActiveChat=setActiveChat
          activeChatId=activeChatId
          createNewChatCb=createNewChatCb
        }}}

      </div>
    `
  }
}
