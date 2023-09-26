import { FIELDS } from '../../constants'

export const listFormLoginPage = [
  {
    label: 'Логин',
    type: 'text',
    name: FIELDS.LOGIN,
    required: true
  },
  {
    label: 'Пароль',
    type: 'password',
    name: FIELDS.PASSWORD,
    required: true
  }
]
