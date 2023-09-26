import Block from '../../core/Block'

import styles from './Message.module.css'

type Props = Record<string, string>

export class Message extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    const { userId, authorId } = this.props

    const isMine = userId === authorId

    return `
      <div class='${styles.root} ${isMine ? styles.out : styles.in}'>
       <p class=${styles.text}>{{text}}<span class=${styles.margin}></span></p>
       {{{ DateComponent date=date className='${styles.date}' }}}
      </div>
    `
  }
}
