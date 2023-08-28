import styles from './mainForm.module.css'

export default `
  <form class='${styles.form}'>
    <h1 class='${styles.title}'>{{title}}</h1>
    {{> main-input }}
    {{> button name=btnName type='submit' }}
    <a class='${styles.link}' href={{link}}>{{linkName}}</a>
  </form>
`