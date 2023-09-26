import Block from '../../core/Block'

import styles from './ErrorPage.module.css'

type Props = Record<string, string>

export class ErrorPage extends Block {
  constructor(props: Props) {
    super({ ...props })
  }

  protected render(): string {
    return `
      {{#> MainLayout}}
        <div class='${styles.wrapper}'>
          <h1 class='${styles.title}'>{{errorNumber}}</h1>
          <p class='${styles.desc}'>{{desc}}</p>
          {{{ Link href='/' title='Назад к чатам'}}}
        </div>
      {{/MainLayout}}
    `
  }
}
