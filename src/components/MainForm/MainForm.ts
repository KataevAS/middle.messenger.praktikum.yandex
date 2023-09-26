import { Form } from '../../core/Form'
import { Field, HTMLElementEvent } from '../../types/common'
import { ErrorValidate } from '../../utils/validateField'
import MainInputField from '../MainInputField'

import styles from './MainForm.module.css'

type Props = {
  onSubmit: () => void
  listForm: Field[]
}

export class MainForm extends Form {
  refs: Record<string, MainInputField>

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

          if (!this.errors.length) {
            const result = {} as Record<string, string>
            this.props.listForm.forEach((item) => {
              const component = this.refs[item.name]
              if ('value' in component && component.value) {
                result[item.name] = component.value
              }
            })
            console.log(result)
          } else {
            this.setValidate()
          }
        }
      }
    })
  }

  setErrors(errors: ErrorValidate[]) {
    this.errors.push(...errors)
  }

  private setValidate() {
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
        {{{ Button name=btnName type='submit' }}}
        {{{ Link addClass='${styles.link}' href=link title=linkName }}}
      </form>
    `
  }
}
