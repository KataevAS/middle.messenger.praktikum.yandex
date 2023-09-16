import Block from '../../core/Block'

type Props = Record<string, string>

export class ErrorLine extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    return '<div class={{class}}>{{text}}</div>'
  }
}
