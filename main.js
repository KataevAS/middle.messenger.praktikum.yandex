import Handlebars from 'handlebars'

import mainInput from './src/components/mainInput.tmpl'
import mainForm from './src/components/mainForm.tmpl'
import button from './src/components/button.tmpl'

import index from './src/templates/index.tmpl'
import login from './src/templates/login.tmpl'

Handlebars.registerPartial('main-input', mainInput)
Handlebars.registerPartial('main-form', mainForm)
Handlebars.registerPartial('button', button)

Handlebars.registerHelper("each", function(context, options) {
  var ret = "";

  for (var i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});

const render = (tmpl, context) => {
  return Handlebars.compile(tmpl)(context)
}

const list = [
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

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')

  const pathname = location.pathname

  switch (pathname) {
    case '/login':
      root.innerHTML = render(login, { listForm: list })
      break;
  
    default:
      root.innerHTML = render(index)
      break;
  }
})