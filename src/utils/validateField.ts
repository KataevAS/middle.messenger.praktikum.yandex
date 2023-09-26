import { FIELDS } from '../constants'
import { Field } from '../types/common'

export type ErrorValidate = {
  name?: FIELDS
  message: string
}

export const validateField = ({ name, value }: Pick<Field, 'name' | 'value'>): ErrorValidate[] => {
  const errors = []

  switch (name) {
    case FIELDS.LOGIN: {
      const { length } = value
      const isInvalidSymbol = Boolean(value.replace(/([A-Za-z0-9]|-|_)+/g, ''))
      const hasLetters = Boolean(value.match(/[a-z]/gi))

      if (length < 3 || length > 20 || isInvalidSymbol || !hasLetters) {
        errors.push({ name, message: 'Неверный логин' })
      }
      break
    }

    case FIELDS.EMAIL: {
      const valueWithutSybmols = value.replace(/!|\$|&|\*|-|=|\^|`|\||~|#|%|'|\+|\/|\?|_|{|}/g, '')
      const isValid = Boolean(valueWithutSybmols.match(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/))
      if (!isValid) {
        errors.push({ name, message: 'Неверная почта' })
      }
      break
    }

    case FIELDS.FIRST_NAME:
    case FIELDS.SECOND_NAME: {
      const isInvalid = Boolean(value.replace(/^([A-ZА-Я])([a-zа-я]|-)+/, ''))
      if (isInvalid) {
        errors.push({ name, message: name === FIELDS.FIRST_NAME ? 'Недопустимое имя' : 'Недопустимая фамилия' })
      }
      break
    }

    case FIELDS.PASSWORD:
    case FIELDS.OLD_PASSWORD:
    case FIELDS.NEW_PASSWORD: {
      const { length } = value
      const hasCapitalLetter = Boolean(value.match(/[A-ZА-Я]/g))
      const hasNumber = Boolean(value.match(/\d/g))
      if (length < 8 || length > 40 || !hasNumber || !hasCapitalLetter) {
        errors.push({ name, message: 'Неверный пароль' })
      }
      break
    }

    case FIELDS.REPEAT_PASSWORD: {
      if (!value) {
        errors.push({ name, message: 'Поле не может быть пустым' })
      }
      break
    }

    case FIELDS.PHONE: {
      const { length } = value
      const isInvalid = Boolean(value.replace(/\+?\d+/, ''))

      if (length === 0) break

      if (length < 10 || length > 15 || isInvalid) {
        errors.push({ name, message: 'Неверный телефон' })
      }
      break
    }

    case FIELDS.MESSAGE: {
      if (!value) {
        errors.push({ name, message: 'Поле не может быть пустым' })
      }
      break
    }

    default:
      break
  }

  return errors
}
