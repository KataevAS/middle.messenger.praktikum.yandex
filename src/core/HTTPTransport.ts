import { queryStringify } from '../utils/queryStringify'

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  headers?: Record<string, string>
  data?: {
    [key: string]: unknown
  } | FormData
  timeout?: number
}

interface MethodOptions extends Options {
  method?: METHODS
}

interface HTTPOptionsRequest extends Options {
  method: METHODS
}

type HTTPMethod = (url: string, options?: MethodOptions) => Promise<XMLHttpRequest>

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    const { data } = options
    const newUrl = !!data && !(data instanceof FormData) ? `${url}?${queryStringify(data)}` : url

    return this.request(newUrl, { ...options, method: METHODS.GET }, options.timeout)
  }

  post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout)

  put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout)

  delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)

  request = (url: string, options: HTTPOptionsRequest, timeout = 5000) => (
    new Promise<XMLHttpRequest>((resolve, reject) => {
      const { method, data, headers } = options
      const xhr = new XMLHttpRequest()

      xhr.open(method, url)

      xhr.onload = () => {
        const result = {
          ...xhr,
          status: xhr.status,
          response: xhr.response === 'OK' ? xhr.response : JSON.parse(xhr.response)
        }
        resolve(result)
      }

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, String(headers[key]))
        })
      }

      xhr.timeout = timeout

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      xhr.withCredentials = true

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    }))
}
