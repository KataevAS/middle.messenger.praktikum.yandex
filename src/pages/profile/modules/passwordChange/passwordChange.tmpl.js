import styles from './passwordChange.module.css'

export default `
  {{#> profile-layout}}
    <div class=${styles.info}>
      {{> profile-form btnName='Сохранить' }}
    </div>
  {{/profile-layout}}
`
