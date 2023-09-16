import Block from '../core/Block'

import styles from './IndexPage.module.css'

export class IndexPage extends Block {
  constructor() {
    super({})
  }

  protected render(): string {
    return `
      <main class=${styles.main}>
        <p>Пока это просто заглушка для страницы чатов, ниже ссылки на верстку страниц</p>
        <nav>
          <ul>
            <li>
              <a href='/chat'>Страница чатов</a>
            </li>
            <li>
              <a href='/login'>Страница авторизации</a>
            </li>
            <li>
              <a href='/signin'>Страница регистрации</a>
            </li>
            <li>
              <a href='/profile'>Страница профиля</a>
            </li>
            <li>
              <a href='/profile-change'>Страница изменения профиля</a>
            </li>
            <li>
              <a href='/password-change'>Страница изменения пароля</a>
            </li>
            <li>
              <a href='/404'>404</a>
            </li>
            <li>
              <a href='/500'>500</a>
            </li>
          </ul>
        </nav>
      </main>
    `
  }
}
