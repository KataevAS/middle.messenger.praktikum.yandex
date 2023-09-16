import Block from '../../core/Block'
import { createAttributs } from '../../utils/createAttributs'

type Props = {
  onChange: (e: Event) => void
  onBlur: (e: Event) => void,
  className?: string
  autocomplete?: string
  type: string
  id: string
  placeholder: string
  name: string
  value?: string
  disabled?: boolean
  required?: boolean
}

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        blur: (e: Event) => {
          if (props.onBlur) {
            props.onBlur(e)
          }
        },
        input: (e: Event) => {
          if (props.onChange) {
            props.onChange(e)
          }
        }
      }
    })
  }

  protected render(): string {
    const {
      autocomplete,
      className,
      type,
      name,
      value,
      placeholder,
      disabled,
      required,
      id
    } = this.props as Props

    const attributs = createAttributs([
      { name: 'class', value: className },
      { name: 'autocomplete', value: autocomplete },
      { name: 'type', value: type },
      { name: 'name', value: name },
      { name: 'value', value },
      { name: 'placeholder', value: placeholder },
      { name: 'disabled', value: disabled },
      { name: 'required', value: required },
      { name: 'id', value: id }
    ])

    return `<input ${attributs} />`
  }
}
