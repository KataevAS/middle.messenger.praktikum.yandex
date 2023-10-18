import Block from '../../core/Block'

import styles from './AddChatBtn.module.css'

type Props = {
  onClick: () => void
}

export class AddChatBtn extends Block {
  props: Props

  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => {
          this.props.onClick()
        }
      }
    })
  }

  protected render(): string {
    return `<div class=${styles.addChat}>+</div>`
  }
}
