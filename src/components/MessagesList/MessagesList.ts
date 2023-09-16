import Block from '../../core/Block'

import styles from './MessagesList.module.css'

type Props = Record<string, string>

export class MessagesList extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    return `
      <ul class=${styles.root}>
        {{#each messages}}
          <li class=${styles.field}>
            {{{ Message
              userId=userId
              authorId=authorId
              text=text
              date=date
            }}}
          </li>
        {{/each}}
      </ul>
    `
  }
}
