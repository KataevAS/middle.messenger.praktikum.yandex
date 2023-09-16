import { FIELDS } from '../../constants'

export const listFormPasswordChangePage = [
  {
    label: 'Старый пароль',
    type: 'password',
    name: FIELDS.OLD_PASSWORD,
    placeholder: '•••••••••'
  },
  {
    label: 'Новый пароль',
    type: 'password',
    name: FIELDS.NEW_PASSWORD,
    placeholder: '•••••••••'
  },
  {
    label: 'Повторите новый пароль',
    type: 'password',
    name: FIELDS.REPEAT_PASSWORD,
    placeholder: '•••••••••'
  }
]
