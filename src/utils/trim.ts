export const trim = (str: string, chars?: string) => {
  if (typeof str !== 'string') {
    return ''
  }

  if (chars === undefined) {
    return str.trim()
  }

  const regexp = new RegExp(`[${chars}]`, 'g')

  return str.replace(regexp, '')
}
