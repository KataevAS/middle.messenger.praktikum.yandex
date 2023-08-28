import Handlebars from 'handlebars'

import mainLayout from './src/layout/main.tmpl'

import input from './src/components/input.tmpl'
import button from './src/components/button.tmpl'
import link from './src/components/link.tmpl'

import mainForm from './src/pages/home/components/mainForm.tmpl'

import index from './src/pages/index.tmpl'
import errorPage from './src/pages/error/error.tmpl'
import login from './src/pages/home/modules/login/login.tmpl'
import signin from './src/pages/home/modules/signin/signin.tmpl'

const render = (tmpl, context) => {
  return Handlebars.compile(tmpl)(context)
}

Handlebars.registerPartial('main-layout', mainLayout)
Handlebars.registerPartial('input', input)
Handlebars.registerPartial('main-form', mainForm)
Handlebars.registerPartial('button', button)
Handlebars.registerPartial('link', link)

Handlebars.registerHelper('each', function(context, options) {
  var ret = "";

  for (var i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});

const listFormLoginPage = [
  {
    label: 'Логин',
    type: 'text',
    name: 'login'
  },
  {
    label: 'Пароль',
    type: 'password',
    name: 'password'
  }
]

const listFormSigninPage = [
  {
    label: 'Почта',
    type: 'text',
    name: 'email'
  },
  {
    label: 'Логин',
    type: 'text',
    name: 'login'
  },
  {
    label: 'Имя',
    type: 'text',
    name: 'first_name'
  },
  {
    label: 'Фамилия',
    type: 'text',
    name: 'second_name'
  },
  {
    label: 'Телефон',
    type: 'tel',
    name: 'phone'
  },
  {
    label: 'Пароль',
    type: 'password',
    name: 'password'
  },
  {
    label: 'Пароль (ещё раз)',
    type: 'password',
    name: 'password'
  }
]

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')

  const pathname = location.pathname
  console.log(pathname)
  switch (pathname) {
    case '/login':
      root.innerHTML = render(login, { listForm: listFormLoginPage })
      break;

    case '/signin':
      root.innerHTML = render(signin, { listForm: listFormSigninPage })
      break;

    case '/404':
      root.innerHTML = render(errorPage, { errorNumber: 404, desc: 'Не туда попали' })
      break;

    case '/500':
      root.innerHTML = render(errorPage, { errorNumber: 500, desc: 'Мы уже фиксим'})
      break;
  
    default:
      root.innerHTML = render(index)
      break;
  }
})