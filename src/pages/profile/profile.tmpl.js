import styles from './profile.module.css'

export default `
  {{#> profile-layout}}
    <h1 class=${styles.username}>{{username}}</h1>

    <div class=${styles.info}>
      {{> profile-form disabled=true }}
    </div>

    {{> link addClass='${styles.link}' href='#' title='Изменить данные'}}
    {{> link addClass='${styles.link}' href='#' title='Изменить пароль'}}
    {{> link addClass='${styles.link} ${styles.exitLink}' href='/' title='Выйти'}}
  {{/profile-layout}}
`
