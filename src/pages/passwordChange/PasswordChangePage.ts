import { FIELDS, PATH } from '../../constants'
import API from '../../core/API'
import Block from '../../core/Block'
import { Form } from '../../core/Form'
import Router from '../../core/Router'
import { listFormPasswordChangePage } from './constants'

import styles from './PasswordChangePage.module.css'

export class PasswordChangePage extends Block {
  refs: {
    form: Form
  }

  constructor() {
    super({
      listForm: listFormPasswordChangePage,
      username: 'Иван',
      onSubmit: () => {
        const oldPasswordComponent = this.refs.form.refs[FIELDS.OLD_PASSWORD]
        const newPasswordComponent = this.refs.form.refs[FIELDS.NEW_PASSWORD]
        const repeatPasswordComponent = this.refs.form.refs[FIELDS.REPEAT_PASSWORD]

        if (
          oldPasswordComponent
          && newPasswordComponent
          && repeatPasswordComponent
          && 'getValue' in oldPasswordComponent
          && 'getValue' in newPasswordComponent
          && 'getValue' in repeatPasswordComponent
        ) {
          const oldPassword = oldPasswordComponent.getValue()
          const newPassword = newPasswordComponent.getValue()
          const repeatPassword = repeatPasswordComponent.getValue()

          if (newPassword !== repeatPassword) {
            this.refs.form.errors.push({
              name: FIELDS.REPEAT_PASSWORD,
              message: 'Старый и новый пароли должны совпадать '
            })
          } else {
            API.User.changePassword({
              oldPassword,
              newPassword
            })
              .then((res) => {
                if (res.error) {
                  alert(res.error.message)
                } else {
                  alert('Пароль успешно изменен!')
                }
              })
              .catch((err) => {
                console.error(err)
              })
          }
        }
      }
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('user')) {
      const router = new Router()
      router.go(PATH.LOGIN)
    }
  }

  protected render(): string {
    return `
      {{#> ProfileLayout}}
        {{{ AvatarWithUpload }}}
        <div class=${styles.info}>
          {{{ ProfileForm btnName='Сохранить' listForm=listForm isEqualPassword=true onSubmit=onSubmit ref='form' }}}
        </div>
      {{/ProfileLayout}}
    `
  }
}
