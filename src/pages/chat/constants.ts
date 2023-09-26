export const CHATS = [
  {
    id: 1,
    name: 'Вадим',
    newMessages: 1,
    lastMessage: {
      id: 1,
      authorId: 900,
      text: 'Привет!',
      date: '10:49'
    },
    messages: [
      {
        id: 1,
        authorId: 900,
        text: 'Привет!',
        date: '10:49'
      }
    ]
  },
  {
    id: 2,
    name: 'Digital',
    newMessages: 1,
    lastMessage: {
      id: 2,
      authorId: 800,
      text: `Это бренд ноутбуков линейки Macintosh на операционной системе macOS, разработанный корпорацией Apple. 
      В 2006 году заменил бренды PowerBook и iBook во время перехода с PowerPC на Intel x86.
      Текущая линейка состоит из MacBook Air (с 2008 года) и MacBook Pro (с 2006 года)[1].
      Ранее выпускались линейки под названием MacBook: первая версия с 2006 по 2012 год, вторая — с 2015 по 2019 год`,
      date: '10:49'
    },
    messages: [
      {
        id: 1,
        authorId: 100,
        text: 'Уважаемый! А что такое MacBook?',
        date: '10:49'
      },
      {
        id: 2,
        authorId: 800,
        text: `Это бренд ноутбуков линейки Macintosh на операционной системе macOS, разработанный корпорацией Apple. 
В 2006 году заменил бренды PowerBook и iBook во время перехода с PowerPC на Intel x86.
Текущая линейка состоит из MacBook Air (с 2008 года) и MacBook Pro (с 2006 года)[1].
Ранее выпускались линейки под названием MacBook: первая версия с 2006 по 2012 год, вторая — с 2015 по 2019 год`,
        date: '10:51'
      }
    ]
  },
  {
    id: 3,
    name: 'Кино',
    newMessages: 0,
    lastMessage: {
      id: 1,
      authorId: 100,
      text: 'Что посмотреть?',
      date: 'Пн'
    },
    messages: [
      {
        id: 1,
        authorId: 100,
        text: 'Что посмотреть?',
        date: 'Пн'
      }
    ]
  }
]
