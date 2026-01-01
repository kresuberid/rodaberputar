
import React, { useState, useEffect, useRef } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Wheel, { WheelRef } from './components/Wheel';
import InputPanel from './components/InputPanel';
import WinnerModal from './components/WinnerModal';
import { WheelEntry, AppSettings, WinnerHistory, LanguageCode, ThemeConfig } from './types';
import { TRANSLATIONS, THEMES } from './constants';
import { audioService } from './services/audioService';

type Tab = 'entries' | 'settings' | 'history' | 'info';

const getDirection = (lang: LanguageCode): 'rtl' | 'ltr' => {
  return lang === 'ar' ? 'rtl' : 'ltr';
};

// --- COLOR UTILS ---
// Helper to darken/lighten hex color for dynamic theming
function adjustColorBrightness(hex: string, percent: number) {
    if(!hex) return '#000000';
    hex = hex.replace(/^\s*#|\s*$/g, '');
    if(hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
    const num = parseInt(hex, 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

const App = () => {
  // --- Core State ---
  const [items, setItems] = useState<WheelEntry[]>(() => {
    const initial = [];
    // UPDATED: Changed from 21 to 20 participants
    for (let i = 1; i <= 20; i++) {
        initial.push({ id: `${i}`, text: `Peserta ${i}`, visible: true });
    }
    return initial;
  });
  
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'red', 
    language: 'id',
    spinDuration: 8,
    enableSound: true,
    removeWinner: false,
  });

  const [history, setHistory] = useState<WinnerHistory[]>([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState<Tab>('entries');
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentWinner, setCurrentWinner] = useState<WheelEntry | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Track user gesture
  
  const langMenuRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<WheelRef>(null);

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS['en'];
  const direction = getDirection(settings.language);
  const currentTheme = THEMES[settings.theme];
  const [modalTheme, setModalTheme] = useState<ThemeConfig>(currentTheme);

  // Global interaction listener for AudioContext autoplay policy
  useEffect(() => {
      const handleFirstInteraction = () => {
          if (!hasInteracted) {
              setHasInteracted(true);
              audioService.resumeContext();
          }
      };

      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);

      return () => {
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
      }
  }, [hasInteracted]);


  // --- SEO & GEO ---
  useEffect(() => {
    document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t.meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t.meta.description);
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', t.meta.title);
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', t.meta.description);
  }, [settings.language, t.meta]);

  // --- Persistence ---
  useEffect(() => {
    const savedItems = localStorage.getItem('pn_items');
    const savedSettings = localStorage.getItem('pn_settings');
    const savedHistory = localStorage.getItem('pn_history');

    if (savedItems) {
        const parsed = JSON.parse(savedItems);
        if (parsed.length > 0) setItems(parsed);
    }
    if (savedSettings) {
        setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
    } else {
        const browserLangs = navigator.languages || [navigator.language];
        let detectedLang: LanguageCode = 'id';
        for (const lang of browserLangs) {
            const code = lang.split('-')[0] as LanguageCode;
            if (TRANSLATIONS[code]) {
                detectedLang = code;
                break;
            }
        }
        setSettings(prev => ({ ...prev, language: detectedLang }));
    }
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('pn_items', JSON.stringify(items));
    localStorage.setItem('pn_settings', JSON.stringify(settings));
    localStorage.setItem('pn_history', JSON.stringify(history));
  }, [items, settings, history]);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = settings.language;
  }, [direction, settings.language]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      if (document.fullscreenElement) setIsSidebarOpen(false);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  const handleSpin = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isSpinning || items.length === 0) return;
    if (settings.enableSound) audioService.playTick(0.1); 
    if (window.innerWidth < 1024) setIsSidebarOpen(false); 
    wheelRef.current?.spin();
  };

  const onSpinEnd = (winner: WheelEntry) => {
    // Sound is now handled in WinnerModal for better sync
    setCurrentWinner(winner);

    if (settings.theme === 'rainbow') {
        const winnerIndex = items.findIndex(i => i.id === winner.id);
        if (winnerIndex !== -1) {
            const colorIndex = winnerIndex % currentTheme.wheelSegments.length;
            const segmentColor = currentTheme.wheelSegments[colorIndex];
            
            setModalTheme({ 
                ...currentTheme, 
                accent: segmentColor,
                wheelInnerRing: adjustColorBrightness(segmentColor, -50),
                textStroke: segmentColor
            });
        } else {
             setModalTheme(currentTheme);
        }
    } else {
        setModalTheme(currentTheme);
    }
    setTimeout(() => setShowWinnerModal(true), 500);
    setHistory(prev => [{ id: winner.id, text: winner.text, timestamp: Date.now() }, ...prev]);
  };

  const handleRemoveWinner = () => {
    if (currentWinner) setItems(prev => prev.filter(i => i.id !== currentWinner.id));
  };

  // --- Sidebar Content ---
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-transparent text-white pt-24 md:pt-28 relative">
        <div className="px-5 pb-2 flex-none">
            <div className="flex p-1 rounded-xl bg-black/20 border border-white/5">
                {['entries', 'settings', 'history', 'info'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as Tab)}
                        title={t.tabs[tab as Tab]}
                        className={`
                            flex-1 py-4 rounded-lg transition-all duration-300 flex items-center justify-center relative group
                            ${activeTab === tab 
                            ? 'bg-white text-slate-900 shadow-md scale-100' 
                            : 'text-white/50 hover:text-white hover:bg-white/5'}
                        `}
                    >
                        <i className={`fi ${
                            tab === 'entries' ? 'fi-rr-edit' : 
                            tab === 'settings' ? 'fi-rr-settings' : 
                            tab === 'history' ? 'fi-rr-time-past' : 'fi-rr-info'
                        } text-xl transition-transform duration-300 ${activeTab === tab ? 'scale-110' : 'group-hover:scale-110'}`}></i>
                    </button>
                ))}
            </div>
            <div className="text-center mt-4 mb-2 h-4">
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 animate-pulse">
                    {t.tabs[activeTab]}
                 </span>
            </div>
        </div>

        <div className="flex-grow overflow-hidden relative px-5 pb-5 mt-1 mb-0">
            {activeTab === 'entries' && (
                <InputPanel entries={items} onEntriesChange={setItems} t={t} theme={currentTheme} />
            )}
            {activeTab === 'settings' && (
                <div className="space-y-6 p-1 overflow-y-auto h-full custom-scrollbar pr-2 pb-24">
                     
                     {/* RESTORED: Gameplay Settings */}
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-4">
                        <label className="block text-sm font-bold mb-2 flex items-center gap-2" style={{ color: currentTheme.accent }}>
                             <i className="fi fi-rr-play-alt"></i> {t.settings.sections.gameplay}
                        </label>
                        
                        {/* Spin Duration */}
                        <div>
                             <div className="flex justify-between text-xs font-bold text-white/70 mb-2">
                                 <span>{t.settings.duration}</span>
                                 <span className="text-white">{settings.spinDuration}s</span>
                             </div>
                             <input 
                                type="range" 
                                min="1" 
                                max="20" 
                                value={settings.spinDuration} 
                                onChange={(e) => setSettings({...settings, spinDuration: parseInt(e.target.value)})}
                                className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer accent-white"
                             />
                        </div>

                        {/* Sound Toggle */}
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-bold text-white">{t.settings.sound}</div>
                                <div className="text-[10px] text-white/50">{t.settings.soundDesc}</div>
                            </div>
                            <button 
                                onClick={() => setSettings({...settings, enableSound: !settings.enableSound})}
                                className={`w-11 h-6 rounded-full p-1 transition-colors ${settings.enableSound ? 'bg-green-500' : 'bg-white/10 border border-white/20'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.enableSound ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Remove Winner Toggle */}
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-bold text-white">{t.settings.removeWinner}</div>
                                <div className="text-[10px] text-white/50">{t.settings.removeWinnerDesc}</div>
                            </div>
                            <button 
                                onClick={() => setSettings({...settings, removeWinner: !settings.removeWinner})}
                                className={`w-11 h-6 rounded-full p-1 transition-colors ${settings.removeWinner ? 'bg-blue-500' : 'bg-white/10 border border-white/20'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.removeWinner ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>
                     </div>

                     {/* Theme Section */}
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <label className="block text-sm font-bold mb-3 flex items-center gap-2" style={{ color: currentTheme.accent }}>
                                <i className="fi fi-rr-palette"></i> {t.settings.theme}
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                               {Object.values(THEMES).map(th => {
                                   let previewBg;
                                   if (th.id === 'rainbow') {
                                       previewBg = 'conic-gradient(#EF4444, #F97316, #EAB308, #10B981, #3B82F6, #8B5CF6, #EF4444)';
                                   } else {
                                       previewBg = `linear-gradient(135deg, ${th.wheelSegments[1]}, ${th.wheelSegments[0]})`;
                                   }
                                   return (
                                   <button 
                                     key={th.id}
                                     onClick={() => setSettings({...settings, theme: th.id})}
                                     className={`
                                       relative p-2 rounded-xl border flex flex-col items-center gap-2 transition-all
                                       ${settings.theme === th.id 
                                         ? 'bg-white/10 border-white/60 ring-1 ring-white/20 scale-[1.02]' 
                                         : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/20'}
                                     `}
                                   >
                                      <div 
                                        className="w-8 h-8 rounded-full border border-white/10 shadow-sm"
                                        style={{ background: previewBg }}
                                      ></div>
                                      <span 
                                        className="text-[10px] font-bold uppercase tracking-wide"
                                        style={{ color: settings.theme === th.id ? '#fff' : 'rgba(255,255,255,0.5)' }} 
                                      >
                                          {t.themes[th.id]}
                                      </span>
                                   </button>
                               )})}
                            </div>
                    </div>
                     {/* Language */}
                     <div className="relative" ref={langMenuRef}>
                            <button 
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className={`w-full p-4 rounded-xl flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                                        <i className="fi fi-rr-globe text-sm"></i>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-xs text-white/50 font-bold uppercase tracking-wider">{t.settings.language}</span>
                                        <span className="font-bold text-white text-sm">{TRANSLATIONS[settings.language].label}</span>
                                    </div>
                                </div>
                                <i className={`fi fi-rr-angle-small-down text-xl text-white/50 group-hover:text-white transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`}></i>
                            </button>
                            <div className={`absolute top-full left-0 right-0 mt-2 bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] origin-top transition-all duration-200 ${isLangMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                                <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                                    {Object.entries(TRANSLATIONS).map(([code, trans]) => (
                                        <button 
                                            key={code} 
                                            onClick={() => {
                                                setSettings({...settings, language: code as LanguageCode});
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-bold transition-colors ${settings.language === code ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            {trans.label}
                                            {settings.language === code && <i className="fi fi-rr-check text-blue-400"></i>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                </div>
            )}
            
            {activeTab === 'history' && (
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4 px-1">
                         <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: currentTheme.accent }}>{t.history.title}</h3>
                        <button onClick={() => setHistory([])} className="text-[10px] font-bold text-red-300 hover:text-red-100 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded transition-colors border border-red-500/20">
                            {t.history.clear}
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto custom-scrollbar space-y-2 pr-2 pb-24">
                         {history.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-48 text-white/30">
                                <i className="fi fi-rr-time-past text-4xl mb-4 opacity-50"></i>
                                <span className="text-xs font-medium tracking-wide">{t.history.empty}</span>
                             </div>
                         ) : (
                             history.map((h, i) => (
                                 <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                     <div>
                                        <div className="font-bold text-white text-sm">{h.text}</div>
                                        <div className="text-[10px] text-white/50 mt-1 font-medium flex items-center gap-1.5">
                                            <i className="fi fi-rr-clock"></i>
                                            {new Date(h.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                     </div>
                                 </div>
                             ))
                         )}
                    </div>
                </div>
            )}

            {/* RESTORED INFO TAB */}
            {activeTab === 'info' && (
               <div className="space-y-6 p-1 overflow-y-auto h-full custom-scrollbar pr-2 pb-24">
                    
                    {/* About Section */}
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <i className="fi fi-rr-info text-lg" style={{ color: currentTheme.accent }}></i>
                            <h3 className="text-sm font-bold" style={{ color: currentTheme.accent }}>
                                {t.infoContent.aboutTitle}
                            </h3>
                        </div>
                        <p className="text-xs leading-relaxed text-white/80">
                           {t.infoContent.aboutDesc}
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                         <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: currentTheme.accent }}>
                            <i className="fi fi-rr-star"></i> {t.infoContent.featuresTitle}
                         </h3>
                         <ul className="space-y-2">
                             {t.infoContent.featuresList.map((feat, idx) => (
                                 <li key={idx} className="flex items-start gap-2 text-xs text-white/80">
                                     <i className="fi fi-rr-check-circle text-[10px] mt-0.5 text-green-400"></i>
                                     <span>{feat}</span>
                                 </li>
                             ))}
                         </ul>
                    </div>

                    {/* Changelog Section */}
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                         <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: currentTheme.accent }}>
                            <i className="fi fi-rr-refresh"></i> {t.infoContent.changelogTitle}
                         </h3>
                         <ul className="space-y-2">
                             {t.infoContent.changelogList.map((log, idx) => (
                                 <li key={idx} className="flex items-start gap-2 text-xs text-white/80">
                                     <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span>
                                     <span>{log}</span>
                                 </li>
                             ))}
                         </ul>
                    </div>

                    {/* Developer Profile */}
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                            FS
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-bold tracking-wider opacity-50">{t.developer.title}</div>
                            <div className="font-bold text-white text-sm">{t.developer.name}</div>
                            <div className="text-[10px] text-white/70">{t.developer.role}</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-4 pb-8">
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">
                            {t.footer.version}
                        </div>
                        <div className="text-[10px] text-white/20">
                            &copy; {new Date().getFullYear()} {t.footer.copyright}
                        </div>
                    </div>
               </div>
            )}

             <div className="absolute bottom-0 left-0 right-0 p-4 bg-transparent md:hidden z-[90] flex justify-center pointer-events-auto">
                 <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm tracking-wide active:scale-95 transition-transform"
                 >
                    <i className="fi fi-rr-cross-small text-lg"></i>
                    {t.buttons.close}
                 </button>
             </div>
        </div>
    </div>
  );

  return (
    // MAIN ROOT: FIXED, FULL SCREEN, NO SCROLLING, ABSOLUTE LAYOUTING
    <div 
        className={`fixed inset-0 h-[100dvh] w-screen overflow-hidden ${direction === 'rtl' ? 'rtl' : 'ltr'} font-sans transition-colors duration-500 text-white`} 
        style={{ background: currentTheme.background }}
        dir={direction}
    >
      
      {/* 
        ========================================
        LAYER 3: HEADER & UI (ABSOLUTE TOP)
        Z-INDEX: 50
        POINTER-EVENTS-NONE (Allows clicking through to wheel)
        ========================================
      */}
      <header 
        className="absolute top-0 left-0 w-full z-50 p-6 md:p-8 flex items-start justify-between pointer-events-none"
      >
        {/* Logo & Title */}
        <div className="flex items-center gap-3 md:gap-4 pointer-events-auto group cursor-default">
             <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 filter drop-shadow-xl">
                 <img src="https://beeimg.com/images/s32909931692.png" alt="Logo" className="w-full h-full object-contain" />
             </div>
             <div className="flex flex-col justify-center">
                {/* SMALLER TITLE AS REQUESTED */}
                <h1 className="text-lg md:text-xl font-black tracking-tighter text-white leading-none">
                    RODA <span className="text-[#FFD700]">BERPUTAR</span>
                </h1>
                <span className="text-[9px] font-bold text-white/80 tracking-[0.2em] uppercase mt-0.5 opacity-80">
                    {t.subtitle}
                </span>
             </div>
        </div>
        
        {/* Buttons */}
        <div className="flex items-center gap-3 pointer-events-auto">
            <button 
                className="h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-90 transition-all backdrop-blur-sm shadow-xl" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                title={t.buttons.menu}
            >
                 <i className={`fi ${isSidebarOpen ? 'fi-rr-cross-small' : 'fi-rr-menu-burger'} text-lg md:text-xl`}></i>
            </button>
            <button 
                onClick={toggleFullScreen}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-90 transition-all backdrop-blur-sm shadow-xl"
                title="Fullscreen"
            >
                <i className={`fi ${isFullScreen ? 'fi-rr-compress-alt' : 'fi-rr-expand'} text-lg md:text-xl`}></i>
            </button>
        </div>
      </header>

      {/* 
        ========================================
        LAYER 2: SIDEBAR (ABSOLUTE LEFT)
        Z-INDEX: 40
        ========================================
      */}
      <aside 
          className={`
              absolute inset-y-0 left-0 z-40
              transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)
              border-r border-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden
              ${isSidebarOpen 
                  ? 'translate-x-0' 
                  : '-translate-x-full'
              }
          `}
          style={{ 
              backgroundColor: currentTheme.panelBg,
              width: 'min(100vw, 24rem)' 
          }}
      >
          <div className="w-full h-full relative">
             <SidebarContent />
          </div>
      </aside>

      {/* 
        ========================================
        LAYER 1: MAIN CANVAS (ABSOLUTE INSET-0)
        Z-INDEX: 0
        ========================================
      */}
      <main className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          {/* 
             Wheel Wrapper
          */}
          <div className="relative w-[92vmin] h-[92vmin] md:w-[85vmin] md:h-[85vmin] max-w-[900px] max-h-[900px] pointer-events-auto flex items-center justify-center">
              
              {/* Back Glow */}
              <div 
                  className="absolute inset-0 rounded-full blur-[100px] opacity-20 pointer-events-none z-0 transition-colors duration-500"
                  style={{ background: currentTheme.wheelSegments[1] }}
              ></div>

              {/* The Wheel */}
              <div className="w-full h-full z-10 relative">
                   <Wheel 
                      ref={wheelRef}
                      items={items}
                      theme={currentTheme}
                      spinDuration={settings.spinDuration}
                      onSpinEnd={onSpinEnd}
                      onTick={(speed) => settings.enableSound && audioService.playTick(speed)}
                      isSpinning={isSpinning}
                      setIsSpinning={setIsSpinning}
                  />
              </div>

              {/* GO Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[18%] h-[18%]">
                  <button 
                      onClick={handleSpin}
                      disabled={isSpinning || items.length === 0}
                      className={`
                          w-full h-full rounded-full 
                          relative group cursor-pointer
                          disabled:cursor-not-allowed 
                          flex items-center justify-center
                          transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                          ${isSpinning ? 'scale-90' : 'hover:scale-110 active:scale-95'}
                      `}
                      style={{
                          // SOLID COLOR GRADIENT
                          background: `radial-gradient(circle at 30% 30%, ${currentTheme.accent} 0%, ${currentTheme.wheelInnerRing} 100%)`,
                          boxShadow: `
                            0 20px 40px -10px rgba(0,0,0,0.6), 
                            inset 0 4px 8px rgba(255,255,255,0.2),
                            inset 0 -8px 16px rgba(0,0,0,0.3)
                          `
                      }}
                  >
                       <div className="absolute inset-[-4px] rounded-full animate-spin-slow opacity-100 pointer-events-none border-[3px] border-white/20 border-t-white/60 border-l-transparent border-r-transparent shadow-lg"></div>
                       <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>

                       <div className="relative z-20 flex items-center justify-center pointer-events-none">
                           {isSpinning ? (
                                   <i 
                                      className="fi fi-rr-spinner text-[3vmin] animate-spin drop-shadow-md"
                                      style={{ color: currentTheme.buttonText }}
                                   ></i>
                              ) : (
                                   <span 
                                      className="font-black text-[2.5vmin] tracking-widest leading-none text-center mt-0.5"
                                      style={{ 
                                          color: currentTheme.buttonText,
                                          // NO TEXT SHADOW
                                      }}
                                   >
                                      {t.ui.go}
                                   </span>
                              )}
                       </div>
                  </button>
              </div>
          </div>
      </main>

      {/* Winner Modal */}
      {showWinnerModal && (
        <WinnerModal 
            winner={currentWinner}
            onClose={() => setShowWinnerModal(false)}
            onRemove={() => {
                handleRemoveWinner();
                setShowWinnerModal(false);
            }}
            t={t}
            theme={modalTheme} 
        />
      )}
      
      <style>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
      `}</style>

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
};

export default App;
