
export interface WheelEntry {
  id: string;
  text: string;
  visible: boolean;
}

export type ThemeId = 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'rainbow';

export interface ThemeConfig {
  id: ThemeId;
  name: string; // Used for internal reference or fallback
  background: string; // CSS Gradient for app background
  panelBg: string; // Glass panel color
  wheelOuterRing: string[]; // Changed to string[] to allow complex gradients
  wheelInnerRing: string;
  wheelSegments: string[]; // Alternating colors
  textStroke: string;
  accent: string;
  buttonText: string; // Text color for buttons using the accent background
  text: string;
}

export interface AppSettings {
  theme: ThemeId;
  language: LanguageCode;
  spinDuration: number; // in seconds
  enableSound: boolean;
  removeWinner: boolean;
}

export interface WinnerHistory {
  id: string;
  text: string;
  timestamp: number;
}

export enum SpinState {
  IDLE,
  SPINNING,
  DECELERATING,
  STOPPED,
  WINNER_ANIMATION
}

// Expanded to support major global languages
export type LanguageCode = 'id' | 'en' | 'ar' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko' | 'ru' | 'pt' | 'hi';

export interface Translation {
  meta: { // NEW: SEO Fields
    title: string;
    description: string;
  };
  label: string; // Endonym (e.g., "Bahasa Indonesia")
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  tabs: { // NEW: Sidebar Navigation Tabs
      entries: string;
      settings: string;
      history: string;
      info: string;
  };
  buttons: {
    shuffle: string;
    sort: string;
    unique: string;
    spin: string; // Usually "GO" or "SPIN"
    close: string;
    remove: string;
    keep: string;
    clear: string;
    menu: string; // New: For the header menu button
  };
  ui: { // New section for generic UI labels
    go: string;
    fast: string;
    slow: string;
    editMode: string;
    items: string;
  };
  settings: {
    title: string;
    sections: { // New: Group headers
        appearance: string;
        gameplay: string;
    };
    sound: string;
    soundDesc: string; // New: Description text
    duration: string;
    removeWinner: string;
    removeWinnerDesc: string; // New: Description text
    theme: string;
    language: string;
    info: string;
  };
  themes: Record<ThemeId, string>; // Localized theme names
  winner: {
    congrats: string;
    result: string;
  };
  history: {
    title: string;
    empty: string;
    clear: string;
  };
  actions: {
    import: string;
    export: string;
    save: string;
  };
  alert: { // New: Popups
    clearConfirm: string;
  };
  footer: { // New: Sidebar footer
    version: string;
    copyright: string;
  };
  developer: { // NEW: Developer Section
      title: string;
      name: string;
      role: string;
      visitLabel: string;
  };
  infoContent: {
    aboutTitle: string;
    aboutDesc: string;
    featuresTitle: string;
    featuresList: string[]; // Changed to array for mapping
    changelogTitle: string; // NEW
    changelogList: string[]; // NEW
  }
}
