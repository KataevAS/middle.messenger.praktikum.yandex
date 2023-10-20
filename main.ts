import { registerPartial, registerHelper, registerComponent } from './src/core/Handlebars'
// Layout
import MainLayout from './src/layout/Main'
import ProfileLayout from './src/layout/Profile'
// Pages
import ChatPage from './src/pages/chat'
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
import Router from './src/core/Router'
import DefaultLink from './src/components/DefaultLink'
import Modal from './src/components/Modal'
import ModalForm from './src/components/ModalForm'
import AddChatBtn from './src/components/AddChatBtn'
import DefaultButton from './src/components/DefaultButton'
import Popup from './src/components/Popup'
import AvatarWithUpload from './src/components/AvatarWithUpload'

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
registerComponent('DefaultLink', DefaultLink)
registerComponent('Modal', Modal)
registerComponent('ModalForm', ModalForm)
registerComponent('AddChatBtn', AddChatBtn)
registerComponent('DefaultButton', DefaultButton)
registerComponent('Popup', Popup)
registerComponent('AvatarWithUpload', AvatarWithUpload)

registerHelper('each', (context, options) => {
  let ret = ''

  for (let i = 0, j = context.length; i < j; i++) {
    ret += options.fn({ ...context[i], ...options.data.root, index: i })
  }

  return ret
})

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app')

  router
    .use('/sign-up', SigninPage)
    .use('/profile', ProfilePage)
    .use('/settings', ProfileChangePage)
    .use('/settings-password', PasswordChangePage)
    .use('/404', ErrorPage, { errorNumber: 404, desc: 'Не туда попали' })
    .use('/500', ErrorPage, { errorNumber: 500, desc: 'Мы уже фиксим' })
    .use('/messenger', ChatPage)
    .use('/', LoginPage)
    .start()
})
