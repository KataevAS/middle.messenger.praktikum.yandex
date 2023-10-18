import { Form } from '../../core/Form'
import { Field, HTMLElementEvent } from '../../types/common'
import { ErrorValidate } from '../../utils/validateField'
import Button from '../Button'
import MainInputField from '../MainInputField'

import styles from './MainForm.module.css'

type Props = {
  onSubmit: () => void
  listForm: Field[]
}

export class MainForm extends Form {
  refs: Record<string, MainInputField> & { submit: Button }

  constructor(props: Props) {
    super({
      ...props,
      events: {
        submit: (e: HTMLElementEvent<HTMLFormElement>) => {
          e.preventDefault()

          this.validate()

          if (props.onSubmit) {
            props.onSubmit()
          }
        }
      }
    })
  }

  setErrors(errors: ErrorValidate[]) {
    this.errors.push(...errors)
  }

  public setValidate() {
    this.errors.forEach((error) => {
      const component = error.name && this.refs[error.name]

      if (component) {
        component.setValidate()
      }
    })
  }

  protected render(): string {
    return `
      <form class='${styles.form} {{addClass}}'>
        <h1 class='${styles.title}'>{{title}}</h1>
        <ul>
        {{#each listForm}}
          <li class=${styles.field}>
            {{{ MainInputField
              label=label
              type=type
              name=name
              value=value
              placeholder=placeholder
              autocomplete='off'
              disabled=disabled
              onChange=onChange
              index=index
              required=required
              ref=name
            }}}
          </li>
        {{/each}}
        </ul>
        {{{ Button name=btnName type='submit' ref='submit' }}}
        {{{ Link addClass='${styles.link}' href=link title=linkName }}}
      </form>
    `
  }
}
