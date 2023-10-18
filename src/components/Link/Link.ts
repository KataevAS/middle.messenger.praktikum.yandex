import Block from '../../core/Block'
import Router from '../../core/Router'

import styles from './Link.module.css'

type Props = Record<string, string>

export class Link extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault()
          const router = new Router()

          router.go(props.href)
        }
      }
    })
  }

  protected render(): string {
    return `<a class='${styles.link} {{addClass}}' href={{href}}>{{title}}</a>`
  }
}
