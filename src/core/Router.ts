import Block, { BlockProps } from './Block'
import Route from './Route'

class Router {
  private static instance: Router

  routes: Route[]

  history: typeof window.history

  _currentRoute: null | Route

  _rootQuery: string

  constructor(rootQuery: string = '#app') {
    if (Router.instance) {
      return Router.instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.instance = this
  }

  use(pathname: string, block: typeof Block, context?: BlockProps) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, context })
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(document.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    const newRoute = this.routes.find((route) => route.match(pathname))
    return newRoute
  }
}

export default Router
