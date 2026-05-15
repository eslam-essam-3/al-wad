// 1. تعريف المصفوفات والبيانات الثابتة
const juzList = Array.from({length: 30}, (_, i) => `الجزء ${i + 1}`);

const m_doas = [
    "اللهم اغفر لها وارحمها، وعافها واعف عنها، وأكرم نزلها، ووسع مدخلها، واغسلها بالماء والثلج والبرد.",
    "اللهم أبدلها داراً خيراً من دارها، وأهلاً خيراً من أهلها، وأدخلها الجنة.",
    "اللهم اجعل قبرها روضة من رياض الجنة، ولا تجعله حفرة من حفر النار.",
    "اللهم ارحم غربتها، وارحم شيبتها، وآنس وحشتها، واجعل مسكنها في أعلى الجنات.",
    "اللهم اجعل ذريتها ذرية صالحة تدعو لها بخير إلى يوم الدين."
];

const azkarData = {
    "sabah": [
        "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
        "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت.",
        "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين."
    ],
    "masa": [
        "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
        "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
        "أعوذ بكلمات الله التامات من شر ما خلق (3 مرات)."
    ],
    "adya": [
        "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.",
        "اللهم إنك عفو كريم تحب العفو فاعفُ عني.",
        "يا مقلب القلوب ثبت قلبي على دينك."
    ]
};

// 2. المتغيرات الحركية
let currentDoaIndex = 0;
let currentAzkarList = azkarData.sabah;
let zekrIndex = 0;
let zekrCounter = 0;

// 3. وظائف التشغيل عند التحميل
window.onload = function() {
    initSelectors();
    updateWeatherAndPrayers();
    updateDate();
    setInterval(updateClock, 1000);
    loadAzkar('sabah');
};

function initSelectors() {
    const juzSelect = document.getElementById('juzSelect');
    const surahSelect = document.getElementById('surahSelect');

    if(juzSelect) {
        juzList.forEach((juz, i) => {
            let opt = new Option(juz, i + 1);
            juzSelect.add(opt);
        });
    }

    fetch('https://api.alquran.cloud/v1/surah')
        .then(res => res.json())
        .then(data => {
            data.data.forEach(s => {
                let opt = new Option(`${s.number}. ${s.name}`, s.number);
                if(surahSelect) surahSelect.add(opt);
            });
        }).catch(err => console.error("API Error:", err));
}

// 4. الوقت والتاريخ
function updateClock() {
    const clockEl = document.getElementById('digital-clock') || document.getElementById('clock');
    if(clockEl) clockEl.innerText = new Date().toLocaleTimeString('ar-EG');
}

function updateDate() {
    const dateEl = document.getElementById('date-display');
    if(!dateEl) return;
    const now = new Date();
    const greg = now.toLocaleDateString('ar-EG', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
    const hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {day:'numeric', month:'long', year:'numeric'}).format(now);
    dateEl.innerText = `${greg} | ${hijri}`;
}

// 5. المواقيت والخلفيات
async function updateWeatherAndPrayers() {
    try {
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=29.3085&longitude=30.8428&method=5`);
        const data = await res.json();
        const timings = data.data.timings;
        displayPrayers(timings);
        determineBackground(timings);
    } catch (e) { console.log("Prayer API error"); }
}

function displayPrayers(t) {
    const container = document.getElementById('prayer-times');
    const names = { Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء" };
    if(container) {
        container.innerHTML = Object.keys(names).map(k => `
            <div class="prayer-item">
                <span class="prayer-name">${names[k]}</span>
                <span class="prayer-time">${formatTime12(t[k])}</span>
            </div>
        `).join('');
    }
}

function formatTime12(t) {
    let [h, m] = t.split(':');
    h = parseInt(h);
    return `${h % 12 || 12}:${m} ${h >= 12 ? 'م' : 'ص'}`;
}

function determineBackground(timings) {
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();
    const parse = (t) => { const [h, m] = t.split(':'); return parseInt(h) * 60 + parseInt(m); };
    
    document.body.classList.remove('bg-fajr', 'bg-dhuhr', 'bg-asr', 'bg-maghrib', 'bg-isha');
    if (current >= parse(timings.Fajr) && current < parse(timings.Dhuhr)) document.body.classList.add('bg-fajr');
    else if (current >= parse(timings.Dhuhr) && current < parse(timings.Asr)) document.body.classList.add('bg-dhuhr');
    else if (current >= parse(timings.Asr) && current < parse(timings.Maghrib)) document.body.classList.add('bg-asr');
    else if (current >= parse(timings.Maghrib) && current < parse(timings.Isha)) document.body.classList.add('bg-maghrib');
    else document.body.classList.add('bg-isha');
}

// 6. الأذكار والسبحة
function loadAzkar(type) {
    currentAzkarList = azkarData[type];
    zekrIndex = 0;
    zekrCounter = 0;
    updateZekrUI();
}

function handleZekrClick() {
    zekrCounter++;
    updateZekrUI();
}

function nextZekr() {
    zekrIndex = (zekrIndex + 1) % currentAzkarList.length;
    zekrCounter = 0;
    updateZekrUI();
}

function updateZekrUI() {
    const txt = document.getElementById('zekr-text') || document.getElementById('azkar-text');
    const btn = document.getElementById('counter-num') || document.getElementById('count-btn');
    if(txt) txt.innerText = currentAzkarList[zekrIndex];
    if(btn) btn.innerText = zekrCounter;
}

function nextDoa() {
    doaIndex = (doaIndex + 1) % m_doas.length;
    document.getElementById('doa-text').innerText = m_doas[doaIndex];
}

// 7. مستمع السور
document.getElementById('surahSelect')?.addEventListener('change', function() {
    const display = document.getElementById('quran-display') || document.getElementById('quranContent');
    if(!display || !this.value) return;
    display.innerHTML = "جاري تحميل الآيات...";
    fetch(`https://api.alquran.cloud/v1/surah/${this.value}`)
        .then(res => res.json())
        .then(data => {
            display.innerHTML = data.data.ayahs.map(a => `${a.text} <span class="verse-num">${a.numberInSurah}</span>`).join(' ');
        });
});