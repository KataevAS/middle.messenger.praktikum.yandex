import { FIELDS } from '../../constants'

export const listFormProfileChangePage = [
  {
    label: 'Почта',
    type: 'text',
    name: FIELDS.EMAIL,
    value: 'pochta@yandex.ru'
  },
  {
    label: 'Логин',
    type: 'text',
    name: FIELDS.LOGIN,
    value: '123'
  },
  {
    label: 'Имя',
    type: 'text',
    name: FIELDS.FIRST_NAME,
    value: 'Иван'
  },
  {
    label: 'Фамилия',
    type: 'text',
    name: FIELDS.SECOND_NAME,
    value: 'Иванович'
  },
  {
    label: 'Имя в чате',
    type: 'text',
    name: FIELDS.DISPLAY_NAME,
    value: 'Иван'
  },
  {
    label: 'Телефон',
    type: 'tel',
    name: FIELDS.PHONE,
    value: '+79099673030'
  }
]
