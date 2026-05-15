// 1. تعريف مصفوفة الأجزاء (30 جزء)
const juzList = Array.from({length: 30}, (_, i) => `الجزء ${i + 1}`);

// 2. مصفوفة أدعية الحاجة أمباركة (رحمها الله)
const m_doas = [
    "اللهم اغفر لها وارحمها، وعافها واعف عنها، وأكرم نزلها، ووسع مدخلها، واغسلها بالماء والثلج والبرد.",
    "اللهم إن كانت محسنة فزد في إحسانها، وإن كانت مسيئة فتجاوز عن سيئاتها.",
    "اللهم أبدلها داراً خيراً من دارها، وأهلاً خيراً من أهلها، وأدخلها الجنة.",
    "اللهم اجعل قبرها روضة من رياض الجنة ولا تجعله حفرة من حفر النار.",
    "اللهم يمّن كتابها، ويسّر حسابها، وثقل بالحسنات ميزانها.",
    "اللهم ارحمها تحت الأرض، واسترهـا يوم العرض، ولا تخزها يوم يبعثون."
];

let currentDoaIndex = 0;
let currentAzkarList = [];
let currentIndex = 0;
let count = 0;

// مصفوفة الأذكار
const azkarData = {
    sabah: [
        "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
        "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.",
        "أعوذ بكلمات الله التامات من شر ما خلق. (3 مرات)",
        "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.",
        "يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين."
    ],
    masa: [
        "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
        "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
        "اللهم إني أعوذ بك من الكفر والفقر، وأعوذ بك من عذاب القبر.",
        "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم. (3 مرات)"
    ],
    adya: [
        "اللهم إنك عفو كريم تحب العفو فاعف عني.",
        "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.",
        "يا مقلب القلوب ثبت قلبي على دينك.",
        "لا إله إلا أنت سبحانك إني كنت من الظالمين."
    ]
};

// 3. وظيفة تحميل القوائم وتنسيق الصفحة عند البدء
window.onload = function() {
    const juzSelect = document.getElementById('juzSelect');
    const surahSelect = document.getElementById('surahSelect');

    // تحميل الأجزاء
    if(juzSelect) {
        juzList.forEach((juz, index) => {
            let opt = document.createElement('option');
            opt.value = index + 1;
            opt.innerHTML = juz;
            juzSelect.appendChild(opt);
        });
    }

    // تحميل السور من الـ API
    fetch('https://api.alquran.cloud/v1/surah')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(surah => {
                let opt = document.createElement('option');
                opt.value = surah.number;
                opt.innerHTML = `${surah.number}. ${surah.name}`;
                surahSelect.appendChild(opt);
            });
        });

    updateWeatherAndPrayers(); 
    setInterval(updateClock, 1000); 
    loadAzkar('sabah'); // تحميل أذكار الصباح تلقائياً
};

// 4. وظيفة تحويل الوقت لنظام 12 ساعة (ص/م)
function formatTime12(time24) {
    if (!time24) return "--:--";
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours);
    let period = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
}

// 5. جلب المواقيت وعرضها
async function updateWeatherAndPrayers() {
    const lat = 29.3085; // إحداثيات الفيوم
    const lon = 30.8428;
    
    try {
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5`);
        const data = await res.json();
        const timings = data.data.timings;

        const prayerContainer = document.getElementById('prayer-times');
        const prayerNames = {
            Fajr: "الفجر",
            Dhuhr: "الظهر",
            Asr: "العصر",
            Maghrib: "المغرب",
            Isha: "العشاء"
        };

        prayerContainer.innerHTML = Object.keys(prayerNames).map(key => `
            <div class="prayer-item">
                <span class="prayer-name">${prayerNames[key]}</span>
                <span class="prayer-time">${formatTime12(timings[key])}</span>
            </div>
        `).join('');

        determineCurrentPrayer(timings);
    } catch (error) {
        console.error("خطأ في تحميل المواقيت", error);
    }
}

// 6. تحديد الخلفية بناءً على الوقت
function determineCurrentPrayer(timings) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const parseTime = (t) => {
        const [h, m] = t.split(':');
        return parseInt(h) * 60 + parseInt(m);
    };

    document.body.classList.remove('bg-fajr', 'bg-dhuhr', 'bg-asr', 'bg-maghrib', 'bg-isha');

    if (currentTime >= parseTime(timings.Fajr) && currentTime < parseTime(timings.Dhuhr)) {
        document.body.classList.add('bg-fajr');
    } else if (currentTime >= parseTime(timings.Dhuhr) && currentTime < parseTime(timings.Asr)) {
        document.body.classList.add('bg-dhuhr');
    } else if (currentTime >= parseTime(timings.Asr) && currentTime < parseTime(timings.Maghrib)) {
        document.body.classList.add('bg-asr');
    } else if (currentTime >= parseTime(timings.Maghrib) && currentTime < parseTime(timings.Isha)) {
        document.body.classList.add('bg-maghrib');
    } else {
        document.body.classList.add('bg-isha');
    }
}

// 7. وظائف الأذكار والدعاء
function loadAzkar(type) {
    currentAzkarList = azkarData[type];
    currentIndex = 0;
    count = 0;
    showZekr();
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
}

function showZekr() {
    const textElement = document.getElementById('zekr-text');
    if (textElement && currentAzkarList.length > 0) {
        textElement.innerText = currentAzkarList[currentIndex];
        document.getElementById('count-btn').innerText = `تسبيح (0)`;
    }
}

function updateCount() {
    count++;
    document.getElementById('count-btn').innerText = `تسبيح (${count})`;
}

function nextZekr() {
    if (currentIndex < currentAzkarList.length - 1) {
        currentIndex++;
        count = 0;
        showZekr();
    } else {
        alert("ختمت الأذكار يا هندسة، تقبل الله منك!");
        currentIndex = 0;
        count = 0;
        showZekr();
    }
}

function nextDoa() {
    currentDoaIndex = (currentDoaIndex + 1) % m_doas.length;
    document.getElementById('doa-text').innerText = m_doas[currentDoaIndex];
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerHTML = now.toLocaleTimeString('ar-EG');
}

// مستمع لحدث تغيير السورة
document.getElementById('surahSelect').addEventListener('change', function() {
    const surahId = this.value;
    if (!surahId) return;
    const display = document.getElementById('quranContent');
    display.innerHTML = "جاري تحميل الآيات...";
    fetch(`https://api.alquran.cloud/v1/surah/${surahId}`)
        .then(res => res.json())
        .then(data => {
            let ayahs = data.data.ayahs.map(a => `<span class="ayah">${a.text} ﴿${a.numberInSurah}﴾</span>`).join(' ');
            display.innerHTML = ayahs;
        });
});