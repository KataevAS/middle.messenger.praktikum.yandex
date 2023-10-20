import Block from '../../core/Block'

import styles from './DateComponent.module.css'

type Props = Record<string, string>

const DAY: Record<number, string> = {
  0: 'Вс',
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб'
}

const parseDay = (n: number) => {
  return DAY[n]
}

export class DateComponent extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }

  protected render(): string {
    const { date } = this.props
    if (date) {
      const day = new Date(this.props.date as string).getDay()
      const time = parseDay(day)

      return `
      <div class='${styles.date} {{className}}'>${time}</div>
    `
    }

    return '<div></div>'
  }
}
