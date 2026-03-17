// Translation data
const translations = {
  en: {
    welcome: "🌟 Your Wellness Journey",
    description: "Welcome to TechHealth, your vibrant digital wellness companion. Experience personalized mental health support, connect with caring professionals, and discover tools for a brighter, more balanced life.",
    login: "Welcome Back",
    username: "Username",
    password: "Password",
    loginBtn: "Sign In",
    forgot: "Forgot password?",
    signup: "New to TechHealth?"
  },
  hi: {
    welcome: "🌟 आपकी कल्याण यात्रा",
    description: "टेकहेल्थ में आपका स्वागत है, आपका जीवंत डिजिटल कल्याण साथी। व्यक्तिगत मानसिक स्वास्थ्य सहायता का अनुभव करें, देखभाल करने वाले पेशेवरों से जुड़ें, और एक उज्जवल, अधिक संतुलित जीवन के लिए उपकरण खोजें।",
    login: "वापसी पर स्वागत है",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    loginBtn: "साइन इन",
    forgot: "पासवर्ड भूल गए?",
    signup: "टेकहेल्थ में नए हैं?"
  },
  ur: {
    welcome: "🌟 آپ کا فلاحی سفر",
    description: "ٹیک ہیلتھ میں خوش آمدید، آپ کا متحرک ڈیجیٹل فلاحی ساتھی۔ ذاتی ذہنی صحت کی مدد کا تجربہ کریں، دیکھ بھال کرنے والے پیشہ ور افراد سے جڑیں، اور ایک روشن، زیادہ متوازن زندگی کے لیے آلات دریافت کریں۔",
    login: "واپسی پر خوش آمدید",
    username: "صارف کا نام",
    password: "پاس ورڈ",
    loginBtn: "سائن ان",
    forgot: "پاس ورڈ بھول گئے؟",
    signup: "ٹیک ہیلتھ میں نئے ہیں؟"
  },
  ks: {
    welcome: "🌟 توہندُ بہبودی سفر",
    description: "ٹیک ہیلتھ منز خوش آمدید، توہندُ متحرک ڈیجیٹل بہبودی ساتھی۔ ذاتی ذہنی صحت کی مدد کا تجربہ کریو، دیکھ بھال کرنے والے پیشہ ور افراد سے جڑیو، اور اکھ روشن، زیادہ متوازن زندگی کے لیے آلات دریافت کریو۔",
    login: "واپسی پر خوش آمدید",
    username: "ناو",
    password: "پاسورڈ",
    loginBtn: "سائن ان",
    forgot: "پاسورڈ بھولِ گۄے؟",
    signup: "ٹیک ہیلتھ منز نۄے چھیو؟"
  }
};

// Language switching functionality
const langSelect = document.getElementById("language-select");

// Language switching event listener
langSelect.addEventListener("change", (e) => {
  const lang = e.target.value;
  localStorage.setItem("selectedLanguage", lang);
  updateLanguage(lang);
});

// Update language function
function updateLanguage(lang) {
  const t = translations[lang];
  
  document.getElementById("welcome-text").innerText = t.welcome;
  document.getElementById("description-text").innerText = t.description;
  document.getElementById("login-title").innerText = t.login;
  document.getElementById("username").placeholder = t.username;
  document.getElementById("password").placeholder = t.password;
  document.getElementById("login-btn").innerText = t.loginBtn;
  document.getElementById("forgot-text").innerText = t.forgot;
  document.getElementById("signup-text").innerText = t.signup;
}

// Initialize language on page load
window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  langSelect.value = savedLang;
  updateLanguage(savedLang);
});
