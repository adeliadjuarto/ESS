importScripts('workbox-sw.prod.v2.1.0.js');

const workboxSW = new WorkboxSW({skipWaiting: true, clientsClaim: true});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

workboxSW.precache([]);

workboxSW.router.registerRoute(/\.(?:png|svg|cur|ico)$/,
  workboxSW.strategies.cacheFirst({
        cacheName: 'image-cache',
        cacheableResponse: {statuses: [0, 200]}
    })
);
workboxSW.router.registerRoute(/\.ttf$/,
  workboxSW.strategies.cacheFirst({
        cacheName: 'font-cache',
        cacheableResponse: {statuses: [0, 200]}
    })
);
workboxSW.router.registerRoute('https://buzz.catapa.com/buzz-backend/(.*)',
  workboxSW.strategies.networkFirst({
        cacheName: 'buzz-backend',
        cacheExpiration: {
            maxEntries: 50,
            maxAgeSeconds: 3600000
        },
        cacheableResponse: {statuses: [0, 200]}
    })
);
