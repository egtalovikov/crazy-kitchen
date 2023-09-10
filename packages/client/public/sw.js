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

this.addEventListener('install', async (event) => {
  try {
    const cache = await caches.open(CACHE_NAME)
    console.log('Opened cache')
    await cache.addAll(URLS)
  } catch (err) {
    console.log(err)
    throw err
  }
})

this.addEventListener('activate', async (event) => {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(async (cacheName) => {
        if (cacheName !== CACHE_NAME) {
          await caches.delete(cacheName)
        }
      })
    )
  } catch (err) {
    console.log(err)
    throw err
  }
})

this.addEventListener('fetch', async (event) => {
  try {
    const response = await caches.match(event.request);
    if (response) {
      return response
    }

    const fetchRequest = event.request.clone()
    const fetchedResponse = await fetch(fetchRequest)

    if (!fetchedResponse || fetchedResponse.status !== 200 || fetchedResponse.type !== 'basic') {
      return fetchedResponse
    }

    const responseToCache = fetchedResponse.clone()

    const cache = await caches.open(CACHE_NAME)

    await cache.put(event.request, responseToCache)

    return fetchedResponse

  } catch (err) {
    console.log(err)
    throw err
  }
})

this.addEventListener('install', event => {
  console.log('install')
})

this.addEventListener('activate', event => {
  console.log('activate')
})
