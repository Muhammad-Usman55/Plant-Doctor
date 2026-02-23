import { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import PredictionResult from './components/PredictionResult';
import About from './components/About';

// Translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    history: 'History',
    about: 'About',
    // Hero
    badge: 'AI-Powered Plant Care',
    heroTitle: 'Detect Plant Diseases',
    heroHighlight: 'Instantly',
    heroSubtitle: "Upload a photo of your plant's leaf and our AI will identify diseases with 97% accuracy. Get instant diagnosis and care recommendations for healthier plants.",
    startAnalysis: 'Start Analysis',
    learnMore: 'Learn More',
    // Features
    features: 'Features',
    featuresDesc: 'Powerful tools for plant health management',
    easyUpload: 'Easy Upload',
    easyUploadDesc: 'Simply drag & drop or click to upload your plant image. Supports JPG, PNG formats.',
    aiAnalysis: 'AI Analysis',
    aiAnalysisDesc: 'Advanced CNN model trained on 70,000+ plant images for accurate detection.',
    diseases: '38 Diseases',
    diseasesDesc: 'Comprehensive detection across 14 different plant species and 38 conditions.',
    instantResults: 'Instant Results',
    instantResultsDesc: 'Get accurate diagnosis in seconds with confidence scores and recommendations.',
    // Upload
    analyzeLeaf: 'Analyze Leaf',
    testAnother: 'Test Another Plant',
    processingTitle: 'Processing Your Request',
    // Stats
    accuracy: 'Accuracy',
    diseaseClasses: 'Disease Classes',
    plantSpecies: 'Plant Species',
    trainingImages: 'Training Images',
    // History
    predictionHistory: 'Prediction History',
    recentAnalyses: 'Your recent plant analyses',
    clearAll: 'Clear All',
    noHistory: 'No History Yet',
    noHistoryDesc: 'Your prediction history will appear here',
    startFirst: 'Start First Analysis',
    confidence: 'Confidence',
    // Footer
    quickLinks: 'Quick Links',
    connect: 'Connect',
    builtWith: 'Built with ❤️ by',
    poweredBy: 'Powered by TensorFlow & FastAPI',
    // Processing steps
    step1: 'Sending image to server...',
    step2: 'Preprocessing image (150×150, RGB)...',
    step3: 'CNN analyzing leaf patterns...',
    step4: 'Generating prediction results...',
    step5: 'Sending results back to you...',
  },
  ur: {
    // Navigation
    home: 'ہوم',
    history: 'تاریخ',
    about: 'تعارف',
    // Hero
    badge: 'AI سے چلنے والی پودوں کی دیکھ بھال',
    heroTitle: 'پودوں کی بیماریوں کا پتہ لگائیں',
    heroHighlight: 'فوری طور پر',
    heroSubtitle: 'اپنے پودے کے پتے کی تصویر اپ لوڈ کریں اور ہماری AI 97% درستگی کے ساتھ بیماریوں کی شناخت کرے گی۔ صحت مند پودوں کے لیے فوری تشخیص اور دیکھ بھال کی سفارشات حاصل کریں۔',
    startAnalysis: 'تجزیہ شروع کریں',
    learnMore: 'مزید جانیں',
    // Features
    features: 'خصوصیات',
    featuresDesc: 'پودوں کی صحت کے انتظام کے لیے طاقتور ٹولز',
    easyUpload: 'آسان اپ لوڈ',
    easyUploadDesc: 'اپنے پودے کی تصویر اپ لوڈ کرنے کے لیے بس ڈریگ اور ڈراپ کریں یا کلک کریں۔ JPG، PNG فارمیٹس سپورٹ کرتا ہے۔',
    aiAnalysis: 'AI تجزیہ',
    aiAnalysisDesc: 'درست پتہ لگانے کے لیے 70,000+ پودوں کی تصاویر پر تربیت یافتہ جدید CNN ماڈل۔',
    diseases: '38 بیماریاں',
    diseasesDesc: '14 مختلف پودوں کی اقسام اور 38 حالات میں جامع پتہ لگانا۔',
    instantResults: 'فوری نتائج',
    instantResultsDesc: 'سیکنڈوں میں اعتماد کے اسکورز اور سفارشات کے ساتھ درست تشخیص حاصل کریں۔',
    // Upload
    analyzeLeaf: 'پتے کا تجزیہ کریں',
    testAnother: 'دوسرا پودا ٹیسٹ کریں',
    processingTitle: 'آپ کی درخواست پر کارروائی ہو رہی ہے',
    // Stats
    accuracy: 'درستگی',
    diseaseClasses: 'بیماری کی کلاسیں',
    plantSpecies: 'پودوں کی اقسام',
    trainingImages: 'تربیتی تصاویر',
    // History
    predictionHistory: 'پیشن گوئی کی تاریخ',
    recentAnalyses: 'آپ کے حالیہ پودوں کے تجزیے',
    clearAll: 'سب صاف کریں',
    noHistory: 'ابھی کوئی تاریخ نہیں',
    noHistoryDesc: 'آپ کی پیشن گوئی کی تاریخ یہاں ظاہر ہوگی',
    startFirst: 'پہلا تجزیہ شروع کریں',
    confidence: 'اعتماد',
    // Footer
    quickLinks: 'فوری لنکس',
    connect: 'رابطہ',
    builtWith: '❤️ کے ساتھ بنایا گیا',
    poweredBy: 'TensorFlow اور FastAPI کے ذریعے تقویت یافتہ',
    // Processing steps
    step1: 'سرور کو تصویر بھیجی جا رہی ہے...',
    step2: 'تصویر کی پری پروسیسنگ (150×150, RGB)...',
    step3: 'CNN پتے کے پیٹرن کا تجزیہ کر رہا ہے...',
    step4: 'پیشن گوئی کے نتائج پیدا ہو رہے ہیں...',
    step5: 'نتائج آپ کو واپس بھیجے جا رہے ہیں...',
  }
};

// Social Links
const SOCIAL_LINKS = {
  github: 'https://github.com/Muhammad-Usman55',
  linkedin: 'https://www.linkedin.com/in/muhammadusman55/'
};

// GitHub Icon Component
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// LinkedIn Icon Component
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flowStep, setFlowStep] = useState(0);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('predictionHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const t = translations[language];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ur' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('predictionHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Auto-hide header logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide header
        setIsHeaderHidden(true);
      } else {
        // Scrolling up - show header
        setIsHeaderHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  };

  const addToHistory = (predictionData, imageFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        prediction: predictionData,
        imagePreview: reader.result,
        fileName: imageFile.name
      };
      setHistory(prev => [newEntry, ...prev].slice(0, 20)); // Keep last 20
    };
    reader.readAsDataURL(imageFile);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('predictionHistory');
  };

  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleImageSelect = (file) => {
    setSelectedFile(file);
    setPrediction(null);
    setError(null);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPrediction(null);
    setError(null);
    setFlowStep(0);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handlePredict = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const apiUrl = window.location.hostname === 'localhost' && window.location.port !== '8000'
        ? 'http://localhost:8000/predict'
        : '/predict';

      // Step 1: Frontend sending to Backend
      setFlowStep(1);
      await delay(1000);

      // Step 2: Backend processing
      setFlowStep(2);
      await delay(1000);

      // Step 3: Model analyzing
      setFlowStep(3);
      
      // Make actual API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Step 4: Model returning to Backend
      setFlowStep(4);
      await delay(800);

      // Step 5: Backend returning to Frontend
      setFlowStep(5);
      await delay(800);

      setPrediction(data);
      addToHistory(data, selectedFile);
    } catch (err) {
      console.error("Prediction Error:", err);
      setError("Failed to get prediction. Ensure backend is running.");
    } finally {
      setLoading(false);
      setFlowStep(0);
    }
  };

  return (
    <div className="app-container">
      <header className={`app-header ${isScrolled ? 'scrolled' : ''} ${isHeaderHidden ? 'header-hidden' : ''}`}>
        <div className="header-bg">
          <div className="leaf-pattern"></div>
          <div className="organic-wave"></div>
        </div>
        <div className="header-content">
          <div className="logo" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
            <div className="logo-leaf">
              <svg viewBox="0 0 32 32" width="32" height="32">
                <defs>
                  <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#81C784" />
                    <stop offset="100%" stopColor="#2E7D32" />
                  </linearGradient>
                </defs>
                <path fill="url(#leafGrad)" d="M16 2C16 2 8 8 8 16c0 8 8 14 8 14s8-6 8-14c0-8-8-14-8-14z"/>
                <path fill="none" stroke="#1B5E20" strokeWidth="0.8" opacity="0.4" d="M16 4v24M12 10q4 4 4 12M20 10q-4 4-4 12"/>
              </svg>
            </div>
            <span className="logo-text">Plant Doctor</span>
          </div>
          <nav className="main-nav">
            <span 
              className={activeTab === 'home' ? 'active' : ''} 
              onClick={() => setActiveTab('home')}
            >
              🏠 {t.home}
            </span>
            <span 
              className={activeTab === 'history' ? 'active' : ''} 
              onClick={() => setActiveTab('history')}
            >
              🍃 {t.history} {history.length > 0 && <span className="history-badge">{history.length}</span>}
            </span>
            <span 
              className={activeTab === 'about' ? 'active' : ''} 
              onClick={() => setActiveTab('about')}
            >
              🌻 {t.about}
            </span>
          </nav>
          <div className="header-actions">
            <div className="social-links">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="social-link github" title="GitHub">
                <GitHubIcon />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin" title="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
            <button className="lang-toggle" onClick={toggleLanguage} title={language === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}>
              {language === 'en' ? 'اردو' : 'EN'}
            </button>
            <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? '🌙' : '🌤️'}
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">

        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="hero-section fade-in">
              <div className="hero-background">
                <div className="hero-particles">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div className="hero-content">
                <span className="hero-badge">
                  <span className="badge-icon">🌱</span>
                  {t.badge}
                </span>
                <h1 className="hero-title">
                  {t.heroTitle} <span className="highlight">{t.heroHighlight}</span>
                </h1>
                <p className="hero-subtitle">
                  {t.heroSubtitle}
                </p>
                <div className="hero-cta">
                  <button className="btn btn-primary btn-large" onClick={() => document.querySelector('.upload-section').scrollIntoView({ behavior: 'smooth' })}>
                    {t.startAnalysis} 🔬
                  </button>
                  <button className="btn btn-outline" onClick={() => setActiveTab('about')}>
                    {t.learnMore}
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
              <div className="section-header">
                <h2 className="section-label">{t.features}</h2>
                <p className="section-description">{t.featuresDesc}</p>
              </div>
              <div className="features-grid">
                <div className="feature-card fade-in">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">📸</div>
                  </div>
                  <h3>{t.easyUpload}</h3>
                  <p>{t.easyUploadDesc}</p>
                </div>
                <div className="feature-card fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">🧠</div>
                  </div>
                  <h3>{t.aiAnalysis}</h3>
                  <p>{t.aiAnalysisDesc}</p>
                </div>
                <div className="feature-card fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">🌿</div>
                  </div>
                  <h3>{t.diseases}</h3>
                  <p>{t.diseasesDesc}</p>
                </div>
                <div className="feature-card fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">⚡</div>
                  </div>
                  <h3>{t.instantResults}</h3>
                  <p>{t.instantResultsDesc}</p>
                </div>
              </div>
            </section>

            {/* Upload Card */}
            <section className="upload-section">
              <div className={`glass-card upload-card ${loading ? 'scanning' : ''}`}>
                <h2 className="section-title">🔬 {t.startAnalysis}</h2>

                {loading ? (
                  <div className="flow-animation-container">
                    <h2 className="flow-title">{t.processingTitle}</h2>
                    
                    {/* Flow Diagram - Forward */}
                    <div className="flow-diagram">
                      <div className={`flow-node ${flowStep >= 1 ? 'active' : ''} ${flowStep === 1 ? 'current' : ''}`}>
                        <div className="flow-icon">💻</div>
                        <div className="flow-label">Frontend</div>
                        <div className="flow-sublabel">React App</div>
                      </div>

                      <div className={`flow-arrow ${flowStep >= 1 ? 'active' : ''} ${flowStep === 1 ? 'animating' : ''}`}>
                        <div className="arrow-line">
                          <div className="arrow-particle"></div>
                        </div>
                        <div className="arrow-head">→</div>
                      </div>

                      <div className={`flow-node ${flowStep >= 2 ? 'active' : ''} ${flowStep === 2 || flowStep === 4 ? 'current' : ''}`}>
                        <div className="flow-icon">⚙️</div>
                        <div className="flow-label">Backend</div>
                        <div className="flow-sublabel">FastAPI</div>
                      </div>

                      <div className={`flow-arrow ${flowStep >= 2 ? 'active' : ''} ${flowStep === 2 ? 'animating' : ''}`}>
                        <div className="arrow-line">
                          <div className="arrow-particle"></div>
                        </div>
                        <div className="arrow-head">→</div>
                      </div>

                      <div className={`flow-node ${flowStep >= 3 ? 'active' : ''} ${flowStep === 3 ? 'current processing' : ''}`}>
                        <div className="flow-icon">🧠</div>
                        <div className="flow-label">CNN Model</div>
                        <div className="flow-sublabel">TensorFlow</div>
                      </div>
                    </div>

                    {/* Return Flow */}
                    {flowStep >= 4 && (
                      <div className="flow-diagram return-flow">
                        <div className={`flow-node small ${flowStep === 5 ? 'active current' : ''}`}>
                          <div className="flow-icon">💻</div>
                        </div>

                        <div className={`flow-arrow reverse ${flowStep === 5 ? 'active animating' : ''}`}>
                          <div className="arrow-line">
                            <div className="arrow-particle"></div>
                          </div>
                          <div className="arrow-head">←</div>
                        </div>

                        <div className={`flow-node small ${flowStep >= 4 ? 'active' : ''} ${flowStep === 4 ? 'current' : ''}`}>
                          <div className="flow-icon">⚙️</div>
                        </div>

                        <div className={`flow-arrow reverse ${flowStep >= 4 ? 'active' : ''} ${flowStep === 4 ? 'animating' : ''}`}>
                          <div className="arrow-line">
                            <div className="arrow-particle"></div>
                          </div>
                          <div className="arrow-head">←</div>
                        </div>

                        <div className={`flow-node small active`}>
                          <div className="flow-icon">🧠</div>
                        </div>
                      </div>
                    )}

                    {/* Status Text */}
                    <div className="flow-status">
                      {flowStep === 1 && <p className="status-text">📤 {t.step1}</p>}
                      {flowStep === 2 && <p className="status-text">🔄 {t.step2}</p>}
                      {flowStep === 3 && <p className="status-text">🧠 {t.step3}</p>}
                      {flowStep === 4 && <p className="status-text">📊 {t.step4}</p>}
                      {flowStep === 5 && <p className="status-text">✅ {t.step5}</p>}
                    </div>

                    <div className="spinner"></div>
                  </div>
                ) : !prediction ? (
                  <>
                    <ImageUpload onImageSelected={handleImageSelect} />

                    {selectedFile && (
                      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <button className="btn btn-large" onClick={handlePredict}>
                          {t.analyzeLeaf} 🔍
                        </button>
                      </div>
                    )}
                    
                    {error && (
                      <div className="error-message fade-in" style={{ marginTop: '1rem', color: '#E57373' }}>
                        <p>⚠️ {error}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }} className="fade-in">
                    <PredictionResult result={prediction} />
                    <button className="btn btn-secondary" onClick={handleReset} style={{ marginTop: '2rem' }}>
                      {t.testAnother} 🔄
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section fade-in">
              <div className="stat-item">
                <span className="stat-number">97%</span>
                <span className="stat-label">{t.accuracy}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">38</span>
                <span className="stat-label">{t.diseaseClasses}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">14</span>
                <span className="stat-label">{t.plantSpecies}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">70K+</span>
                <span className="stat-label">{t.trainingImages}</span>
              </div>
            </section>
          </>
        )}

        {activeTab === 'history' && (
          <section className="history-section fade-in">
            <div className="history-header">
              <h1>📋 {t.predictionHistory}</h1>
              <p className="history-subtitle">{t.recentAnalyses}</p>
              {history.length > 0 && (
                <button className="btn btn-secondary clear-history-btn" onClick={clearHistory}>
                  {t.clearAll} 🗑️
                </button>
              )}
            </div>
            
            {history.length === 0 ? (
              <div className="empty-history glass-card">
                <div className="empty-icon">📭</div>
                <h3>{t.noHistory}</h3>
                <p>{t.noHistoryDesc}</p>
                <button className="btn" onClick={() => setActiveTab('home')}>
                  {t.startFirst} 🔬
                </button>
              </div>
            ) : (
              <div className="history-grid">
                {history.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="history-card glass-card fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <button 
                      className="delete-history-btn" 
                      onClick={() => deleteHistoryItem(item.id)}
                      title="Delete"
                    >
                      ✕
                    </button>
                    <div className="history-image-container">
                      <img src={item.imagePreview} alt={item.fileName} className="history-image" />
                    </div>
                    <div className="history-details">
                      <span className={`history-status ${item.prediction.class.toLowerCase().includes('healthy') ? 'healthy' : 'disease'}`}>
                        {item.prediction.class.toLowerCase().includes('healthy') ? '✅ Healthy' : '⚠️ Disease'}
                      </span>
                      <h4 className="history-class">{item.prediction.class.replace(/_/g, ' ')}</h4>
                      <div className="history-confidence">
                        <span>{t.confidence}:</span>
                        <div className="confidence-bar">
                          <div 
                            className="confidence-fill" 
                            style={{ width: `${item.prediction.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="confidence-value">{(item.prediction.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <p className="history-timestamp">🕐 {item.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'about' && <About language={language} />}

      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">🌿 Plant Doctor</div>
            <p className="footer-tagline">{t.badge}</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>{t.quickLinks}</h4>
              <ul>
                <li><span onClick={() => setActiveTab('home')}>{t.home}</span></li>
                <li><span onClick={() => setActiveTab('history')}>{t.history}</span></li>
                <li><span onClick={() => setActiveTab('about')}>{t.about}</span></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Technology</h4>
              <ul>
                <li>React + Vite</li>
                <li>FastAPI</li>
                <li>TensorFlow</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>{t.connect}</h4>
              <div className="footer-social">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <GitHubIcon /> GitHub
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <LinkedInIcon /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Plant Doctor AI. {t.builtWith} <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">Muhammad Usman Shahid</a></p>
          <p className="footer-tech">{t.poweredBy}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

