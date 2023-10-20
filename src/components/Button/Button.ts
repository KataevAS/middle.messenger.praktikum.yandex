import Block from '../../core/Block'
import { createAttributs } from '../../utils/createAttributs'

import styles from './Button.module.css'

type Props = {
  onClick?: () => void
  disabled?: boolean
  addClass?: string
  type: string
}

export class Button extends Block {
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
      }
    })
  }

  setDisabled(disabled: boolean) {
    const button = this.getContent() as HTMLButtonElement
    button.disabled = disabled
  }

  protected render(): string {
    const { disabled, type } = this.props

    const attributs = createAttributs([
      { name: 'disabled', value: disabled },
      { name: 'type', value: type }
    ])

    return `<button
      class='${styles.root} ${this.props.addClass ? this.props.addClass : ''}' ${attributs}>{{name}}</button>`
  }
}
