import styles from './login.module.css'

export default `
  <main class='${styles.main}'>
    {{> main-form title='Вход' btnName='Авторизоваться' link='/' linkName='Нет аккаунта?'}}
  </main>
`

