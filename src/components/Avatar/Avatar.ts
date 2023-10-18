import Block from '../../core/Block'

import styles from './Avatar.module.css'

type Props = {
  onClick?: () => void
  withDefault?: boolean
}

export class Avatar extends Block {
  props: Props

  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => {
          if (this.props.onClick) {
            this.props.onClick()
          }
        }
      },
      alt: 'avatar'
    })
  }

  protected render(): string {
    return `<img src={{src}} alt={{alt}} class='${styles.img} ${this.props.withDefault ? styles.default : ''}' >`
  }
}
