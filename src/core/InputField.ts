import { FIELDS } from '../constants'
import { HTMLElementEvent } from '../types/common'
import { ErrorValidate, validateField } from '../utils/validateField'
import Block from './Block'

type Props = {
  name?: FIELDS
  value?: string
  onBlur?: (props?: { name?: FIELDS, value: string }) => void
  onChange?: (name: FIELDS, value: string) => void
}

export class InputField extends Block {
  name: FIELDS

  value: string

  public errors: ErrorValidate[] = []

  constructor(props: Props) {
    super({
      ...props,
      onBlur: (e: HTMLElementEvent<HTMLInputElement>) => {
        const { value } = e.target
        const { name } = props

        this.validate()

        if (props.onBlur) {
          props.onBlur({ name, value })
        }
      },
      onChange: (e: HTMLElementEvent<HTMLInputElement>) => {
        const { value } = e.target
        const { name } = props
        if (props.onChange && name) {
          props.onChange(name, value)
        }
      },
      events: {
        input: (e: HTMLElementEvent<HTMLInputElement>) => {
          this.value = e.target.value
        }
      }
    })

    if (props.name) {
      this.name = props.name
    }

    this.value = props.value || ''
  }

  public validate() {
    this.errors = []
    this.errors = validateField({ name: this.name, value: this.value })
  }
}
