const CACHE_NAME = 'azkar-v100';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon.jpg'
];

// تثبيت السيرفس وركر وحفظ الملفات الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// تفعيل السيرفس وركر وتنظيف الكاش القديم
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(() => self.clients.claim())
  );
});

// استراتيجية جلب البيانات (القرآن والأذان والكود أوفلاين)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // لو الملف متسيف في الكاش افتحه فورًا أوفلاين
      if (cachedResponse) {
        return cachedResponse;
      }

      // لو مش في الكاش والنت شغال، روحي هاتي البيانات وسيفيها للمرات الجاية
      return fetch(e.request).then((networkResponse) => {
        if (networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        // لو مفيش نت خالص والملف مش متكش، يرجع رد فاضي وميهنجش الأبلكيشن
        return new Response(JSON.stringify({ offline: true }), { headers: { 'Content-Type': 'application/json' } });
      });
    })
  );
});