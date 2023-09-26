import { nanoid } from 'nanoid'
import Block from '../../core/Block'

import styles from './InputSearch.module.css'

type Props = Record<string, string>

export class InputSearch extends Block {
  constructor(props: Props) {
    super({
      ...props,
      alt: 'avatar',
      src: '#'
    })
  }

  protected render(): string {
    const id = nanoid(6)

    return `
      <div class=${styles.root}>
        {{{ Input
          className='${styles.input}'
          type='text'
          required=true
          name='ASD'
          id='${id}'
        }}}
        <label for=${id} class=${styles.label}>Поиск</label>
      </div>
    `
  }
}
