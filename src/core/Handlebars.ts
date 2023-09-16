import Handlebars, { HelperDelegate, HelperOptions, Template } from 'handlebars'
import Block from './Block'

export function registerPartial(name: string, tmpl: Template): void {
  Handlebars.registerPartial(name, tmpl)
}

export function registerHelper(name: string, fn: HelperDelegate) {
  Handlebars.registerHelper(name, fn)
}

export function registerComponent(name: string, Component: typeof Block) {
  if (name in Handlebars.helpers) {
    throw new Error(`The ${name} component is already registered!`)
  }

  Handlebars.registerHelper(name, function (this: unknown, options: HelperOptions) {
    const { hash, data, fn } = options

    const component = new Component(hash)
    const dataAttribute = `data-id="${component.id}"`

    if ('ref' in hash) {
      (data.root.__refs = data.root.__refs || {})[hash.ref] = component
    }

    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`)

        if (!stub) {
          return
        }

        component.getContent()?.append(...Array.from(stub.childNodes))

        stub.replaceWith(component.getContent()!)
      }
    })

    const contents = fn ? fn(this) : ''

    return `<div ${dataAttribute}>${contents}</div>`
  })
}
