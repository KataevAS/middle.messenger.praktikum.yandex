import { nanoid } from 'nanoid'
import Handlebars from 'handlebars'
import EventBus from './EventBus'

export interface BlockProps {
  [key: string]: unknown
  events?: Record<string, (e: Event) => void>
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_CWU: 'flow:component-will-unmount'
  }

  public id = nanoid(6)

  protected props: BlockProps

  protected refs: Record<string, Block> = {}

  public children: Record<string, Block>

  private eventBus: () => EventBus

  private _element: HTMLElement | null = null

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this.children = children
    this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  private _getChildrenAndProps(childrenAndProps: BlockProps) {
    const props: BlockProps = {}
    const children: Record<string, Block> = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

  _addEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  _removeEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this))
  }

  private _init() {
    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  _componentWillUnmount() {
    this.componentWillUnmount()
    this._removeEvents()
  }

  componentWillUnmount() {}

  public dispatchComponentWillUnmount() {
    Object.values(this.children).forEach((child) => child.dispatchComponentWillUnmount())

    this?.element?.remove()

    this.eventBus().emit(Block.EVENTS.FLOW_CWU)
  }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate() {
    return true
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  get element() {
    return this._element
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props)

    const newElement = fragment.firstElementChild as HTMLElement

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this._addEvents()
  }

  private compile(template: string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs }

    const html = Handlebars.compile(template)(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = html

    contextAndStubs.__children?.forEach(({ component, embed }: any) => {
      this.children[component.constructor.name] = component
      embed(temp.content)
    })

    return temp.content
  }

  protected render(): string {
    return ''
  }

  getContent() {
    return this.element
  }

  _makePropsProxy(props: any) {
    const self = this

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        const oldTarget = { ...target }
        target[prop] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      }
    })
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }
}

export default Block
