import { InputField } from '../../core/InputField'
import { ErrorValidate } from '../../utils/validateField'

import styles from './MainInputField.module.css'

type Props = Record<string, string>

export class MainInputField extends InputField {
  constructor(props: Props) {
    super({
      ...props,
      onBlur: () => {
        this.setValidate()
      }
    })
  }

  setErrors(errors: ErrorValidate[]) {
    this.errors.push(...errors)
  }

  setValidate() {
    this.refs.errorLine.setProps({
      text: this.errors[0]?.message || ''
    })
  }

  protected render(): string {
    return `
      <div class='${styles.wrapper}'>
        {{{ ErrorLine class='${styles.errorLine}' ref='errorLine'}}}
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
          required=required
          ref=ref
        }}}
        <label class='${styles.label}'>{{ label }}</label>
      </div>
    `
  }
}
