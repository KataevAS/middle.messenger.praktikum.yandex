import { HOST } from '../../constants'
import API from '../../core/API'
import Block from '../../core/Block'
import Avatar from '../Avatar'
import Modal from '../Modal'

import styles from './AvatarWithUpload.module.css'

const listForm = [
  {
    type: 'file',
    name: 'avatar',
    id: 'LABEL_AVATAR',
    label: 'Выбрать файл'
  }
]

export class AvatarWithUpload extends Block {
  refs: {
    modal: Modal
    avatar: Avatar
  }

  isOpen = false

  constructor(props: any) {
    super({
      ...props,
      listForm,
      onSubmitModal: () => {
        const form = this.refs.modal.refs.form.element as HTMLFormElement
        const formData = new FormData(form)
        API.User.uploadAvatar(formData).then((res) => {
          if (!res.error && 'data' in res && res.data) {
            localStorage.setItem('userAva', res.data.avatar)
            const src = encodeURI(`${HOST}/resources${localStorage.getItem('userAva')}`)
            this.refs.avatar.setProps({ src })
          }
        })
      },
      events: {
        click: () => {
          if (this.isOpen) {
            this.isOpen = false
            this.refs.modal.close()
          } else {
            this.isOpen = true
            this.refs.modal.open()
          }
        }
      }
    })
  }

  protected render(): string {
    const src = encodeURI(`${HOST}/resources${localStorage.getItem('userAva')}`)
    return `
      <div class=${styles.avatar}>
        {{{ Avatar withDefault=true src='${src}' ref='avatar' }}}
        {{{ Modal
          title='Добавить аватар'
          btnName='Добавить'
          listForm=listForm
          onSubmit=onSubmitModal
          ref='modal'
        }}}
      </div>
    `
  }
}
