const APP_HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : `http://158.160.7.189:3000/api`
const HOST = `${APP_HOST}/v2`

const API = {
  HOST,
  APP_HOST,
  ENDPOINTS: {
    FORUM: {
      ENDPOINT: '',
      COMMENTS: '/comments',
      REPLIES: '/replies',
      TOPICS: '/topics',
      TOPIC: '/topic',
    },
    USER: {
      ENDPOINT: '',
      SAVE: '/user',
    },
    THEME: {
      ENDPOINT: '/theme',
    },
  },
}

export default API
