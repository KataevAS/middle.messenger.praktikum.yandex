import styles from './profile.module.css'

export default `
  <main class=${styles.main}>
    <div class=${styles.forward}>
      <button onclick='history.back()' class=${styles.arrow}></button>
    </div>
    <div class=${styles.content}>

      <div class=${styles.profile}>
        <div class=${styles.avatar}>
          {{> avatar src='#' alt='avatar' }}
        </div>

        {{> @partial-block }}

      </div>

    </div>
  </main>
`
