import styles from './mainInput.module.css'

export default `
  <ul>
  {{#each listForm}}
    <li class='${styles.field}'>
      <div class='${styles.wrapper}'>
        <input class='${styles.input}' type={{ type }} name={{ name }} required/>
        <label class='${styles.label}'>{{ label }}</label>
      </div>
    </li>
  {{/each}}
  </ul>
`