if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}
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
        "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السمَاوَاتِ وَمَا فِي الْأَرْضِ ۚ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
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
        "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السمَاوَاتِ وَمَا فِي الْأَرْضِ ۚ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
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
        "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ.",
        "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِر_لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ.",
        "رَبَّنَا مَا خَلَقْتَ هَذا بَاطِلاً سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ رَبَّنَا إِنَّكَ مَن تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ رَّبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَى رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ.",
        "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.",
        "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ.",
        "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.",
        "اللهم إنك عفو كريم تحب العفو فاعفُ عني.",
        "لا إله إلا أنت سبحانك إني كنت من الظالمين.",
        "يا مقلب القلوب ثبت قلبي على دينك.",
        "اللهم اكفني بحلالك عن حرامك، وأغنني بفضل عمن سواك."
    ]
};

// --- المتغيرات الأساسية ---
let currentAzkarList = azkarData.sabah;
let zekrIndex = 0;
let doaIndex = 0;
// حفظ مكان العناصر في الذاكرة لسرعة الاستجابة
let zekrDisplayElement = null;
let countBtnElement = null;
let doaDisplayElement = null;

// --- 1. تشغيل التطبيق عند التحميل (الـ Refresh) ---
window.onload = () => {
    // كاش للعناصر عشان العداد ميعلقش
    zekrDisplayElement = document.getElementById('zekr-text');
    countBtnElement = document.getElementById('count-btn');
    doaDisplayElement = document.getElementById('doa-text');
    updateClock();
    setInterval(updateClock, 1000);
    updateDate();
    
    // بننادي الدالة علطول وهي هتتصرف لو فيه نت أو مفيش
    updatePrayers();
    
    if (navigator.onLine) {
        initQuranAndJuz();
    } else {
        const quranDisplay = document.getElementById('quranContent');
        if (quranDisplay) quranDisplay.innerText = "المصحف يتطلب اتصالاً بالإنترنت لعرض الآيات.";
    }
    
    loadAzkar('sabah'); 
    updateDoaUI();

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if ("Notification" in window) {
        Notification.requestPermission();
    }
};

// --- 2. وظيفة تحديث واجهة الذكر (عشان الفصل) ---
function updateZekrUI() {
    const currentZekr = currentAzkarList[zekrIndex];
    const zekrDisplay = document.getElementById('zekr-text');
    const countBtn = document.getElementById('count-btn'); 

    if (zekrDisplay) zekrDisplay.innerText = currentZekr;

    if (countBtn) {
        // بنجيب القيمة المتخزنة باسم الذكر ده بالظبط من الذاكرة
        // لو ملوش عد قديم (أول مرة يفتح) بيظهر 0 تلقائياً ويبدأ من الصفر
        const savedCount = localStorage.getItem('tasbih_' + currentZekr) || 0;
        countBtn.innerText = savedCount + " تسبيح";
    }
}
function updateAzkarCount(btn) {
    const zekrDisplay = document.getElementById('zekr-text');
    if (!zekrDisplay) return;

    const zekrText = zekrDisplay.innerText; // مسكنا النص بتاع الذكر أو الدعاء الحالي
    
    // بنطلع الرقم الحالي المكتوب على الزرار ونزوده 1
    let current = parseInt(btn.innerText.replace(/[^0-9]/g, '')) || 0;
    let newValue = current + 1;
    
    // تحديث الرقم على الشاشة فوراً
    btn.innerText = newValue + " تسبيح";

    // حفظ العداد في الذاكرة باسم الذكر ده هو بس عشان يفضل منفصل عن الباقي
    localStorage.setItem('tasbih_' + zekrText, newValue);

    // هزة خفيفة للموبايل
    if (navigator.vibrate) navigator.vibrate(50);
}
// دالة لفحص المواقيت وإرسال تنبيه في وقت الأذان
function checkPrayerNotifications(times) {
    const now = new Date();
    // تحويل الوقت الحالي لصيغة (ساعة:دقيقة)
    const currentTime = now.getHours().toString().padStart(2, '0') + ":" + 
                        now.getMinutes().toString().padStart(2, '0');

    const prayers = {
        'Fajr': 'الفجر',
        'Dhuhr': 'الظهر',
        'Asr': 'العصر',
        'Maghrib': 'المغرب',
        'Isha': 'العشاء'
    };

    for (let key in prayers) {
        if (times[key] === currentTime) {
            sendNotification("حان الآن موعد أذان " + prayers[key], "حي على الصلاة.. لا تنسَ ذكر الله");
        }
    }
}

// دالة إرسال التنبيه الفعلي للنظام
function sendNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: body,
            icon: 'icon.jpg' // هيستخدم الأيقونة اللي إحنا لسه ضايفينها
        });
    }
}

// --- 3. وظيفة زيادة العداد والحفظ باسم الذكر ---
function updateAzkarCount(btn) {
    const zekrDisplay = document.getElementById('zekr-text');
    if (!zekrDisplay) return;

    const zekrText = zekrDisplay.innerText;
    
    // زيادة العداد الظاهري (بنطلع الرقم بس ونزوده)
    let current = parseInt(btn.innerText.replace(/[^0-9]/g, '')) || 0;
    let newValue = current + 1;
    btn.innerText = newValue + " تسبيح";

    // الحفظ في الذاكرة: "اسم الذكر" = "الرقم الجديد"
    localStorage.setItem('tasbih_' + zekrText, newValue);

    if (navigator.vibrate) navigator.vibrate(50);
}

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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // الرابط الجديد بالإحداثيات
            const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const timings = data.data.timings;

                // --- 1. تحديد الصورة بناءً على الوقت (نقلناها هنا) ---
                const now = new Date();
                const hour = now.getHours();
                let bgImage = 'isha.jpg';

                if (hour >= 4 && hour < 6) bgImage = 'fajr.jpg';
                else if (hour >= 6 && hour < 12) bgImage = 'dhuhr.jpg';
                else if (hour >= 12 && hour < 15) bgImage = 'dhuhr.jpg';
                else if (hour >= 15 && hour < 18) bgImage = 'asr.jpg';
                else if (hour >= 18 && hour < 20) bgImage = 'maghrib.jpg';
                else bgImage = 'isha.jpg';

                document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bgImage}')`;

                // --- 2. عرض مواقيت الصلاة (نقلناها هنا) ---
                const prayerNames = {
                    "Fajr": "الفجر",
                    "Sunrise": "الشروق",
                    "Dhuhr": "الظهر",
                    "Asr": "العصر",
                    "Maghrib": "المغرب",
                    "Isha": "العشاء"
                };

                const prayerDiv = document.getElementById('prayer-times');
                if (prayerDiv) {
                    prayerDiv.innerHTML = ''; // مسح المحتوى القديم
                    for (let key in prayerNames) {
                        let time = timings[key];
                        // استخدام دالة التنسيق اللي عندك تحت
                        let time12 = formatTime12(time); 

                        prayerDiv.innerHTML += `
                            <div class="prayer-card">
                                <span>${prayerNames[key]}</span>
                                <strong>${time12}</strong>
                            </div>
                        `;
                    }
                }

            } catch (error) {
                console.error("Error fetching prayers:", error);
            }
        }, (error) => {
            console.error("Location access denied", error);
            alert("يرجى تفعيل الموقع لعرض مواقيت الصلاة لمدينتك.");
        });
    } else {
        alert("متصفحك لا يدعم خاصية تحديد الموقع.");
    }
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
function loadAzkar(category) {
    // 1. تحديث شكل الزراير (اللون الأخضر)
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeBtn = document.querySelector(`button[onclick*="${category}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // 2. تغيير القائمة بناءً على النوع اللي اخترته
    if (category === 'sabah') {
        currentAzkarList = azkarData.sabah;
    } else if (category === 'masa') {
        currentAzkarList = azkarData.masa;
    } else if (category === 'adya') {
        currentAzkarList = azkarData.adya;
    }

    // 3. إعادة ضبط العدادات لعرض أول ذكر في القائمة الجديدة
    zekrIndex = 0; 
    zekrCounter = 0; // تصفير عداد التسبيح للذكر الجديد
    
    // 4. تشغيل الدالة اللي بتحدث النص على الشاشة (تأكد من اسمها عندك)
    updateZekrUI(); 
}

function nextZekr() {
    zekrIndex = (zekrIndex + 1) % currentAzkarList.length;
    updateZekrUI();
}

function prevZekr() {
    // لو إحنا في أول ذكر، يرجع لآخر ذكر في القائمة
    if (zekrIndex <= 0) {
        zekrIndex = currentAzkarList.length - 1;
    } else {
        zekrIndex--;
    }
    
    // أهم حاجة ننادي على الدالة اللي بتحدث النص والعداد المحفوظ
    updateZekrUI();
}

function updateZekrUI() {
    const currentZekr = currentAzkarList[zekrIndex];
    const zekrDisplay = document.getElementById('zekr-text');
    const countBtn = document.getElementById('count-btn'); // تأكد إن ده الـ ID في الـ HTML

    if (zekrDisplay) zekrDisplay.innerText = currentZekr;

    if (countBtn) {
        // بنجيب القيمة المتخزنة باسم الذكر ده بالظبط
        const savedCount = localStorage.getItem('tasbih_' + currentZekr) || 0;
        countBtn.innerText = savedCount + " تسبيح";
    }
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
    const display = document.getElementById('quranContent');
    if (!sSelect || !display) return;

    // أسماء الـ 114 سورة بالترتيب عشان تظهر في القائمة فوراً أونلاين وأوفلاين بدون نت
    const surahNames = [
        "الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"
    ];

    // تعبئة القائمة بالـ 114 سورة فوراً
    sSelect.innerHTML = '<option value="">اختر السورة...</option>';
    surahNames.forEach((name, index) => {
        sSelect.add(new Option(`سورة ${name}`, index + 1));
    });

    // عند اختيار السورة
    sSelect.onchange = async () => {
        const surahId = sSelect.value;
        if (!surahId) {
            display.innerText = "الرجاء اختيار سورة لعرض الآيات.";
            return;
        }

        // 1. جلب السورة من الذاكرة المحلية (لو فتحتها قبل كده أوفلاين)
        const localKey = `quran_surah_${surahId}`;
        const savedSurah = localStorage.getItem(localKey);

        if (savedSurah) {
            const surahData = JSON.parse(savedSurah);
            display.innerHTML = surahData.verses.map((text, i) => {
                return `${text} <span class="verse-num" style="color: #2ecc71; font-weight: bold;">(${i + 1})</span>`;
            }).join(' ');
            return;
        }

        // 2. لو مش متسيفة، نجبها من السيرفر بالنت ونعرضها ونحفظها هي لوحدها
        display.innerText = "جاري تحميل السورة بالتشكيل الحقيقي... ثواني";
        try {
            const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/quran-uthmani`);
            const data = await res.json();
            
            const surahData = {
                name: data.data.name,
                verses: data.data.ayahs.map(ayah => ayah.text)
            };

            // حفظ السورة دي لوحدها في المتصفح عشان تشتغل أوفلاين بعد كده
            localStorage.setItem(localKey, JSON.stringify(surahData));

            // عرض الآيات
            display.innerHTML = surahData.verses.map((text, i) => {
                return `${text} <span class="verse-num" style="color: #2ecc71; font-weight: bold;">(${i + 1})</span>`;
            }).join(' ');

        } catch (err) {
            display.innerHTML = '<p style="text-align:center; color:#ff7675;">هذه السورة غير محملة أوفلاين وتتطلب اتصالاً بالإنترنت لفتحها لأول مرة.</p>';
            console.error(err);
        }
    };
}
// وظيفة النسخ الذكية
function copyText(elementId, btn) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "تم النسخ ✅";
        btn.style.background = "#22c55e";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "rgba(34, 197, 94, 0.2)";
        }, 1500);
    });
}

// وظيفة العداد (التسبيح)
function updateGeneralTasbih(btn) {
    // 1. استخراج الرقم بس من النص (هياخد الـ 0 ويسيب كلمة تسبيح)
    let current = parseInt(btn.innerText) || 0;
    
    // 2. زيادة الرقم
    let newValue = current + 1;
    
    // 3. كتابة النص الجديد جوه الزرار
    btn.innerText = newValue + " تسبيح";

    // 4. (إضافة من عندي) حفظ الإجمالي عشان ميروحش لو قفلت الصفحة
    localStorage.setItem('totalTasbih', (parseInt(localStorage.getItem('totalTasbih')) || 0) + 1);

    // هزة بسيطة لو شغال من الموبايل
    if (navigator.vibrate) navigator.vibrate(50);
}
// وظيفة جلب مواقيت الصلاة
async function getPrayerTimes(lat = null, lng = null) {
    let url = '';
    
    if (lat && lng) {
        url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=5`;
    } else {
        url = `https://api.aladhan.com/v1/timingsByCity?city=Fayoum&country=Egypt&method=5`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const timings = data.data.timings;

        // الحفظ في الذاكرة عشان لما يفصل نت نلاقيها موجودة
        localStorage.setItem('lastCachedPrayers', JSON.stringify(timings));

        // تشغيل دالة العرض على الشاشة
        displayPrayers(timings);

    } catch (error) {
        console.error("خطأ في جلب المواقيت، محاولة عرض المواقيت المحفوظة:", error);
        
        // لو حصل خطأ (مفيش نت)، بنحاول نجيب آخر مواقيت متخزنة
        const savedTimings = localStorage.getItem('lastCachedPrayers');
        if (savedTimings) {
            const timings = JSON.parse(savedTimings);
            displayPrayers(timings);
        } else {
            document.getElementById('prayer-times').innerHTML = "<p>تتطلب مواقيت الصلاة اتصالاً بالإنترنت لأول مرة.</p>";
        }
    }
}

// دالة مساعدة جديدة عشان تعرض المواقيت في الـ HTML ومنكررش الكود
function displayPrayers(timings) {
    const prayerNames = {
        "Fajr": "الفجر",
        "Sunrise": "الشروق",
        "Dhuhr": "الظهر",
        "Asr": "العصر",
        "Maghrib": "المغرب",
        "Isha": "العشاء"
    };

    const prayerDiv = document.getElementById('prayer-times');
    if (prayerDiv) {
        prayerDiv.innerHTML = ''; 
        for (let key in prayerNames) {
            let time = timings[key];
            let time12 = typeof formatTime12 === "function" ? formatTime12(time) : time; 
            prayerDiv.innerHTML += `
                <div class="prayer-card">
                    <span>${prayerNames[key]}</span>
                    <strong>${time12}</strong>
                </div>
            `;
        }
    }
    
    if (typeof changeBackground === "function") changeBackground(timings);
    if (typeof checkPrayerNotifications === "function") checkPrayerNotifications(timings);
}

// تشغيل الوظيفة أول ما الموقع يفتح
window.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // لو وافق على الموقع، نبعت الإحداثيات للدالة
                getPrayerTimes(position.coords.latitude, position.coords.longitude);
            },
            () => {
                // لو رفض، تشتغل افتراضي على الفيوم
                getPrayerTimes();
            }
        );
    } else {
        // لو المتصفح لا يدعم، تشتغل على الفيوم
        getPrayerTimes();
    }
});
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// تشغيل الوضع المحفوظ أول ما الصفحة تفتح
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// 1. دالة فحص المواقيت وإرسال تنبيه في وقت الأذان
function checkPrayerNotifications(times) {
    const now = new Date();
    // الحصول على الوقت الحالي بصيغة (ساعة:دقيقة)
    const currentTime = now.getHours().toString().padStart(2, '0') + ":" + 
                        now.getMinutes().toString().padStart(2, '0');

    const prayers = {
        'Fajr': 'الفجر',
        'Dhuhr': 'الظهر',
        'Asr': 'العصر',
        'Maghrib': 'المغرب',
        'Isha': 'العشاء'
    };

    for (let key in prayers) {
        // لو وقت الصلاة في الـ API طابق الوقت الحالي للموبايل
        if (times[key] === currentTime) {
            sendNotification("حان الآن موعد أذان " + prayers[key], "حي على الصلاة.. لا تنسَ ذكر الله");
        }
    }
}
// ==================== كود تشغيل المصحف والأجزاء أوفلاين 100% ====================

// مصفوفة لتحديد السور اللي بيبدأ منها كل جزء من الـ 30 جزء
const juzToSurahMap = {
    1: 1,   2: 2,   3: 2,   4: 3,   5: 4,   6: 4,   7: 5,   8: 6,   9: 7,   10: 8,
    11: 9,  12: 11, 13: 12, 14: 15, 15: 17, 16: 18, 17: 21, 18: 23, 19: 25, 20: 27,
    21: 29, 22: 33, 23: 36, 24: 39, 25: 41, 26: 46, 27: 51, 28: 58, 29: 67, 30: 78
};

// الدالة الذكية المضمونة لجلب بيانات الـ 114 سورة كاملة بالرسم العثماني
async function getFullOfflineQuran() {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/quran-uthmani');
        const data = await response.json();
        
        const quranData = {};
        data.data.surahs.forEach(surah => {
            quranData[surah.number] = {
                name: `سورة ${surah.name}`,
                verses: surah.ayahs.map(ayah => ayah.text)
            };
        });
        return quranData;
    } catch (e) {
        console.log("النت مقطوع، يتم الاعتماد على الذاكرة المحلية المخزنة.");
        return null;
    }
}

function initQuranAndJuz() {
    const sSelect = document.getElementById('surahSelect');
    const jSelect = document.getElementById('juzSelect'); // قائمة الأجزاء
    const display = document.getElementById('quranContent');
    if (!sSelect || !display) return;

    // أسماء الـ 114 سورة كاملة للقائمة
    const allSurahs = ["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"];

    // 1. ملء قائمة الـ 114 سورة فوراً
    sSelect.innerHTML = '<option value="">اختر السورة...</option>';
    allSurahs.forEach((name, index) => {
        sSelect.add(new Option(`سورة ${name}`, index + 1));
    });

    // 2. ملء قائمة الأجزاء الـ 30 لو الـ ID موجود في الـ HTML
    if (jSelect) {
        jSelect.innerHTML = '<option value="">اختر الجزء...</option>';
        for (let i = 1; i <= 30; i++) {
            jSelect.add(new Option(`الجزء ${i}`, i));
        }

        // عند اختيار جزء، يحول قائمة السور على أول سورة في هذا الجزء تلقائياً
        jSelect.onchange = () => {
            const juzId = jSelect.value;
            if (juzId && juzToSurahMap[juzId]) {
                sSelect.value = juzToSurahMap[juzId];
                sSelect.dispatchEvent(new Event('change')); // تفعيل عرض السورة فوراً
            }
        };
    }

    // 3. جلب وتخزين المصحف كاملًا في الخلفية أول ما يفتح بالنت
    let cachedQuran = null;
    getFullOfflineQuran().then(data => {
        if (data) {
            cachedQuran = data;
            localStorage.setItem('local_quran_backup', JSON.stringify(data));
        }
    });

    // 4. دالة عرض الآيات عند تغيير السورة (أونلاين أو أوفلاين)
    sSelect.onchange = () => {
        const surahId = sSelect.value;
        if (!surahId) {
            display.innerText = "اختر لبدء القراءة";
            return;
        }

        const localBackup = localStorage.getItem('local_quran_backup');
        const activeData = cachedQuran || (localBackup ? JSON.parse(localBackup) : null);

        if (activeData && activeData[surahId]) {
            const surah = activeData[surahId];
            display.innerHTML = surah.verses.map((text, index) => {
                return `${text} <span class="verse-num" style="color: #2ecc71; font-weight: bold;">(${index + 1})</span>`;
            }).join(' ');
        } else {
            display.innerHTML = '<p style="text-align:center; color:#ff7675;">برجاء فتح الإنترنت لمرة واحدة فقط لتفعيل الـ 114 سورة أوفلاين بالكامل.</p>';
        }
    };
}

// تشغيل السكريبت مع تحميل الصفحة
window.addEventListener('load', initQuranAndJuz);