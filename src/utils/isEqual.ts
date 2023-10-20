type Indexed = {
  [key in string]: unknown
}

type Argument = Indexed | Function | number | string

export const isEqual = (a: Argument, b: Argument): boolean => {
  if (b === null || typeof b !== 'object' || a === null || typeof a !== 'object') {
    if (typeof a === 'function') {
      if (typeof b !== 'function') {
        return false
      }

      return a.toString() === b.toString()
    }

    if (Number.isNaN(a) && Number.isNaN(b)) {
      return true
    }

    return a === b
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (let i = 0; i < keysA.length; i++) {
    const keyA = keysA[i]

    const valueA = a[keyA] as Indexed
    const valueB = b[keysB[i]] as Indexed

    if (!(keyA in b) || !isEqual(valueA, valueB)) {
      return false
    }
  }

  return true
}
