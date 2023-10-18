export const isObject = (variable: { constructor: Object } | unknown) => {
  if (
    typeof variable === 'object'
    && variable
    && variable.constructor === Object
  ) {
    return true
  }

  return false
}
