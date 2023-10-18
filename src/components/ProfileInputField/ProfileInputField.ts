import { FIELDS } from '../../constants'
import { InputField } from '../../core/InputField'
import { ErrorValidate } from '../../utils/validateField'
import Input from '../Input'

import styles from './ProfileInputField.module.css'

type Props = {
  name: FIELDS
  setErrors: (name: FIELDS, errors: ErrorValidate[]) => void
}

export class ProfileInputField extends InputField {
  props: Props

  refs: Record<FIELDS, Input>

  constructor(props: Props) {
    super({
      ...props,
      onBlur: () => {
        if ('setErrors' in props) {
          props.setErrors(this.name, this.errors)
        }
      }
    })
  }

  protected render(): string {
    return `
      <div class='${styles.wrapper} {{addClass}}'>
        <label>{{label}}</label>
        {{{ Input
          className='${styles.input}'
          label=label
          type=type
          name=name
          value=value
          placeholder=placeholder
          autocomplete=autocomplete
          disabled=disabled
          onChange=onChange
          onBlur=onBlur
          ref=ref
        }}}
      </div>
    `
  }
}
