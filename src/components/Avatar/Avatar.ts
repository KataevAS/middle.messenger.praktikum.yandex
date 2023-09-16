import Block from '../../core/Block'

import styles from './Avatar.module.css'

export class Avatar extends Block {
  constructor(props: any) {
    super({
      ...props,
      alt: 'avatar',
      src: '#'
    })
  }

  protected render(): string {
    return `<img src={{src}} alt={{alt}} class='${styles.img} ${this.props.withDefault ? styles.default : ''}' >`
  }
}
