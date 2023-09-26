import { createAttribut, PropsGetAttribut } from './createAttribut'

type PropsGetAttributs = PropsGetAttribut[]

export const createAttributs = (attributs: PropsGetAttributs): string => attributs.reduce((acc, attr) => {
  const newAcc = `${acc} ${createAttribut({ ...attr })}`
  return newAcc
}, '')
