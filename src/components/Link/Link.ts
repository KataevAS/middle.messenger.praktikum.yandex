import Block from '../../core/Block'

import styles from './Link.module.css'

type Props = Record<string, string>

export class Link extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    return `<a class='${styles.link} {{addClass}}' href={{href}}>{{title}}</a>`
  }
}
