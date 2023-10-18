export const cloneDeep = <T extends object = object>(obj: T): typeof obj => {
  if (obj !== null && typeof obj === 'object') {
    if (obj instanceof Date) {
      const copy = new Date(obj.valueOf()) as typeof obj
      return copy
    }

    if (obj instanceof Array) {
      const copy = obj.map((item) => cloneDeep(item)) as typeof obj
      return copy
    }

    if (obj instanceof Set) {
      const copy = new Set() as typeof obj
      obj.forEach((v) => copy.add(cloneDeep(v)))
      return copy
    }

    if (obj instanceof Map) {
      const copy = new Map() as typeof obj
      obj.forEach((v, k) => copy.set(k, cloneDeep(v)))
      return copy
    }

    if (obj instanceof Object) {
      const copy = {} as typeof obj
      const keys = Object.keys(obj) as Array<keyof T>
      keys.forEach((key) => {
        copy[key] = cloneDeep(obj[key] as typeof obj) as (typeof obj)[typeof key]
      })
      return copy
    }
  }

  return obj
}
