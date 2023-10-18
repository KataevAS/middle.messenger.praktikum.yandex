import { isObject } from './isObject'
import { merge } from './merge'

type Indexed = {
  [key in string]: unknown
}

export const setProperty = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  const newObject = isObject(object) ? (object as Indexed) : {}

  const addObject = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc
    }),
    value as Indexed
  )

  return merge(newObject, addObject)
}
