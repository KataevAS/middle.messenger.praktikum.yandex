import { FIELDS } from '../../constants'
import { Form } from '../../core/Form'
import { Field, HTMLElementEvent } from '../../types/common'
import { ErrorValidate } from '../../utils/validateField'

import styles from './ProfileForm.module.css'

interface Props {
  [key: string]: unknown
  listForm: Field[]
  disabled?: boolean
  isEqualPassword?: boolean
  onSubmit?: () => void
}

export class ProfileForm extends Form {
  props: Props

  constructor(props: Props) {
    super({
      ...props,
      setErrors: (name: FIELDS, errors: ErrorValidate[]) => {
        if (name) {
          this.errors = this.errors.filter((err) => err.name !== name)
        }
        this.errors.push(...errors)
        this.setValidate()
      },
      events: {
        submit: (e: HTMLElementEvent<HTMLFormElement>) => {
          e.preventDefault()
          this.validate()

          if (props.onSubmit) {
            props.onSubmit()
          }

          this.setValidate()

          if (!this.errors.length) {
            const result = {} as Record<string, string>
            this.props.listForm.forEach((item) => {
              const component = this.refs[item.name]
              if ('value' in component && component.value) {
                result[item.name] = component.value
              }
            })
            console.log(result)
          }
        }
      }
    })
  }

  private setValidate() {
    console.log(this.errors)
    this.refs.errorLine.setProps({
      text: this.errors[0]?.message || ''
    })

    this.refs.button.setProps({
      disabled: Boolean(this.errors.length)
    })
  }

  protected render(): string {
    return `
      <form class='${styles.form} {{addClass}}'>
        <ul>
          {{#each listForm}}
            <li class=${styles.field}>
              {{{ ProfileInputField
                label=label
                type=type
                name=name
                value=value
                placeholder=placeholder
                autocomplete='off'
                disabled=disabled
                onChange=onChange
                onBlur=onBlur
                setErrors=setErrors
                index=index
                ref=name
              }}}
            </li>
          {{/each}}
        </ul>
        {{{ ErrorLine class='${styles.errorLine}' text=text ref='errorLine'}}}
        {{#if btnName}}
          <div class=${styles.btn}>
            {{{ Button name=btnName type='submit' ref='button' }}}
          </div>
        {{/if}}
      </form>
    `
  }
}
