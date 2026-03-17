// Translation data
const translations = {
  en: {
    pageTitle: "Student Wellness Dashboard",
    logo: "TechHealth",
    dashboardLabel: "Student Dashboard",
    welcome: "Welcome to Your Wellness Space! 🌟",
    description: "Take a moment to check in with yourself and explore activities designed to support your mental wellbeing.",
    activities: "Exercises & Meditation",
    progress: "Progress & Insights",
    sidebar: ["Dashboard","Mindfulness","Resources","Support Chat","Appointments","Progress","Settings","Logout"],
    breathing: "Breathing Exercises",
    journaling: "Journaling Prompts",
    mindfulness: "Mindfulness Activities",
    coping: "Coping Skills",
    meditation: "Meditation Classes",
    panic: "Panic",
    streakLabel: "Day Streak 🔥",
    stressLabel: "Stress Level /10",
    achievement: "Getting Started!",
    moodLabel: "Mood Tracker",
    goalsLabel: "Weekly Goals"
  },
  hi: {
    pageTitle: "छात्र वेलनेस डैशबोर्ड",
    logo: "टेकहेल्थ",
    dashboardLabel: "छात्र डैशबोर्ड",
    welcome: "आपके वेलनेस स्पेस में स्वागत है! 🌟",
    description: "अपने आप के साथ चेक इन करने और मानसिक कल्याण का समर्थन करने वाली गतिविधियों का अन्वेषण करने के लिए एक पल लें।",
    activities: "व्यायाम और ध्यान",
    progress: "प्रगति और अंतर्दृष्टि",
    sidebar: ["डैशबोर्ड","सजगता","संसाधन","सहायता चैट","नियुक्तियां","प्रगति","सेटिंग्स","लॉगआउट"],
    breathing: "सांस लेने के अभ्यास",
    journaling: "जर्नलिंग सुझाव",
    mindfulness: "सजगता गतिविधियाँ",
    coping: "सहायता कौशल",
    meditation: "ध्यान कक्षाएँ",
    panic: "पैनिक",
    streakLabel: "दिन का स्ट्रीक 🔥",
    stressLabel: "तनाव स्तर /10",
    achievement: "शुरुआत हो गई!",
    moodLabel: "मूड ट्रैकर",
    goalsLabel: "साप्ताहिक लक्ष्य"
  },
  ur: {
    pageTitle: "اسٹوڈنٹ ویلنز ڈیش بورڈ",
    logo: "ٹیک ہیلتھ",
    dashboardLabel: "طالب علم ڈیش بورڈ",
    welcome: "آپ کی ویلنز اسپیس میں خوش آمدید! 🌟",
    description: "اپنے آپ کو چیک کرنے اور ذہنی بہبود کی حمایت کرنے والی سرگرمیوں کو دریافت کرنے کے لیے ایک لمحہ نکالیں۔",
    activities: "ورزش اور مراقبہ",
    progress: "ترقی اور بصیرت",
    sidebar: ["ڈیش بورڈ","ذہن سازی","وسائل","سپورٹ چیٹ","ملاقاتیں","ترقی","سیٹنگز","لاگ آؤٹ"],
    breathing: "سانس کی مشقیں",
    journaling: "جرنلنگ پرامپٹس",
    mindfulness: "ذہن سازی کی سرگرمیاں",
    coping: "مدد کی مہارتیں",
    meditation: "مراقبہ کلاسز",
    panic: "پینک",
    streakLabel: "دن کا سلسلہ 🔥",
    stressLabel: "تناؤ کی سطح /10",
    achievement: "شروع کر دیا!",
    moodLabel: "مزاج ٹریکر",
    goalsLabel: "ہفتہ وار اہداف"
  },
  ks: {
    pageTitle: "سٹودنٹ وئلنس ڈیش بورڈ",
    logo: "ٹیک ہیلتھ",
    dashboardLabel: "سٹودنٹ ڈیش بورڈ",
    welcome: "تُهند وێلنز اسپیس مٲن خوش آمدید! 🌟",
    description: "اپنٛ آپس منز چیک ان کرن تہ ذہنی فلاح حمایت سرگرمیاں تلاش کرنٛس ہک لمحہ نکالو۔",
    activities: "ورزش تہ دھیان",
    progress: "ترقی تہ بصیرت",
    sidebar: ["ڈیش بورڈ","ذہن سازی","وسائل","سپورٹ چیٹ","ملاقات","ترقی","سیٹنگز","لاگ آؤٹ"],
    breathing: "سانس لینے کی مشقیں",
    journaling: "جرنلنگ پرامپٹس",
    mindfulness: "ذہن سازی کی سرگرمیاں",
    coping: "مدد کی مہارتیں",
    meditation: "مراقبہ کلاسز",
    panic: "پینک",
    streakLabel: "دن کا سلسلہ 🔥",
    stressLabel: "تناؤ کی سطح /10",
    achievement: "شروع کر دیا!",
    moodLabel: "مزاج ٹریکر",
    goalsLabel: "ہفتہ وار اہداف"
  }
};

// Language switching functionality
const langSelect = document.getElementById('languageSelect');

// Language switching event listener
langSelect.addEventListener('change', () => {
  const selected = langSelect.value;
  updateLanguage(selected);
  localStorage.setItem("selectedLanguage", selected);
});

// Update language function
function updateLanguage(lang) {
  const t = translations[lang];

  // Update page elements
  document.getElementById('page-title').textContent = t.pageTitle;
  document.querySelector('.logo').textContent = t.logo;
  document.querySelector('.user-info span').textContent = t.dashboardLabel;
  document.getElementById('welcome-message').textContent = t.welcome;
  document.getElementById('welcome-description').textContent = t.description;
  document.getElementById('activities-title').textContent = t.activities;
  document.getElementById('progress-title').textContent = t.progress;

  // Update activity titles
  ['breathing','journaling','mindfulness','coping','meditation'].forEach(id => {
    document.getElementById(`${id}-title`).textContent = t[id];
  });

  // Update sidebar navigation
  document.querySelectorAll('.sidebar-nav .nav-link span').forEach((el, index) => {
    el.textContent = t.sidebar[index];
  });

  // Update buttons and labels
  document.getElementById('panicButton').innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${t.panic}`;
  document.getElementById('streak-label').textContent = t.streakLabel;
  document.getElementById('stress-label').textContent = t.stressLabel;
  document.getElementById('achievement-text').textContent = t.achievement;
  document.getElementById('mood-label').textContent = t.moodLabel;
  document.getElementById('goals-label').textContent = t.goalsLabel;
}

// Initialize language on page load
window.addEventListener('load', () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  langSelect.value = savedLang;
  updateLanguage(savedLang);
});
