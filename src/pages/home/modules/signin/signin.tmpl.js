import styles from './signin.module.css'

export default `
  {{#> main-layout}}
    {{> main-form
      addClass='${styles.form}'
      title='Регистрация'
      btnName='Зарегистрироваться'
      link='/login'
      linkName='Войти'
    }}
  {{/main-layout}}
`

