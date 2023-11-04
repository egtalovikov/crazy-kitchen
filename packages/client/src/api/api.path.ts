const APP_HOST = `${__SERVER_URL__}/api`
const HOST = `${APP_HOST}/v2`
console.log('HOST', HOST)
console.log('env', process.env.NODE_ENV)
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
