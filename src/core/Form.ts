import { Field } from '../types/common'
import { validateField, ErrorValidate } from '../utils/validateField'
import Block, { BlockProps } from './Block'
import { InputField } from './InputField'

interface Props extends BlockProps {
  listForm: Field[]
}

export class Form extends Block {
  protected props: Props

  readonly fields = {} as Record<Field['name'], Field['value']>

  public errors: ErrorValidate[] = []

  refs: Record<string, InputField | Block>

  constructor(props: Props) {
    super({
      ...props,
      onChange: (name: Field['name'], value: Field['value']) => {
        this.fields[name] = value
      }
    })

    this.props.listForm.forEach((field) => {
      this.fields[field.name] = field.value
    })
  }

  protected validate() {
    this.errors = []
    this.props.listForm.forEach(({ name }) => {
      const component = this.refs[name]

      if (component && 'validate' in component) {
        component.validate()
        this.errors.push(...component.errors)
      }
    })
  }

  protected validateItem(info: Pick<Field, 'name' | 'value'>) {
    this.errors = validateField(info)
  }
}
