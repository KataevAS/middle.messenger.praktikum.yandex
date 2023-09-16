// Core
import Block, { BlockProps } from './src/core/Block'
import { registerPartial, registerHelper, registerComponent } from './src/core/Handlebars'
// Layout
import MainLayout from './src/layout/Main'
import ProfileLayout from './src/layout/Profile'
// Pages
import ChatPage from './src/pages/chat'
import IndexPage from './src/pages'
import SigninPage from './src/pages/signin'
import LoginPage from './src/pages/login'
import ProfilePage from './src/pages/profile'
import PasswordChangePage from './src/pages/passwordChange'
import ProfileChangePage from './src/pages/profileChange'
import ErrorPage from './src/pages/error'
// Components
import Avatar from './src/components/Avatar'
import Button from './src/components/Button'
import MainInputField from './src/components/MainInputField'
import Link from './src/components/Link'
import MainForm from './src/components/MainForm'
import ProfileForm from './src/components/ProfileForm'
import Input from './src/components/Input'
import ProfileInputField from './src/components/ProfileInputField'
import ErrorLine from './src/components/ErrorLine'
import ChatList from './src/components/ChatList'
import Chat from './src/components/Chat'
import InputSearch from './src/components/InputSearch'
import ChatFilteredList from './src/components/ChatFilteredList'
import ChatCard from './src/components/ChatCard'
import MessageForm from './src/components/MessageForm'
import MessageField from './src/components/MessageField'
import MessagesList from './src/components/MessagesList'
import Message from './src/components/Message'
import DateComponent from './src/components/DateComponent'

const getRender = (root: Element) => (page: typeof Block, props?: BlockProps) => {
  const Component = page
  const component = new Component(props)
  root?.append(component.getContent()!)
}

registerPartial('ProfileLayout', ProfileLayout)
registerPartial('MainLayout', MainLayout)

registerComponent('Avatar', Avatar)
registerComponent('Button', Button)
registerComponent('MainInputField', MainInputField)
registerComponent('Link', Link)
registerComponent('MainForm', MainForm)
registerComponent('ProfileForm', ProfileForm)
registerComponent('Input', Input)
registerComponent('ProfileInputField', ProfileInputField)
registerComponent('ErrorLine', ErrorLine)
registerComponent('ChatList', ChatList)
registerComponent('Chat', Chat)
registerComponent('InputSearch', InputSearch)
registerComponent('ChatFilteredList', ChatFilteredList)
registerComponent('ChatCard', ChatCard)
registerComponent('MessageForm', MessageForm)
registerComponent('MessageField', MessageField)
registerComponent('MessagesList', MessagesList)
registerComponent('Message', Message)
registerComponent('DateComponent', DateComponent)

registerHelper('each', (context, options) => {
  let ret = ''

  for (let i = 0, j = context.length; i < j; i++) {
    ret += options.fn({ ...context[i], ...options.data.root, index: i })
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
      render(LoginPage)
      break

    case '/signin':
      render(SigninPage)
      break

    case '/profile':
      render(ProfilePage)
      break

    case '/chat':
      render(ChatPage)
      break

    case '/profile-change':
      render(ProfileChangePage)
      break

    case '/password-change':
      render(PasswordChangePage)
      break

    case '/404':
      render(ErrorPage, { errorNumber: 404, desc: 'Не туда попали' })
      break

    case '/500':
      render(ErrorPage, { errorNumber: 500, desc: 'Мы уже фиксим' })
      break

    default:
      render(IndexPage)
      break
  }
})
