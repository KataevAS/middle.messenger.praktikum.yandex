import styles from './error.module.css'

export default `
  {{#> main-layout}}
    <div class='${styles.wrapper}'>
      <h1 class='${styles.title}'>{{errorNumber}}</h1>
      <p class='${styles.desc}'>{{desc}}</p>
      {{> link href='/' title='Назад к чатам'}}
    </div>
  {{/main-layout}}
`