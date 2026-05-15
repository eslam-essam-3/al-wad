/**
 * تطبيق مساعد المسلم - النسخة الكاملة الشاملة
 * صدقة جارية على روح / امباركة محمد عتمان
 */

// 1. قائمة الأدعية الكاملة (20 دعاء بدون نقص)
const m_doas = [
    "اللهم اغفر لها وارحمها، وعافها واعف عنها، وأكرم نزلها، ووسع مدخلها، واغسلها بالماء والثلج والبرد.",
    "اللهم أبدلها داراً خيراً من دارها، وأهلاً خيراً من أهلها، وأدخلها الجنة، وأعذها من عذاب القبر ومن عذاب النار.",
    "اللهم إن كانت محسنة فزد في إحسانها، وإن كانت مسيئة فتجاوز عن سيئاتها.",
    "اللهم اجعل قبرها روضة من رياض الجنة، ولا تجعله حفرة من حفر النار.",
    "اللهم يمّن كتابها، ويسّر حسابها، وثقل بالحسنات ميزانها، وثبت على الصراط أقدامها.",
    "اللهم اسقها من حوض نبيك محمد ﷺ شربة هنيئة مريئة لا تظمأ بعدها أبداً.",
    "اللهم ارحمها فوق الأرض وتحت الأرض ويوم العرض عليك.",
    "اللهم عاملها بما أنت أهله، ولا تعاملها بما هي أهله، واجزها عن الإحسان إحساناً.",
    "اللهم أنزلها منزلاً مباركاً، وأنت خير المنزلين، اللهم أنزلها منازل الصديقين والشهداء والصالحين.",
    "اللهم قها فتنة القبر، وجفاف الأرض عن جنبيها، اللهم املأ قبرها بالرضا والنور والفسحة والسرور.",
    "اللهم إنها كانت تشهد أنك لا إله إلا أنت وأن محمداً عبدك ورسولك وأنت أعلم بها، فاغفر لها.",
    "اللهم ارحم غربتها، وارحم شيبتها، وآنس وحشتها، واجعل مسكنها في أعلى الجنات.",
    "اللهم اجعل ذريتها ذرية صالحة تدعو لها بخير إلى يوم الدين.",
    "اللهم ارحم من كسر قلوبنا رحيلها، واجعل شوقنا لها في ميزان حسناتنا وحسناتها دعاءً مستجاباً.",
    "اللهم إن رحمتك وسعت كل شيء فارحمها رحمة تطمئن بها نفسها وتقر بها عينها.",
    "اللهم احشرها مع المتقين إلى الرحمن وفداً، وفي زمرة المقربين وبشرها بروح وريحان وجنة نعيم.",
    "اللهم يا حنان يا منان يا واسع الغفران اغفر لها وارحمها وعافها واعف عنها.",
    "اللهم ثبتها عند السؤال، اللهم ثبتها عند السؤال، اللهم ثبتها عند السؤال.",
    "اللهم انقلها من مواطن الدود وضيق اللحود إلى جنات الخلود.",
    "اللهم اجعل عن يمينها نوراً، حتى تبعثها آمنة مطمئنة في نور من نورك."
];

// 2. قائمة الأذكار (تقدر تزيد فيها براحتك)
const azkarData = {
    "sabah": [
        "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
        "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت.",
        "رضيت بالله رباً، وبالإسلام ديناً، وبمحمد ﷺ نبياً (3 مرات).",
        "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم (3 مرات).",
        "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين.",
        "اللهم إني أسألك العافية في الدنيا والآخرة، اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي.",
        "سبحان الله وبحمده: عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته (3 مرات).",
        "اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر."
    ],
    "masa": [
        "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
        "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
        "أعوذ بكلمات الله التامات من شر ما خلق (3 مرات).",
        "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والجبن والبخل، وضلع الدين، وغلبة الرجال.",
        "اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري، لا إله إلا أنت.",
        "اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير.",
        "سبحان الله وبحمده (100 مرة)."
    ],
    "adya": [
        "اللهم اهدني وسددني، واجعلني مباركاً أينما كنت.",
        "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.",
        "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.",
        "اللهم إنك عفو كريم تحب العفو فاعفُ عني.",
        "لا إله إلا أنت سبحانك إني كنت من الظالمين.",
        "يا مقلب القلوب ثبت قلبي على دينك.",
        "اللهم اكفني بحلالك عن حرامك، وأغنني بفضل عمن سواك."
    ]
};

let currentAzkarList = azkarData.sabah;
let zekrIndex = 0;
let zekrCounter = 0;
let doaIndex = 0;

window.onload = () => {
    updateClock();
    setInterval(updateClock, 1000);
    updateDate();
    updatePrayers();
    initQuranAndJuz(); // تفعيل السور والأجزاء
    loadAzkar('sabah');
    updateDoaUI();
};

// 3. الساعة (نظام 12 ساعة) والتاريخ
function updateClock() {
    const clockEl = document.getElementById('clock');
    if(clockEl) {
        clockEl.innerText = new Date().toLocaleTimeString('ar-EG', { 
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
        });
    }
}

function updateDate() {
    const dateEl = document.getElementById('date-display');
    if(dateEl) {
        const now = new Date();
        const hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {day:'numeric', month:'long', year:'numeric'}).format(now);
        dateEl.innerText = hijri;
    }
}

// 4. مواقيت الصلاة والخلفيات
async function updatePrayers() {
    try {
        const res = await fetch('https://api.aladhan.com/v1/timings?latitude=29.3084&longitude=30.8428&method=5');
        const data = await res.json();
        const t = data.data.timings;
        const names = {Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء"};
        
        const container = document.getElementById('prayer-times');
        if(container) {
            container.innerHTML = Object.keys(names).map(k => `
                <div class="prayer-item">
                    <span class="prayer-name">${names[k]}</span> 
                    <strong class="prayer-time">${formatTime12(t[k])}</strong>
                </div>
            `).join('');
        }
        changeBackground(t);
    } catch (e) { console.error("Error loading prayers"); }
}

function formatTime12(t) {
    let [h, m] = t.split(':');
    h = parseInt(h);
    const ampm = h >= 12 ? 'م' : 'ص';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
}

function changeBackground(timings) {
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();
    const parse = (t) => { const [h, m] = t.split(':'); return parseInt(h) * 60 + parseInt(m); };
    const body = document.body;
    body.classList.remove('bg-fajr', 'bg-dhuhr', 'bg-asr', 'bg-maghrib', 'bg-isha');

    if (current >= parse(timings.Fajr) && current < parse(timings.Dhuhr)) body.classList.add('bg-fajr');
    else if (current >= parse(timings.Dhuhr) && current < parse(timings.Asr)) body.classList.add('bg-dhuhr');
    else if (current >= parse(timings.Asr) && current < parse(timings.Maghrib)) body.classList.add('bg-asr');
    else if (current >= parse(timings.Maghrib) && current < parse(timings.Isha)) body.classList.add('bg-maghrib');
    else body.classList.add('bg-isha');
}

// 5. الأذكار والأدعية
function loadAzkar(type) {
    currentAzkarList = azkarData[type];
    zekrIndex = 0;
    zekrCounter = 0;
    updateZekrUI();
}

function updateCount() {
    zekrCounter++;
    document.getElementById('count-btn').innerText = `تسبيح (${zekrCounter})`;
}

function nextZekr() {
    zekrIndex = (zekrIndex + 1) % currentAzkarList.length;
    zekrCounter = 0;
    updateZekrUI();
}

function updateZekrUI() {
    document.getElementById('zekr-text').innerText = currentAzkarList[zekrIndex];
    document.getElementById('count-btn').innerText = `تسبيح (0)`;
}

function nextDoa() {
    doaIndex = (doaIndex + 1) % m_doas.length;
    updateDoaUI();
}

function updateDoaUI() {
    document.getElementById('doa-text').innerText = m_doas[doaIndex];
}

// 6. القرآن الكريم (سور وأجزاء)
async function initQuranAndJuz() {
    const sSelect = document.getElementById('surahSelect');
    const jSelect = document.getElementById('juzSelect');
    const display = document.getElementById('quranContent');

    // تحميل السور
    try {
        const resS = await fetch('https://api.alquran.cloud/v1/surah');
        const dataS = await resS.json();
        dataS.data.forEach(s => sSelect.add(new Option(s.name, s.number)));
        
        // تحميل الأجزاء (30 جزء)
        for (let i = 1; i <= 30; i++) {
            jSelect.add(new Option(`الجزء ${i}`, i));
        }

        sSelect.onchange = async () => {
            if(!sSelect.value) return;
            display.innerText = "جاري تحميل السورة...";
            const res = await fetch(`https://api.alquran.cloud/v1/surah/${sSelect.value}`);
            const data = await res.json();
            display.innerHTML = data.data.ayahs.map(a => `${a.text} <span class="verse-num">(${a.numberInSurah})</span>`).join(' ');
        };

        jSelect.onchange = async () => {
            if(!jSelect.value) return;
            display.innerText = "جاري تحميل الجزء...";
            const res = await fetch(`https://api.alquran.cloud/v1/juz/${jSelect.value}/quran-uthmani`);
            const data = await res.json();
            display.innerHTML = data.data.ayahs.map(a => `${a.text} <span class="verse-num">(${a.surah.name})</span>`).join(' ');
        };
    } catch(e) { display.innerText = "خطأ في الاتصال بالمصحف."; }
}