import { expect } from 'chai'
import Sinon from 'sinon'
import { HTTPTransport, METHODS } from './HTTPTransport'

describe('HTTPTransport', () => {
  it('Метод get должен правильно преобразовать объект в строку', async () => {
    const http = new HTTPTransport()
    const requestStub = Sinon.stub(http, 'request').resolves()
    const options = { data: { a: '1', b: '2' }, method: METHODS.GET }

    await http.get('/test', { data: options.data })

    const expectedUrl = '/test?a=1&b=2'

    expect(requestStub.calledWithMatch(expectedUrl, options, undefined)).to.be.true
  })

  it('Метод get не должен добавлять параметры, если data не передавали', async () => {
    const http = new HTTPTransport()
    const requestStub = Sinon.stub(http, 'request').resolves()
    const options = { method: METHODS.GET }
    const url = '/test'

    await http.get(url)

    expect(requestStub.calledWithMatch(url, options, undefined)).to.be.true
  })

  it('Метод get должен принимать timeout', async () => {
    const http = new HTTPTransport()
    const requestStub = Sinon.stub(http, 'request').resolves()
    const timeout = 3000
    const options = { method: METHODS.GET, timeout }
    const url = '/test'

    await http.get(url, { timeout })

    expect(requestStub.calledWithMatch(url, options, timeout)).to.be.true
  })
})
