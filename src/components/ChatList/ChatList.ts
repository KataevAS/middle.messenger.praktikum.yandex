import Block from '../../core/Block'

import styles from './ChatList.module.css'

type Props = Record<string, string>

export class ChatList extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    return `
      <div class=${styles.root}>

        <div class=${styles.header}>
          <a class=${styles.profileLink} href='/profile'>
            Профиль
            <i class=${styles.arrow}></i>
          </a>
        </div>

        <form class=${styles.search}>
          {{{ InputSearch }}}
        </form>

        {{{ ChatFilteredList chatList=chatList userId=userId setActiveChage=setActiveChage activeChatId=activeChatId }}}

      </div>
    `
  }
}
