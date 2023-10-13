const APP_HOST = 'http://localhost:3000/api'
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
    THEME: {
      ENDPOINT: '/theme',
    },
  },
}

export default API
