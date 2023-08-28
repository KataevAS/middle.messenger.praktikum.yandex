import styles from './input.module.css'

export default `
  <div class='${styles.wrapper}'>
    <input class='${styles.input}' type={{ type }} name={{ name }} required/>
    <label class='${styles.label}'>{{ label }}</label>
  </div>
`