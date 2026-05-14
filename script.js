const azkarData = {
    morning: [
        { text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", goal: 1 },
        { text: "آية الكرسي: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", goal: 1 },
        { text: "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور", goal: 1 },
        { text: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء", goal: 3 },
        { text: "سبحان الله وبحمده", goal: 100 },
        { text: "اللهم صل وسلم على نبينا محمد", goal: 10 }
    ],
    evening: [
        { text: "أمسينـا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", goal: 1 },
        { text: "آية الكرسي: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", goal: 1 },
        { text: "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير", goal: 1 },
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

window.onload = () => {
    updateClock();
    setInterval(updateClock, 1000);
    getPrayerTimes();
    initQuran();
    loadSunnahStatus();
};

function updateClock() {
    const now = new Date();
    document.getElementById('time').innerText = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
    });
    document.getElementById('date').innerText = now.toLocaleDateString('ar-EG', { 
        weekday: 'long', day: 'numeric', month: 'long' 
    });
}

async function getPrayerTimes() {
    const container = document.getElementById('prayerContainer');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&method=5`);
                const data = await res.json();
                const t = data.data.timings;
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

function showAzkar(cat) { currentCat = cat; curIdx = 0; curCount = 0; updateAzkarUI(); }
function updateAzkarUI() {
    const item = azkarData[currentCat][curIdx];
    document.getElementById('azkarText').innerText = item.text;
    document.getElementById('azkarCount').innerText = `${curCount} / ${item.goal}`;
    document.getElementById('counterContainer').style.display = 'block';
    document.getElementById('azkarCount').style.color = "#10b981";
}
function countAzkar() {
    const goal = azkarData[currentCat][curIdx].goal;
    if (curCount < goal) {
        curCount++;
        document.getElementById('azkarCount').innerText = `${curCount} / ${goal}`;
        if(curCount === goal) document.getElementById('azkarCount').style.color = "#fbbf24";
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
    const res = await fetch(type === 'surah' ? `https://api.alquran.cloud/v1/surah/${val}` : `https://api.alquran.cloud/v1/juz/${val}/quran-uthmani`);
    const data = await res.json();
    disp.innerHTML = (type === 'surah' ? data.data.ayahs : data.data.ayahs).map(a => a.text + ` ﴿${a.numberInSurah}﴾ `).join('');
    disp.scrollTop = 0;
}

function loadSunnahStatus() {
    document.querySelectorAll('.sunnah-section input').forEach((c, i) => {
        if (localStorage.getItem('sunnah-' + i) === 'true') c.checked = true;
        c.onchange = () => localStorage.setItem('sunnah-' + i, c.checked);
    });
}