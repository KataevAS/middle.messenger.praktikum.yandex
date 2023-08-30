import styles from './profileInput.module.css'

export default `
  <div class='${styles.wrapper} {{addClass}}'>
    <label>{{label}}</label>
    {{#if disabled}}
      <input class='${styles.input}' type='{{type}}' value='{{value}}' placeholder='{{placeholder}}' autocomplete="off" disabled />
    {{else}}
      <input class='${styles.input}' type='{{type}}' value='{{value}}' placeholder={{placeholder}} autocomplete="off" />
    {{/if}}
  </div>
`
