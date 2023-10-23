import { expect } from 'chai'
import Sinon from 'sinon'
import Block, { BlockProps } from './Block'
import Router from './Router'

describe('Router', () => {
  let PageOne: typeof Block
  let PageTwo: typeof Block

  const urlPageOne = '/page-one'
  const textPageOne = 'PageOne'

  const urlPageTwo = '/page-two'
  const textPageTwo = 'PageTwo'

  let router: Router

  before(() => {
    class PageOneClass extends Block {
      constructor(props: BlockProps) {
        super({ ...props })
      }

      protected render(): string {
        return `<div id="test-page">${textPageOne}</div>`
      }
    }

    class PageTwoClass extends Block {
      constructor(props: BlockProps) {
        super({ ...props })
      }

      protected render(): string {
        return '<div id="test-page">{{text}}</div>'
      }
    }

    PageOne = PageOneClass
    PageTwo = PageTwoClass

    router = new Router()
    router.start()
  })

  it('Должен отрисовать дефолтный маршрут при старте', () => {
    expect(window.location.pathname).to.be.eq('/')
  })

  it('Должен перейти на новый маршрут по методу go', () => {
    router.use(urlPageOne, PageOne)

    router.go(urlPageOne)

    expect(document.querySelector('#test-page')?.textContent).to.be.eq(textPageOne)
  })

  it('Должен перейти на новый маршрут по методу go с контекстом', () => {
    router.use(urlPageTwo, PageTwo, { text: textPageTwo })

    router.go(urlPageTwo)

    expect(document.querySelector('#test-page')?.textContent).to.be.eq(textPageTwo)
  })

  it('Должен перейти назад по истории используя браузерный метод', () => {
    const backFn = Sinon.stub(window.history, 'back')

    router.back()

    expect(backFn.calledOnce).to.be.true
  })

  it('Должен перейти вперед по истории используя браузерный метод', () => {
    const backFn = Sinon.stub(window.history, 'forward')

    router.forward()

    expect(backFn.calledOnce).to.be.true
  })
})
