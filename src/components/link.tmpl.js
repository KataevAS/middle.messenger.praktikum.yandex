import styles from './link.module.css'

export default `
  <a class='${styles.link} {{addClass}}' href={{href}}>{{title}}</a>
`
