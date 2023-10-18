import { FIELDS } from '../../constants'
import { InputField } from '../../core/InputField'

import styles from './MessageField.module.css'

type Props = {
  name: FIELDS
  isInvalid?: boolean
}

export class MessageField extends InputField {
  props: Props

  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    return `
      {{{ Input
        className='${styles.input} ${this.props.isInvalid ? styles.isInvalid : ''}'
        type=type
        name=name
        value=value
        placeholder=placeholder
        autocomplete='off'
        disabled=disabled
        ref=name
      }}}
    `
  }
}
