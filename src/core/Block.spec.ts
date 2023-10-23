import { expect } from 'chai'
import Sinon from 'sinon'
import Block, { BlockProps } from './Block'

describe('Block', () => {
  let PageClass: typeof Block

  before(() => {
    class Page extends Block {
      constructor(props: BlockProps) {
        super({ ...props })
      }

      protected render(): string {
        return `<div>
          <span id="test-text">{{text}}</span>
        </div>`
      }
    }

    PageClass = Page
  })

  it('Компонент должен собраться с переданными пропсами', () => {
    const props = { text: 'Hello' }
    const pageComponent = new PageClass(props)

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML

    expect(spanText).to.be.eq(props.text)
  })

  it('Компонент должен перерисоваться после установки новых пропсов', () => {
    const props = { text: 'Hello' }
    const pageComponent = new PageClass(props)

    const newProps = { text: 'Bye' }
    pageComponent.setProps(newProps)

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML

    expect(spanText).to.be.eq(newProps.text)
  })

  it('Компонент должен добавлять события', () => {
    const handler = Sinon.stub()

    const pageComponent = new PageClass({
      events: {
        click: handler
      }
    })

    const event = new MouseEvent('click')
    pageComponent.element?.dispatchEvent(event)

    expect(handler.calledOnce).to.be.true
  })

  it('Компонент должен удалять события после вызова dispatchComponentWillUnmount', () => {
    const handler = Sinon.stub()

    const pageComponent = new PageClass({
      events: {
        click: handler
      }
    })

    pageComponent.dispatchComponentWillUnmount()

    const event = new MouseEvent('click')
    pageComponent.element?.dispatchEvent(event)

    expect(handler.called).to.be.false
  })

  it('Компонент должен вызвать метод componentDidMount после монтирования', () => {
    const clock = Sinon.useFakeTimers()
    const pageComponent = new PageClass()
    const spyCDM = Sinon.spy(pageComponent, 'componentDidMount')

    const element = pageComponent.getContent()
    document.body.append(element!)
    clock.next()

    expect(spyCDM.calledOnce).to.be.true
  })

  it('Компонент должен вызвать метод componentWillUnmount после вызова dispatchComponentWillUnmount', () => {
    const pageComponent = new PageClass()
    const spyCDM = Sinon.spy(pageComponent, 'componentWillUnmount')

    pageComponent.dispatchComponentWillUnmount()

    expect(spyCDM.calledOnce).to.be.true
  })
})
