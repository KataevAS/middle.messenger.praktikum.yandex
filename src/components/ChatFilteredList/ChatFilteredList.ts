import Block from '../../core/Block'

import styles from './ChatFilteredList.module.css'

type Props = Record<string, string>

export class ChatFilteredList extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    return `
      <ul class=${styles.root}>
        {{#each chatList}}
          <li>
            {{{ ChatCard
              id=id
              userId=userId
              name=name
              newMessages=newMessages
              lastMessage=lastMessage
              setActiveChage=setActiveChage
              activeChatId=activeChatId
            }}}
          </li>
        {{/each}}
      </ul>
    `
  }
}
