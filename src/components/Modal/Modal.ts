import Block from '../../core/Block'
import { Field } from '../../types/common'
import ModalForm from '../ModalForm'

import styles from './Modal.module.css'

type Props = {
  visible?: boolean
  listForm: Field[]
  onSubmit: (data: Record<string, unknown>) => void
}

export class Modal extends Block {
  props: Props

  refs: {
    form: ModalForm
  }

  constructor(props: Props) {
    super({
      ...props,
      onSubmitForm: () => {
        const result = {} as Record<string, unknown>

        this.props.listForm.forEach((field) => {
          const { value } = this.refs.form.refs[field.name]
          result[field.name] = value
        })

        this.props.onSubmit(result)
        this.close()
      },
      events: {
        click: () => {
          this.close()
        }
      }
    })
  }

  open() {
    this.setProps({ visible: true })
  }

  close() {
    this.setProps({ visible: false })
  }

  toggle() {
    this.setProps({ visible: !this.props.visible })
  }

  protected render(): string {
    return `
      <div class='${styles.root} ${this.props.visible ? styles.visible : styles.hide}'>
        {{{ ModalForm
          title=title
          listForm=listForm
          btnName=btnName
          onSubmit=onSubmitForm
          ref='form'
        }}}
      </div>
    `
  }
}
