// Social Icons
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// About page translations
const aboutTranslations = {
  en: {
    developerTitle: 'Full Stack Developer & ML Engineer',
    developerBio: 'Passionate about building intelligent applications that solve real-world problems. Specialized in React, Python, and Machine Learning.',
    aboutTitle: '🌱 About Plant Doctor',
    aboutIntro: 'An intelligent plant disease detection system powered by deep learning. Built to help gardeners and farmers identify plant diseases quickly and accurately.',
    architectureTitle: '🏗️ System Architecture',
    userUpload: 'User Upload',
    selectImage: 'Select image',
    reactFrontend: 'React Frontend',
    uiUx: 'UI & UX',
    fastapiBackend: 'FastAPI Backend',
    apiServer: 'API Server',
    cnnModel: 'CNN Model',
    tensorflow: 'TensorFlow',
    howItWorksTitle: '🚀 How It Works',
    step1Title: 'Upload Image',
    step1Desc: "Upload a photo of your plant's leaf through our intuitive drag & drop interface.",
    step2Title: 'Image Processing',
    step2Desc: 'The backend preprocesses your image (150x150 resize, RGB normalization).',
    step3Title: 'AI Analysis',
    step3Desc: 'Our CNN model analyzes the leaf patterns and identifies potential diseases.',
    step4Title: 'Get Results',
    step4Desc: 'Receive instant diagnosis with confidence scores and plant information.',
    techStackTitle: '🛠️ Tech Stack',
    frontend: 'Frontend',
    buildTool: 'Build Tool',
    backend: 'Backend',
    mlFramework: 'ML Framework',
    styling: 'Styling',
    neuralNetworks: 'Neural Networks',
    modelPerfTitle: '📊 Model Performance',
    accuracy: 'Accuracy',
    classes: 'Classes',
    plantSpecies: 'Plant Species',
    trainingImages: 'Training Images',
  },
  ur: {
    developerTitle: 'فل اسٹیک ڈویلپر اور ML انجینئر',
    developerBio: 'حقیقی دنیا کے مسائل حل کرنے والی ذہین ایپلیکیشنز بنانے کا شوقین۔ React، Python اور Machine Learning میں مہارت۔',
    aboutTitle: '🌱 پلانٹ ڈاکٹر کے بارے میں',
    aboutIntro: 'گہری سیکھائی سے چلنے والا ایک ذہین پودوں کی بیماری کا پتہ لگانے کا نظام۔ باغبانوں اور کسانوں کی مدد کے لیے بنایا گیا تاکہ پودوں کی بیماریوں کی جلد اور درست شناخت ہو سکے۔',
    architectureTitle: '🏗️ سسٹم آرکیٹیکچر',
    userUpload: 'صارف کا اپ لوڈ',
    selectImage: 'تصویر منتخب کریں',
    reactFrontend: 'React فرنٹ اینڈ',
    uiUx: 'UI اور UX',
    fastapiBackend: 'FastAPI بیک اینڈ',
    apiServer: 'API سرور',
    cnnModel: 'CNN ماڈل',
    tensorflow: 'TensorFlow',
    howItWorksTitle: '🚀 یہ کیسے کام کرتا ہے',
    step1Title: 'تصویر اپ لوڈ کریں',
    step1Desc: 'ہمارے آسان ڈریگ اینڈ ڈراپ انٹرفیس کے ذریعے اپنے پودے کے پتے کی تصویر اپ لوڈ کریں۔',
    step2Title: 'تصویر کی پروسیسنگ',
    step2Desc: 'بیک اینڈ آپ کی تصویر کو پری پروسیس کرتا ہے (150x150 ری سائز، RGB نارملائزیشن)۔',
    step3Title: 'AI تجزیہ',
    step3Desc: 'ہمارا CNN ماڈل پتے کے پیٹرن کا تجزیہ کرتا ہے اور ممکنہ بیماریوں کی شناخت کرتا ہے۔',
    step4Title: 'نتائج حاصل کریں',
    step4Desc: 'اعتماد کے اسکورز اور پودے کی معلومات کے ساتھ فوری تشخیص حاصل کریں۔',
    techStackTitle: '🛠️ ٹیک اسٹیک',
    frontend: 'فرنٹ اینڈ',
    buildTool: 'بلڈ ٹول',
    backend: 'بیک اینڈ',
    mlFramework: 'ML فریم ورک',
    styling: 'اسٹائلنگ',
    neuralNetworks: 'نیورل نیٹ ورکس',
    modelPerfTitle: '📊 ماڈل کی کارکردگی',
    accuracy: 'درستگی',
    classes: 'کلاسیں',
    plantSpecies: 'پودوں کی اقسام',
    trainingImages: 'تربیتی تصاویر',
  }
};

const About = ({ language = 'en' }) => {
  const t = aboutTranslations[language] || aboutTranslations.en;
  return (
    <div className="about-container fade-in">
      {/* Developer Card */}
      <div className="developer-card glass-card">
        <div className="developer-avatar">
          <span className="avatar-emoji">👨‍💻</span>
        </div>
        <div className="developer-info">
          <h2>Muhammad Usman Shahid</h2>
          <p className="developer-title">{t.developerTitle}</p>
          <p className="developer-bio">
            {t.developerBio}
          </p>
          <div className="developer-social">
            <a href="https://github.com/Muhammad-Usman55" target="_blank" rel="noopener noreferrer" className="dev-social-btn github">
              <GitHubIcon /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/muhammadusman55/" target="_blank" rel="noopener noreferrer" className="dev-social-btn linkedin">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Project Info Card */}
      <div className="glass-card about-card" style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
        <h2 className="about-title">{t.aboutTitle}</h2>
        <p className="about-intro">
          {t.aboutIntro}
        </p>

        <div className="architecture-section">
          <h3>{t.architectureTitle}</h3>
          <div className="architecture-diagram">
            <div className="arch-step">
              <div className="arch-icon">👤</div>
              <div className="arch-label">{t.userUpload}</div>
              <div className="arch-desc">{t.selectImage}</div>
            </div>
            <div className="arrow">→</div>
            <div className="arch-step">
              <div className="arch-icon">💻</div>
              <div className="arch-label">{t.reactFrontend}</div>
              <div className="arch-desc">{t.uiUx}</div>
            </div>
            <div className="arrow">→</div>
            <div className="arch-step">
              <div className="arch-icon">⚙️</div>
              <div className="arch-label">{t.fastapiBackend}</div>
              <div className="arch-desc">{t.apiServer}</div>
            </div>
            <div className="arrow">→</div>
            <div className="arch-step">
              <div className="arch-icon">🧠</div>
              <div className="arch-label">{t.cnnModel}</div>
              <div className="arch-desc">{t.tensorflow}</div>
            </div>
          </div>
        </div>

        <div className="workflow-section">
          <h3>{t.howItWorksTitle}</h3>
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>{t.step1Title}</h4>
                <p>{t.step1Desc}</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>{t.step2Title}</h4>
                <p>{t.step2Desc}</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>{t.step3Title}</h4>
                <p>{t.step3Desc}</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>{t.step4Title}</h4>
                <p>{t.step4Desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tech-section">
          <h3>{t.techStackTitle}</h3>
          <div className="tech-grid">
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <span className="tech-name">React 19</span>
              <span className="tech-desc">{t.frontend}</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">⚡</span>
              <span className="tech-name">Vite</span>
              <span className="tech-desc">{t.buildTool}</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🐍</span>
              <span className="tech-name">FastAPI</span>
              <span className="tech-desc">{t.backend}</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🧠</span>
              <span className="tech-name">TensorFlow</span>
              <span className="tech-desc">{t.mlFramework}</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🎨</span>
              <span className="tech-name">CSS3</span>
              <span className="tech-desc">{t.styling}</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">📊</span>
              <span className="tech-name">Keras</span>
              <span className="tech-desc">{t.neuralNetworks}</span>
            </div>
          </div>
        </div>

        <div className="model-section">
          <h3>{t.modelPerfTitle}</h3>
          <div className="model-stats">
            <div className="model-stat">
              <span className="stat-value">97%</span>
              <span className="stat-label">{t.accuracy}</span>
            </div>
            <div className="model-stat">
              <span className="stat-value">38</span>
              <span className="stat-label">{t.classes}</span>
            </div>
            <div className="model-stat">
              <span className="stat-value">14</span>
              <span className="stat-label">{t.plantSpecies}</span>
            </div>
            <div className="model-stat">
              <span className="stat-value">70K+</span>
              <span className="stat-label">{t.trainingImages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
