import { isEqual } from '../utils/isEqual'
import Block, { BlockProps } from './Block'

function render(query: string, block: Block): HTMLElement {
  const root = document.querySelector(query) as HTMLElement
  if (root) {
    const content = block.getContent()
    if (content) {
      root.appendChild(content)
      return root
    }
    throw new Error('У переданного блока нет контента')
  } else {
    throw new Error('Не найден root элемент для отрисовки')
  }
}

interface Props {
  rootQuery: string
  context?: BlockProps
}

class Route {
  _pathname: string

  _blockClass: typeof Block

  _block: Block | null

  _props: Props

  constructor(pathname: string, view: typeof Block, props: Props) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.dispatchComponentWillUnmount()
      this._block = null
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props.context)
      render(this._props.rootQuery, this._block)
    }
  }
}

export default Route
