import Handlebars from 'handlebars'

import mainLayout from './src/layout/main.tmpl'
import profileLayout from './src/layout/profile.tmpl'

import input from './src/components/input.tmpl'
import button from './src/components/button.tmpl'
import link from './src/components/link.tmpl'
import avatar from './src/components/avatar.tmpl'

import index from './src/pages/index.tmpl'

import mainForm from './src/pages/home/components/mainForm.tmpl'
import login from './src/pages/home/modules/login/login.tmpl'
import { listFormLoginPage } from './src/pages/home/modules/login/constants'
import signin from './src/pages/home/modules/signin/signin.tmpl'
import { listFormSigninPage } from './src/pages/home/modules/signin/constants'

import profile from './src/pages/profile/profile.tmpl'
import { listFormProfilePage } from './src/pages/profile/constants'
import profileChange from './src/pages/profile/modules/profileChange/profileChange.tmpl'
import { listFormProfileChangePage } from './src/pages/profile/modules/profileChange/constants'
import passwordChange from './src/pages/profile/modules/passwordChange/passwordChange.tmpl'
import { listFormPasswordChangePage } from './src/pages/profile/modules/passwordChange/constants'
import profileForm from './src/pages/profile/components/profileForm.tmpl'
import profileInput from './src/pages/profile/components/profileInput.tmpl'

import errorPage from './src/pages/error/error.tmpl'

const getRender = (root: Element) => (tmpl: any, context?: unknown) => {
  root.innerHTML = Handlebars.compile(tmpl)(context)
}

const registerPartial = (name: string, tmpl: string): void => {
  Handlebars.registerPartial(name, tmpl)
}

registerPartial('main-layout', mainLayout)
registerPartial('profile-layout', profileLayout)

registerPartial('input', input)
registerPartial('main-form', mainForm)
registerPartial('button', button)
registerPartial('link', link)
registerPartial('avatar', avatar)

registerPartial('profile-input', profileInput)
registerPartial('profile-form', profileForm)
registerPartial('profile-change', profileChange)
registerPartial('password-change', passwordChange)

Handlebars.registerHelper('each', (context, options) => {
  let ret = ''

  for (let i = 0, j = context.length; i < j; i++) {
    ret += options.fn(context[i])
  }

  return ret
})

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')

  const { pathname } = window.location

  if (!root) return

  const render = getRender(root)

  switch (pathname) {
    case '/login':
      render(login, { listForm: listFormLoginPage })
      break

    case '/signin':
      render(signin, { listForm: listFormSigninPage })
      break

    case '/profile':
      render(profile, { listForm: listFormProfilePage, username: 'Иван' })
      break

    case '/profile-change':
      render(profileChange, { listForm: listFormProfileChangePage })
      break

    case '/password-change':
      render(profileChange, { listForm: listFormPasswordChangePage })
      break

    case '/404':
      render(errorPage, { errorNumber: 404, desc: 'Не туда попали' })
      break

    case '/500':
      render(errorPage, { errorNumber: 500, desc: 'Мы уже фиксим' })
      break

    default:
      render(index)
      break
  }
})
