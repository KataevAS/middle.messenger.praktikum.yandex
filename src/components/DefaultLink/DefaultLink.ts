import Block from '../../core/Block'
import Router from '../../core/Router'

export class DefaultLink extends Block {
  constructor(props: any) {
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
    return `
      <a class={{{addClass}}} href={{{href}}}>
        {{{ content }}}
      </a>
    `
  }
}
