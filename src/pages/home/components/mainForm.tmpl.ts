import styles from './mainForm.module.css'

export default `
  <form class='${styles.form} {{addClass}}'>
    <h1 class='${styles.title}'>{{title}}</h1>
    <ul>
    {{#each listForm}}
      <li class=${styles.field}>
        {{> input }}
      </li>
    {{/each}}
    </ul>
    {{> button name=btnName type='submit' }}
    {{> link addClass='${styles.link}' href=link title=linkName }}
  </form>
`
