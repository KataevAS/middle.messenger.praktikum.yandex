import styles from './profileForm.module.css'

export default `
  <form class='${styles.form} {{addClass}}'>
    <ul>
      {{#if disabled}}
        {{#each listForm}}
          <li class=${styles.field}>
            {{> profile-input disabled=true }}
          </li>
        {{/each}}
      {{else}}
        {{#each listForm}}
          <li class=${styles.field}>
            {{> profile-input }}
          </li>
        {{/each}}
      {{/if}}
    </ul>

    {{#if btnName}}
      <div class=${styles.btn}>
        {{> button name=btnName type='submit' }}
      </div>
    {{/if}}
  </form>
`
