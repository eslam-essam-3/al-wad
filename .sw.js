const CACHE_NAME = 'azkar-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './quran-data.js', // ضفناه هنا عشان يتحفظ أوفلاين
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
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجية جلب البيانات وتشغيل الأوفلاين الصحيحة
self.addEventListener('fetch', (e) => {
  // لو الطلب رايح لـ APIs خارجية، خليه يروح للنت علطول وميدخلش جوه الكاش
  if (e.request.url.includes('aladhan.com') || e.request.url.includes('alquran.cloud')) {
    e.respondWith(fetch(e.request).catch(() => {
      // لو النت مقطوع والـ API اطلبت، يرجع رد فاضي عشان الأبلكيشن ميهنجش
      return new Response(JSON.stringify({ error: "Offline" }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }));
    return;
  }

  // للملفات الأساسية للموقع (HTML, CSS, JS): اسحب من الكاش فورًا لو متوفر، عشان يفتح أوفلاين طلقة
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // لو الملف في الكاش افتحه فورًا
      }
      return fetch(e.request); // لو مش في الكاش روحي هاتيه من النت
    })
  );
});