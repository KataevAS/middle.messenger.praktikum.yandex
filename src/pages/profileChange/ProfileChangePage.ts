import ProfileForm from '../../components/ProfileForm'
import { PATH } from '../../constants'
import API from '../../core/API'
import Block from '../../core/Block'
import Router from '../../core/Router'
import { Field } from '../../types/common'
import { listFormProfileChangePage } from './constants'

import styles from './ProfileChangePage.module.css'

interface Props {
  [key: string]: unknown
  listForm: Field[]
  username: string
}

export class ProfileChangePage extends Block {
  refs: {
    form: ProfileForm
  }

  props: Props

  constructor() {
    super({
      listForm: listFormProfileChangePage,
      username: 'Иван',
      onSubmit: () => {
        const { form } = this.refs

        if (!form.errors.length) {
          const result = {} as Record<string, string>

          listFormProfileChangePage.forEach((item) => {
            const component = form.refs[item.name]
            if ('value' in component && component.value) {
              result[item.name] = component.value
            }
          })

          API.User.changeUser(result)
            .then((res) => {
              if (res.error) {
                alert(res.error.message)
              } else {
                alert('Данные успешно изменены!')
              }
            })
            .catch((err) => {
              console.error(err)
            })
        }
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
        <div class=${styles.info}>
          {{{ ProfileForm
            btnName='Сохранить'
            listForm=listForm
            onSubmit=onSubmit
            ref='form' 
          }}}
        </div>
      {{/ProfileLayout}}
    `
  }
}
