import Block from '../../core/Block'

import styles from './MessagesList.module.css'

type Props = Record<string, string>

export class MessagesList extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  componentDidMount(): void {
    this.element?.scroll(0, 100000)
  }

  protected render(): string {
    const messages = `${
      this.props.messages
        ? `{{#each messages}}
                <li class=${styles.field}>
                  {{{ Message
                    userId=userId
                    authorId=user_id
                    text=content
                    date=time
                  }}}
                </li>
              {{/each}}`
        : ''
    }`

    return `
      <ul class=${styles.root}>
        ${messages}
      </ul>
    `
  }
}
