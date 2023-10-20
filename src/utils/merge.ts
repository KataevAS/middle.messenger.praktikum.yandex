import { isObject } from './isObject'

type Indexed = {
  [key in string]: unknown
}

const preparedObject = (obj: Indexed) => (isObject(obj) ? obj : {})

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  const mergedObj = preparedObject(lhs)

  const keysRhs = Object.keys(preparedObject(rhs))

  keysRhs.forEach((key) => {
    if (isObject(rhs[key])) {
      mergedObj[key] = merge(preparedObject(lhs[key] as Indexed), rhs[key] as Indexed)
    } else {
      mergedObj[key] = rhs[key]
    }
  })

  return mergedObj
}
