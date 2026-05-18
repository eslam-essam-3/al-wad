const CACHE_NAME = 'azkar-v102';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        if (networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        return new Response(JSON.stringify({ offline: true }), { headers: { 'Content-Type': 'application/json' } });
      });
    })
  );
});
let dynamicPrayerTimes = {}; // مصفوفة فاضية هتستقبل المواعيد المتغيرة

// الاستماع للمواعيد المرسلة من واجهة الموقع وتحديثها فوراً
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_PRAYER_TIMES') {
        dynamicPrayerTimes = event.data.times;
        console.log("تم تحديث مواقيت الصلاة في الخلفية بنجاح:", dynamicPrayerTimes);
    }
});

// فحص الوقت الحالي ومقارنته بالمواقيت المتحدثة
setInterval(() => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    // الفحص مش هيشتغل إلا لو الواجهة بعتت المواعيد فعلاً
    for (const [prayerName, prayerTime] of Object.entries(dynamicPrayerTimes)) {
        if (currentTime === prayerTime) {
            
            self.registration.showNotification("مواقيت الصلاة", {
                body: `حان الآن موعد أذان ${prayerName} حسب التوقيت المحلي`,
                icon: 'icon.jpg',
                vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40],
                tag: `prayer-${prayerName}-${currentTime}`,
                requireInteraction: true
            });
            
        }
    }
}, 60000);