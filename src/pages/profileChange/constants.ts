import { FIELDS } from '../../constants'

export const listFormProfileChangePage = [
  {
    label: 'Почта',
    type: 'text',
    name: FIELDS.EMAIL,
    value: ''
  },
  {
    label: 'Логин',
    type: 'text',
    name: FIELDS.LOGIN,
    value: ''
  },
  {
    label: 'Имя',
    type: 'text',
    name: FIELDS.FIRST_NAME,
    value: ''
  },
  {
    label: 'Фамилия',
    type: 'text',
    name: FIELDS.SECOND_NAME,
    value: ''
  },
  {
    label: 'Имя в чате',
    type: 'text',
    name: FIELDS.DISPLAY_NAME,
    value: ''
  },
  {
    label: 'Телефон',
    type: 'tel',
    name: FIELDS.PHONE,
    value: ''
  }
]
