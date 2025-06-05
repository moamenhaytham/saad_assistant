const CACHE_NAME = 'saad-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/service-worker.js',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
    // تأكد من إضافة مسارات أيقوناتك هنا:
    // '/icons/icon-192x192.png',
    // '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache for Saad PWA');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to cache files for Saad PWA:', error);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache for Saad PWA:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
