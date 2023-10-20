import { FIELDS } from '../../constants'
import { Form } from '../../core/Form'
import { Field, HTMLElementEvent } from '../../types/common'

import styles from './MessageForm.module.css'

interface Props {
  [key: string]: unknown
  listForm: Field[]
  disabled?: boolean
  isEqualPassword?: boolean
  onSubmit?: (props: Record<string, string>) => void
}

export class MessageForm extends Form {
  props: Props

  constructor(props: Props) {
    super({
      ...props,
      events: {
        submit: (e: HTMLElementEvent<HTMLFormElement>) => {
          e.preventDefault()
          this.validate()

          if (!this.errors.length) {
            const result = {} as Record<string, string>
            this.props.listForm.forEach((item) => {
              const component = this.refs[item.name]
              if ('value' in component && component.value) {
                result[item.name] = component.value
                component.value = ''
              }
            })

            if (this.props.onSubmit) {
              console.log(result)
              this.props.onSubmit(result)
            }

            this.refs[FIELDS.MESSAGE].setProps({
              value: ''
            })
          }
        }
      }
    })
  }

  protected render(): string {
    return `
      <form class={{className}}>
        <label class=${styles.addFileLabel}>
          <input type='file' class=${styles.addFileInput}></input>
        </label>
        {{#each listForm}}
          {{{ MessageField
            type=type
            name=name
            value=value
            placeholder=placeholder
            autocomplete='off'
            disabled=disabled
            ref=name
          }}}
        {{/each}}
        <button type='submit' class=${styles.arrow}></button>
      </form>
    `
  }
}
