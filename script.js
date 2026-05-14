// طلب إذن الإشعارات أول ما الموقع يفتح
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// دالة لتشغيل صوت الأذان
function playAdhan() {
    const audio = new Audio('https://www.islamcan.com/common/adhan/makkah.mp3'); // تقدر تغير الرابط ده لملف عندك
    audio.play().catch(error => console.log("المتصفح منع التشغيل التلقائي، لازم المستخدم يتفاعل الأول"));
}
// 1. بيانات الأذكار
const azkarData = {
    morning: [
        { text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", goal: 1 },
        { text: "آية الكرسي: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", goal: 1 },
        { text: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء", goal: 3 },
        { text: "سبحان الله وبحمده", goal: 100 },
        { text: "اللهم صل وسلم على نبينا محمد", goal: 10 }
    ],
    evening: [
        { text: "أمسينـا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", goal: 1 },
        { text: "آية الكرسي: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", goal: 1 },
        { text: "أعوذ بكلمات الله التامات من شر ما خلق", goal: 3 },
        { text: "اللهم صل وسلم على نبينا محمد", goal: 10 }
    ],
    supplication: [
        { text: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار", goal: 1 },
        { text: "اللهم إنك عفو كريم تحب العفو فاعفُ عني", goal: 1 },
        { text: "لا إله إلا أنت سبحانك إني كنت من الظالمين", goal: 1 }
    ]
};

let currentCat = 'morning', curIdx = 0, curCount = 0;
let prayerTimesList = {}; // لتخزين مواعيد الصلاة ومقارنتها بالوقت الحالي

window.onload = () => {
    updateClock();
    setInterval(updateClock, 1000); // تحديث الساعة كل ثانية
    getPrayerTimes();
    initQuran();
    loadSunnahStatus();
};

// 2. تحديث الساعة ومراقبة وقت الآذان
function updateClock() {
    const now = new Date();
    
    // الوقت بصيغة 24 ساعة للمقارنة البرمجية (مثلاً 16:30)
    const currentTime24 = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    // عرض الساعة للمستخدم بصيغة 12 ساعة (مثلاً 04:30 م)
    document.getElementById('time').innerText = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
    });

    document.getElementById('date').innerText = now.toLocaleDateString('ar-EG', { 
        weekday: 'long', day: 'numeric', month: 'long' 
    });

    // فحص هل حان وقت أي صلاة الآن؟
    checkAzan(currentTime24);
}

// 3. دالة فحص وتشغيل الآذان
function checkAzan(nowTime) {
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    prayers.forEach(p => {
        if (prayerTimesList[p] === nowTime) {
            playAzanSound();
        }
    });
}

function playAzanSound() {
    const azan = document.getElementById('azanAudio');
    if (azan && azan.paused) {
        azan.play().catch(e => console.log("تفاعل مع الصفحة لتفعيل الصوت"));
    }
}

// 4. جلب المواقيت وتخزينها
async function getPrayerTimes() {
    const container = document.getElementById('prayerContainer');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&method=5`);
                const data = await res.json();
                prayerTimesList = data.data.timings; // حفظ المواعيد
                
                const t = prayerTimesList;
                const format12 = (time) => {
                    let [h, m] = time.split(':');
                    let mod = h >= 12 ? 'م' : 'ص';
                    h = h % 12 || 12;
                    return `${h}:${m} ${mod}`;
                };

                const pNames = {Fajr:'الفجر', Dhuhr:'الظهر', Asr:'العصر', Maghrib:'المغرب', Isha:'العشاء'};
                container.innerHTML = Object.keys(pNames).map(k => `
                    <div class="prayer-card"><span>${pNames[k]}</span><span>${format12(t[k])}</span></div>
                `).join('');
                document.querySelector('.prayer-section h3').innerText = "🕌 مواقيت الصلاة (تلقائي)";
            } catch(e) { container.innerHTML = "<p>خطأ في جلب المواقيت.</p>"; }
        }, () => { container.innerHTML = "<p>يرجى تفعيل الموقع للمواقيت.</p>"; });
    }
}

// --- باقي دوال الأذكار والمصحف ---
function showAzkar(cat) { currentCat = cat; curIdx = 0; curCount = 0; updateAzkarUI(); }
function updateAzkarUI() {
    const item = azkarData[currentCat][curIdx];
    document.getElementById('azkarText').innerText = item.text;
    document.getElementById('azkarCount').innerText = `${curCount} / ${item.goal}`;
    document.getElementById('counterContainer').style.display = 'block';
}
function countAzkar() {
    const goal = azkarData[currentCat][curIdx].goal;
    if (curCount < goal) {
        curCount++;
        document.getElementById('azkarCount').innerText = `${curCount} / ${goal}`;
    }
}
function nextZikr() { curIdx = (curIdx + 1) % azkarData[currentCat].length; curCount = 0; updateAzkarUI(); }

async function initQuran() {
    const res = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await res.json();
    const sSel = document.getElementById('surahSelect'), jSel = document.getElementById('juzSelect');
    data.data.forEach(s => sSel.innerHTML += `<option value="${s.number}">${s.name}</option>`);
    for(let i=1; i<=30; i++) jSel.innerHTML += `<option value="${i}">الجزء ${i}</option>`;
}
async function loadContent(type) {
    const val = document.getElementById(type === 'surah' ? 'surahSelect' : 'juzSelect').value;
    const disp = document.getElementById('quranContainer');
    if (!val) return;
    disp.innerHTML = "جاري التحميل...";
    const res = await fetch(type === 'surah' ? `https://api.aladhan.com/v1/surah/${val}` : `https://api.aladhan.com/v1/juz/${val}/quran-uthmani`);
    const data = await res.json();
    disp.innerHTML = data.data.ayahs.map(a => a.text + ` ﴿${a.numberInSurah}﴾ `).join('');
}
function loadSunnahStatus() {
    document.querySelectorAll('.sunnah-section input').forEach((c, i) => {
        if (localStorage.getItem('sunnah-' + i) === 'true') c.checked = true;
        c.onchange = () => localStorage.setItem('sunnah-' + i, c.checked);
    });
}
function showNotification(prayerName) {
    if (Notification.permission === 'granted') {
        new Notification("حان الآن موعد صلاة " + prayerName, {
            body: "حي على الصلاة، حي على الفلاح",
            icon: "logo.png" // حط هنا مسار الأيقونة بتاعتك
        });
        playAdhan(); // تشغيل الصوت مع الإشعار
    }
}
function checkPrayers(prayerTimes) {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ":" + 
                        now.getMinutes().toString().padStart(2, '0');

    // فرضاً إن prayerTimes ده كائن (Object) فيه مواعيد الصلاة
    // مثال: { "الفجر": "04:30", "الظهر": "12:00" }
    for (let prayer in prayerTimes) {
        if (currentTime === prayerTimes[prayer]) {
            showNotification(prayer);
        }
    }
}

// نخلي الكود يتأكد كل دقيقة (60000 مللي ثانية)
setInterval(() => checkPrayers(myPrayerTimes), 60000);
function updateBackgroundByTime() {
    const hour = new Date().getHours();
    const body = document.body;

    // مسح الكلاسات القديمة عشان ميحصلش تداخل
    body.classList.remove('bg-fajr', 'bg-dhuhr', 'bg-asr', 'bg-maghrib', 'bg-isha');

    if (hour >= 4 && hour < 6) {
        body.classList.add('bg-fajr'); // وقت الفجر
    } else if (hour >= 6 && hour < 15) {
        body.classList.add('bg-dhuhr'); // وقت الظهر والصباح
    } else if (hour >= 15 && hour < 18) {
        body.classList.add('bg-asr'); // وقت العصر
    } else if (hour >= 18 && hour < 20) {
        body.classList.add('bg-maghrib'); // وقت المغرب
    } else {
        body.classList.add('bg-isha'); // وقت العشاء والليل
    }
}

// تشغيل الدالة أول ما الموقع يفتح
updateBackgroundByTime();

// تحديث الخلفية كل ساعة عشان تتغير لوحدها والموقع مفتوح
setInterval(updateBackgroundByTime, 3600000);