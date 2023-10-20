import Block from '../../core/Block'
import { createAttributs } from '../../utils/createAttributs'

type Props = {
  onClick: () => void
  type: string
  disabled?: boolean
}

export class DefaultButton extends Block {
  props: Props

  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => {
          this.props.onClick()
        }
      }
    })
  }

  setDisabled(disabled: boolean) {
    const button = this.getContent() as HTMLButtonElement
    button.disabled = disabled
  }

  protected render(): string {
    const { disabled, type } = this.props

    const attributs = createAttributs([
      { name: 'disabled', value: disabled },
      { name: 'type', value: type }
    ])

    return `<button class={{className}} ${attributs}>{{{content}}}</button>`
  }
}
