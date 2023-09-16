enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  headers?: Record<string, string>
  data?: {
    [key: string]: string | unknown[]
  }
  timeout?: number
}

interface MethodOptions extends Options {
  method?: METHODS
}

interface HTTPOptionsRequest extends Options {
  method: METHODS
}

type HTTPMethod = (url: string, options: MethodOptions) => void

function queryStringify(obj: Record<string, string | unknown[]>) {
  let queryString = ''
  const keys = Object.keys(obj)

  if (keys.length === 0) return ''

  keys.forEach((key) => {
    if (queryString !== '') {
      queryString += '&'
    }

    let value = obj[key as keyof typeof obj]

    if (Array.isArray(value)) {
      value = value.join(',')
    } else if (typeof value === 'object') {
      value = '[object Object]'
    }
    queryString += `${key}=${value}`
  })

  return queryString
}

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout)

  post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout)

  put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout)

  delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)

  request = (url: string, options: HTTPOptionsRequest, timeout = 5000) => new Promise((resolve, reject) => {
    const { method, data, headers } = options
    const xhr = new XMLHttpRequest()

    const isGet = method === METHODS.GET

    xhr.open(method, isGet && !!data ? `?${url}${queryStringify(data)}` : url)

    xhr.onload = () => {
      resolve(xhr)
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

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Set-Cookie', 'none')
    xhr.withCredentials = true

    if (method === METHODS.GET || !data) {
      xhr.send()
    } else {
      xhr.send(JSON.stringify(data))
    }
  })
}
