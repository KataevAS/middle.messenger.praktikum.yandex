import ProfileForm from '../../components/ProfileForm'
import { PATH } from '../../constants'
import API from '../../core/API'
import Block from '../../core/Block'
import Router from '../../core/Router'
import { Field } from '../../types/common'
import { listFormProfilePage } from './constants'

import styles from './ProfilePage.module.css'

interface Props {
  [key: string]: unknown
  listForm: Field[]
}
export class ProfilePage extends Block {
  props: Props

  refs: {
    form: ProfileForm
  }

  constructor() {
    super({
      listForm: listFormProfilePage,
      username: '',
      onExit: () => {
        API.User.logout()
          .then((res) => {
            if (res.error) {
              alert(res.error.message)
            } else {
              localStorage.removeItem('user')
              const router = new Router()
              router.go(PATH.LOGIN)
            }
          })
          .catch((err) => {
            console.error(err)
          })
      }
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('user')) {
      const router = new Router()
      router.go(PATH.LOGIN)
      return
    }

    API.User.getUser()
      .then((res) => {
        if (res.error) {
          alert(res.error.message)
        }

        if ('data' in res) {
          const userData = res.data

          const newListForm = this.props.listForm.map((item) => {
            return {
              ...item,
              value: userData[item.name]
            }
          })

          this.setProps({
            username: userData.first_name
          })

          this.refs.form.setProps({ listForm: newListForm })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  protected render(): string {
    return `
      {{#> ProfileLayout}}
        {{{ AvatarWithUpload }}}
        <h1 class=${styles.username}>{{username}}</h1>
    
        <div class=${styles.info}>
          {{{ ProfileForm disabled=true listForm=listForm ref='form' }}}
        </div>
    
        {{{ Link addClass='${styles.link}' href='/settings' title='Изменить данные'}}}
        {{{ Link addClass='${styles.link}' href='/settings-password' title='Изменить пароль'}}}
        {{{ DefaultButton onClick=onExit className='${styles.btn}' content='Выйти' ref='exit' }}}
      {{/ProfileLayout}}
    `
  }
}
