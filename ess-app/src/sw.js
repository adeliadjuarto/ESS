importScripts('workbox-sw.prod.v2.1.0.js');
importScripts('assets/lodash.min.js');

const workboxSW = new WorkboxSW({skipWaiting: true, clientsClaim: true});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

self.importScripts('assets/idb-keyval-min.js');

self.addEventListener('sync', event => {
  if (event.tag === 'pwa-request-sync') {
    event.waitUntil(getRequestsFromOutbox()
      .then(requests => Promise.all(mapAndSend(requests)))
      .catch(err => console.log(err))
      .then(response => removeRequestsFromOutBox(response))
    );
  }
});

function getRequestsFromOutbox() {
  const key = 'pwa-sync';
  return idbKeyval.get(key).then(values => {
    values = values || [];
    const messages = values || [];
    return messages;
  });
}

function mapAndSend(requests) {
  return requests.map(
    request => sendMessage(request)
      .then(response => {
        registration.showNotification('Request Sent!');
        return response;
      })
      .catch(err => console.log(err)));
}

function sendMessage(requestObj) {
  let url = requestObj.url;
  let req = requestObj.request;
  var request = new FormData();
  _.mapKeys(req, (value, mapKey) =>{request.append(mapKey, value)});

  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
  };

  const msg = {
    method: 'POST',
    body: request,
    credentials: 'include',
    headers: headers
  };

  return fetch(url, msg).then((response) => {
    console.log('message sent!');
    return response;
  });
}

function removeRequestsFromOutBox(response) {
  // If the first worked,let's assume for now they all did
  if (response && response.length && response[0] && response[0].status === 200) {
    return idbKeyval.clear()
      .then(() => console.log('messages removed from outbox'))
      .catch(err => console.log('unable to remove messages from outbox'));
  }
  return Promise.resolve(true);
}

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
