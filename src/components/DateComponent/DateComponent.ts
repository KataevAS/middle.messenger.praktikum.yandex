import Block from '../../core/Block'

import styles from './DateComponent.module.css'

type Props = Record<string, string>

export class DateComponent extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    return `
      <div class='${styles.date} {{className}}'>{{date}}</div>
    `
  }
}
