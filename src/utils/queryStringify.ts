import { isObject } from './isObject'

type Indexed = {
  [key in string]: unknown
}

function queryObjectStringify(obj: Indexed): string {
  const keys = Object.keys(obj)

  const result = keys.reduce<string>((acc, key) => {
    let newStr = acc

    if (obj[key] instanceof Object) {
      const nextObj = obj[key] as Indexed
      const nextParam = queryObjectStringify(nextObj)
      newStr += `[${key}]${nextParam}`
    } else {
      newStr += `[${key}]=${obj[key]}`
    }

    return newStr
  }, '')

  return result
}

function queryArrayStringify(key: string, arr: Array<unknown>): string {
  const result = arr.reduce<string[]>((acc, item, idx) => {
    const newAcc = acc
    newAcc.push(`${key}[${idx}]=${item}`)
    return newAcc
  }, [])

  return result.join('&')
}

export const queryStringify = (data: Indexed): string => {
  if (!data || !isObject(data)) {
    throw new Error('input must be an object')
  }

  const keys = Object.keys(data) as Array<keyof typeof data>

  const result = keys.reduce<string[]>((acc, key) => {
    const newAcc = acc

    if (data[key] instanceof Array) {
      const item = data[key] as Array<unknown>
      newAcc.push(queryArrayStringify(key, item))
      return newAcc
    }

    if (data[key] instanceof Object) {
      const item = data[key] as Indexed
      newAcc.push(`${key}${queryObjectStringify(item)}`)
      return newAcc
    }

    newAcc.push(`${key}=${data[key]}`)
    return newAcc
  }, [])

  return result.join('&')
}
