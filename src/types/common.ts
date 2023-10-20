import { FIELDS } from '../constants'

export type ID = number

export type Field = {
  placeholder?: string
  label?: string
  type: string
  name: FIELDS
  value: string
}

export interface InputFieldReturn {
  name: FIELDS
  value: string
  idx: number
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
}

export type Message = {
  content: string
}

export type Chat = {
  id: number,
  messages: Message[]
}
