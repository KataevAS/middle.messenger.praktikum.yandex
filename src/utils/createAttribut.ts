export type PropsGetAttribut = { name: string; value?: string | number | boolean | unknown }

export const createAttribut = ({ name, value }: PropsGetAttribut): string => {
  if (typeof value === 'boolean') {
    return value ? name : ''
  }
  if (!value || !name) return ''
  return `${name}="${value}"`
}
