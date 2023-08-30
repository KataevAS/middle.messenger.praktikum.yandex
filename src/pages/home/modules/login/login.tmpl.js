import styles from './login.module.css'

export default `
  {{#> main-layout}}
    {{> main-form
      addClass='${styles.form}'
      title='Вход'
      btnName='Авторизоваться'
      link='/signin'
      linkName='Нет аккаунта?'
    }}
  {{/main-layout}}
`
