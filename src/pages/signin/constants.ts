import { FIELDS } from '../../constants'

export const listFormSigninPage = [
  {
    label: 'Почта',
    type: 'text',
    name: FIELDS.EMAIL
  },
  {
    label: 'Логин',
    type: 'text',
    name: FIELDS.LOGIN
  },
  {
    label: 'Имя',
    type: 'text',
    name: FIELDS.FIRST_NAME
  },
  {
    label: 'Фамилия',
    type: 'text',
    name: FIELDS.SECOND_NAME
  },
  {
    label: 'Телефон',
    type: 'tel',
    name: FIELDS.PHONE
  },
  {
    label: 'Пароль',
    type: 'password',
    name: FIELDS.PASSWORD
  },
  {
    label: 'Пароль (ещё раз)',
    type: 'password',
    name: FIELDS.REPEAT_PASSWORD
  }
]
