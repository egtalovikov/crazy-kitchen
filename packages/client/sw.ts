// @ts-ignore
const CACHE_NAME = 'crazy-kitchen-cache-v1'

const URLS = [
  '/',
  '/profile',
  '/login',
  '/game',
  '/end_game',
  '/registration',
  '/leaderboard',
  '/forum',
  '/topic',
  '/main',
  '/not-found',
  '/internal-server-error',
]

this.addEventListener('install', event => {
  // @ts-ignore
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

this.addEventListener('activate', event => {
  // @ts-ignore
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

this.addEventListener('fetch', event => {
  // @ts-ignore
  event.respondWith(
    // @ts-ignore
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      // @ts-ignore
      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          // @ts-ignore
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})

this.addEventListener('install', event => {
  console.log('install')
})

this.addEventListener('activate', event => {
  console.log('activate')
})
