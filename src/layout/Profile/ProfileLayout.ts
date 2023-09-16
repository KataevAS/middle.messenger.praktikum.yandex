import styles from './ProfileLayout.module.css'

export const ProfileLayout = `
  <main class=${styles.main}>
    <div class=${styles.forward}>
      <button onclick='history.back()' class=${styles.arrow}></button>
    </div>
    <div class=${styles.content}>

      <div class=${styles.profile}>
        <div class=${styles.avatar}>
          {{{ Avatar withDefault=true }}}
        </div>

        {{> @partial-block }}

      </div>

    </div>
  </main>
`
