import Block from '../../core/Block'
import { ID } from '../../types/common'

import styles from './ChatCard.module.css'

type Props = {
  id: ID
  setActiveChage: (id: ID) => void
}

export class ChatCard extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => {
          props.setActiveChage(props.id)
        }
      }
    })
  }

  protected render(): string {
    const {
      id, activeChatId, userId, authorId
    } = this.props
    const isMine = userId === authorId
    const hasNewMessage = Boolean(this.props.newMessages)
    const isActive = activeChatId === id

    return `
      <article class='${styles.root} ${isActive ? styles.isActive : ''}'>
        <div class=${styles.content}>
          <div class=${styles.avatar}>
            {{{ Avatar }}}
          </div>
          <div class=${styles.info}>
            <div class=${styles.name}>
              <div>{{name}}</div>
              {{{ DateComponent date=lastMessage.date }}}
            </div>
            <div>
              <div class=${styles.message}>
                ${isMine ? `<span class=${styles.isMine}>Вы:</span>` : ''}
                {{lastMessage.text}}
              </div>
            </div>
            ${hasNewMessage ? `<div class=${styles.counter}>{{newMessages}}</div>` : ''}
          </div>
        </div>
      </article>
    `
  }
}
