import Block from '../../core/Block'
import { createAttributs } from '../../utils/createAttributs'

import styles from './Button.module.css'

type Props = Record<string, string>

export class Button extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    const { disabled, type } = this.props

    const attributs = createAttributs([
      { name: 'disabled', value: disabled },
      { name: 'type', value: type }
    ])

    return `<button class=${styles.root} ${attributs}>{{name}}</button>`
  }
}
