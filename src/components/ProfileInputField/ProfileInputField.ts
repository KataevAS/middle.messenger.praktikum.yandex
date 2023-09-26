import { FIELDS } from '../../constants'
import { InputField } from '../../core/InputField'
import { ErrorValidate } from '../../utils/validateField'

import styles from './ProfileInputField.module.css'

type Props = {
  setErrors: (name: FIELDS, errors: ErrorValidate[]) => void
}

export class ProfileInputField extends InputField {
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
