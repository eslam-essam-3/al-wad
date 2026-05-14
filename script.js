// 1. طلب إذن الإشعارات
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// 2. بيانات الأذكار
const azkarData = {
    morning: [
        { text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", goal: 1 },
        { text: "آية الكرسي: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", goal: 1 },
        { text: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء", goal: 3 },
        { text: "سبحان الله وبحمده", goal: 100 },
        { text: "اللهم صل وسلم على نبينا محمد", goal: 10 }
    ],
    evening: [
        { text: "أمسينـا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", goal: 1 },
        { text: "آية الكرسي: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", goal: 1 },
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
let prayerTimesList = {}; 

// 3. تشغيل الدوال الأساسية عند تحميل الصفحة
window.onload = () => {
    updateClock();
    setInterval(updateClock, 1000); 
    getPrayerTimes();
    initQuran();
    loadSunnahStatus();
    updateBackgroundByTime(); // تشغيل تغيير الخلفية فوراً
};

// 4. تحديث الساعة ومراقبة وقت الأذان
function updateClock() {
    const now = new Date();
    const currentTime24 = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    if(timeElement) timeElement.innerText = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    if(dateElement) dateElement.innerText = now.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' });

    checkAzan(currentTime24);
}

// 5. جلب المواقيت بناءً على الموقع الجغرافي
async function getPrayerTimes() {
    const container = document.getElementById('prayerContainer');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&method=5`);
                const data = await res.json();
                prayerTimesList = data.data.timings; 
                
                const t = prayerTimesList;
                const format12 = (time) => {
                    let [h, m] = time.split(':');
                    let mod = h >= 12 ? 'م' : 'ص';
                    h = h % 12 || 12;
                    return `${h}:${m} ${mod}`;
                };

                const pNames = {Fajr:'الفجر', Dhuhr:'الظهر', Asr:'العصر', Maghrib:'المغرب', Isha:'العشاء'};
                if(container) {
                    container.innerHTML = Object.keys(pNames).map(k => `
                        <div class="prayer-card"><span>${pNames[k]}</span><span>${format12(t[k])}</span></div>
                    `).join('');
                }
                const title = document.querySelector('.prayer-section h3');
                if(title) title.innerText = "🕌 مواقيت الصلاة (تلقائي)";
            } catch(e) { if(container) container.innerHTML = "<p>خطأ في جلب المواقيت.</p>"; }
        }, () => { if(container) container.innerHTML = "<p>يرجى تفعيل الموقع للمواقيت.</p>"; });
    }
}

// 6. فحص وتشغيل الأذان والإشعارات
function checkAzan(nowTime) {
    const pNames = {Fajr:'الفجر', Dhuhr:'الظهر', Asr:'العصر', Maghrib:'المغرب', Isha:'العشاء'};
    Object.keys(pNames).forEach(p => {
        if (prayerTimesList[p] === nowTime) {
            showNotification(pNames[p]);
        }
    });
}

function showNotification(prayerName) {
    if (Notification.permission === 'granted') {
        new Notification("حان الآن موعد صلاة " + prayerName, {
            body: "ذكرى للمرحومة إمباركة محمد عتمان - لا تنسوها من دعائكم",
            icon: "logo.png" 
        });
        playAdhan();
    }
}

function playAdhan() {
    const audio = new Audio('https://www.islamcan.com/common/adhan/makkah.mp3');
    audio.play().catch(e => console.log("الصوت محجوب حتى يتفاعل المستخدم"));
}

// 7. تغيير الخلفية حسب الوقت
function updateBackgroundByTime() {
    const hour = new Date().getHours();
    const body = document.body;
    body.classList.remove('bg-fajr', 'bg-dhuhr', 'bg-asr', 'bg-maghrib', 'bg-isha');

    if (hour >= 4 && hour < 6) body.classList.add('bg-fajr');
    else if (hour >= 6 && hour < 15) body.classList.add('bg-dhuhr');
    else if (hour >= 15 && hour < 18) body.classList.add('bg-asr');
    else if (hour >= 18 && hour < 20) body.classList.add('bg-maghrib');
    else body.classList.add('bg-isha');
}
setInterval(updateBackgroundByTime, 3600000);

// --- دوال الأذكار ---
function showAzkar(cat) { 
    currentCat = cat; curIdx = 0; curCount = 0; 
    document.getElementById('counterContainer').style.display = 'block';
    updateAzkarUI(); 
}
function updateAzkarUI() {
    const item = azkarData[currentCat][curIdx];
    document.getElementById('azkarText').innerText = item.text;
    document.getElementById('azkarCount').innerText = `${curCount} / ${item.goal}`;
}
function countAzkar() {
    const goal = azkarData[currentCat][curIdx].goal;
    if (curCount < goal) {
        curCount++;
        document.getElementById('azkarCount').innerText = `${curCount} / ${goal}`;
    }
}
function nextZikr() { curIdx = (curIdx + 1) % azkarData[currentCat].length; curCount = 0; updateAzkarUI(); }

// --- دوال المصحف ---
async function initQuran() {
    try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await res.json();
        const sSel = document.getElementById('surahSelect');
        if(sSel) data.data.forEach(s => sSel.innerHTML += `<option value="${s.number}">${s.name}</option>`);
    } catch(e) { console.log("خطأ في تحميل قائمة السور"); }
}
async function loadContent(type) {
    const val = document.getElementById('surahSelect').value;
    const disp = document.getElementById('quranContainer');
    if (!val) return;
    disp.innerHTML = "جاري التحميل...";
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${val}`);
    const data = await res.json();
    disp.innerHTML = data.data.ayahs.map(a => a.text + ` ﴿${a.numberInSurah}﴾ `).join('');
}

function loadSunnahStatus() {
    document.querySelectorAll('.sunnah-section input').forEach((c, i) => {
        if (localStorage.getItem('sunnah-' + i) === 'true') c.checked = true;
        c.onchange = () => localStorage.setItem('sunnah-' + i, c.checked);
    });
}