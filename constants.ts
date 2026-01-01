
import { Translation, LanguageCode, ThemeConfig, ThemeId } from './types';

// --- SHARED RESOURCES ---
// Premium Gold for borders
const GOLD_RIM = [
    '#FFFFE0', '#FFD700', '#F59E0B', '#B45309', '#FFC107', '#FFF59D'
]; 

// Premium Silver for Neutral themes
const SILVER_RIM = [
    '#FFFFFF', '#E2E8F0', '#94A3B8', '#475569', '#CBD5E1', '#F8FAFC'
];

export const THEMES: Record<ThemeId, ThemeConfig> = {
  // 1. BLUE (Ocean/Professional)
  blue: {
    id: 'blue',
    name: 'Blue',
    background: 'radial-gradient(circle at center, #0369A1 0%, #082F49 90%)',
    panelBg: 'rgba(8, 47, 73, 0.85)',
    wheelOuterRing: SILVER_RIM,
    wheelInnerRing: '#0C4A6E', 
    wheelSegments: ['#0284C7', '#FFFFFF'], 
    textStroke: '#0284C7', 
    accent: '#38BDF8', 
    buttonText: '#FFFFFF',
    text: '#FFFFFF'
  },

  // 2. GREEN (Nature/Harmony)
  green: {
    id: 'green',
    name: 'Green',
    background: 'radial-gradient(circle at center, #059669 0%, #022C22 90%)',
    panelBg: 'rgba(2, 44, 34, 0.85)',
    wheelOuterRing: GOLD_RIM,
    wheelInnerRing: '#064E3B', 
    wheelSegments: ['#059669', '#FFFFFF'], 
    textStroke: '#059669',
    accent: '#34D399', 
    buttonText: '#FFFFFF',
    text: '#FFFFFF'
  },

  // 3. RED (Energy/Power)
  red: {
    id: 'red',
    name: 'Red',
    background: 'radial-gradient(circle at center, #DC2626 0%, #450A0A 90%)',
    panelBg: 'rgba(69, 10, 10, 0.85)',
    wheelOuterRing: GOLD_RIM,
    wheelInnerRing: '#7F1D1D', 
    wheelSegments: ['#DC2626', '#FFFFFF'], 
    textStroke: '#DC2626',
    accent: '#F87171', 
    buttonText: '#FFFFFF',
    text: '#FFFFFF'
  },

  // 4. PURPLE (Royal/Creative)
  purple: {
    id: 'purple',
    name: 'Purple',
    background: 'radial-gradient(circle at center, #7C3AED 0%, #2E1065 90%)',
    panelBg: 'rgba(46, 16, 101, 0.85)',
    wheelOuterRing: GOLD_RIM,
    wheelInnerRing: '#4C1D95', 
    wheelSegments: ['#7C3AED', '#FFFFFF'], 
    textStroke: '#7C3AED',
    accent: '#A78BFA', 
    buttonText: '#FFFFFF',
    text: '#FFFFFF'
  },

  // 5. ORANGE (High Contrast)
  orange: {
    id: 'orange',
    name: 'Orange',
    background: 'radial-gradient(circle at center, #C2410C 0%, #431407 100%)', 
    panelBg: 'rgba(67, 20, 7, 0.90)', 
    wheelOuterRing: GOLD_RIM,
    wheelInnerRing: '#7C2D12', 
    wheelSegments: ['#EA580C', '#FFFFFF'], 
    textStroke: '#EA580C', 
    accent: '#FB923C', 
    buttonText: '#FFFFFF',
    text: '#FFFFFF'
  },

  // 6. MULTICOLOR (Rainbow/Universal)
  rainbow: {
    id: 'rainbow',
    name: 'Rainbow',
    // UPDATED: Diagonal Linear Gradient for Rainbow effect
    background: 'linear-gradient(135deg, #EF4444 0%, #F97316 20%, #EAB308 40%, #10B981 60%, #3B82F6 80%, #8B5CF6 100%)',
    // Darker panel for better readability against colorful background
    panelBg: 'rgba(15, 23, 42, 0.85)', 
    wheelOuterRing: SILVER_RIM,
    wheelInnerRing: '#1E293B', 
    wheelSegments: ['#EF4444', '#F97316', '#EAB308', '#10B981', '#3B82F6', '#8B5CF6'], 
    textStroke: '#FFFFFF', 
    accent: '#FACC15', 
    buttonText: '#FFFFFF',
    text: '#FFFFFF'
  }
};

export const TRANSLATIONS: Record<LanguageCode, Translation> = {
  id: {
    meta: {
        title: 'Roda Berputar – Spin Wheel Picker & Acak Nama Online',
        description: 'Roda Berputar adalah aplikasi Spin Wheel Picker terbaik untuk mengacak nama, pemenang giveaway, dan arisan secara online. Alat roda putar gratis, adil, tanpa iklan.',
    },
    label: 'Bahasa Indonesia',
    title: 'RODA BERPUTAR',
    subtitle: 'SPIN WHEEL PICKER',
    inputPlaceholder: 'Masukkan nama/item di sini...\nSatu per baris',
    tabs: {
        entries: 'Daftar',
        settings: 'Pengaturan',
        history: 'Riwayat',
        info: 'Info'
    },
    buttons: {
      shuffle: 'Acak',
      sort: 'Urut',
      unique: 'Unik',
      spin: 'PUTAR',
      close: 'Tutup',
      remove: 'Hapus Pemenang',
      keep: 'Simpan Pemenang',
      clear: 'Hapus',
      menu: 'Menu'
    },
    ui: {
        go: 'GO',
        fast: 'CEPAT',
        slow: 'LAMBAT',
        editMode: 'MODE EDIT',
        items: 'ITEM'
    },
    settings: {
      title: 'Pengaturan',
      sections: {
          appearance: 'Tampilan',
          gameplay: 'Permainan'
      },
      sound: 'Efek Suara',
      soundDesc: 'SFX & Musik Latar',
      duration: 'Durasi Putar',
      removeWinner: 'Hapus Pemenang',
      removeWinnerDesc: 'Hapus otomatis saat menang',
      theme: 'Tema Roda',
      language: 'Bahasa',
      info: 'Info',
    },
    themes: {
      blue: 'Biru',
      green: 'Hijau',
      red: 'Merah',
      purple: 'Ungu',
      orange: 'Oranye',
      rainbow: 'Pelangi',
    },
    winner: {
      congrats: 'Selamat Kepada',
      result: 'Terpilih:',
    },
    history: {
      title: 'Riwayat Undian',
      empty: 'Belum ada hasil putaran.',
      clear: 'Bersihkan Log',
    },
    actions: {
      import: 'Buka File',
      export: 'Simpan',
      save: 'Screenshot',
    },
    alert: {
        clearConfirm: 'Hapus semua nama peserta?'
    },
    footer: {
        version: 'Versi 1.2.0',
        copyright: 'Roda Berputar'
    },
    developer: {
        title: 'Pengembang',
        name: 'Febri Suryanto',
        role: 'Full Stack Web Developer',
        visitLabel: 'Kunjungi Website'
    },
    infoContent: {
      aboutTitle: 'Tentang Aplikasi',
      aboutDesc: 'Roda Berputar adalah aplikasi Spin Wheel Picker modern yang dirancang untuk kebutuhan pengacakan nama, giveaway, arisan, dan pengambilan keputusan secara adil dan transparan.',
      featuresTitle: 'Fitur Utama',
      featuresList: [
        'Antarmuka 3D Glassmorphism Premium',
        'Tanpa Iklan & Tanpa Login',
        'Sistem Pengacakan Adil (Fair Play)',
        'Efek Suara Realistis',
        '100% Responsif Mobile & Desktop'
      ],
      changelogTitle: 'Riwayat Perubahan (v1.2.0)',
      changelogList: [
        'Peningkatan desain Modal Pemenang (3D Character)',
        'Perbaikan warna tema Orange & Kontras Teks',
        'Optimasi performa putaran roda',
        'Jarum penunjuk Emas Premium'
      ]
    }
  },
  en: {
    meta: {
        title: 'Wheel of Names – Random Spin Wheel Picker Online',
        description: 'The best free Spin Wheel Picker for random name selection, giveaways, and raffles. Fair, transparent, and easy to use with no ads.',
    },
    label: 'English',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'Enter names/items here...\nOne per line',
    tabs: {
        entries: 'Entries',
        settings: 'Settings',
        history: 'History',
        info: 'Info'
    },
    buttons: {
      shuffle: 'Mix',
      sort: 'Sort',
      unique: 'Uniq',
      spin: 'SPIN',
      close: 'Close',
      remove: 'Remove Winner',
      keep: 'Keep Winner',
      clear: 'Clear',
      menu: 'Menu'
    },
    ui: {
        go: 'GO',
        fast: 'FAST',
        slow: 'SLOW',
        editMode: 'EDIT MODE',
        items: 'ITEMS'
    },
    settings: {
      title: 'Settings',
      sections: {
          appearance: 'Appearance',
          gameplay: 'Gameplay'
      },
      sound: 'Sound Effects',
      soundDesc: 'SFX & BGM',
      duration: 'Spin Duration',
      removeWinner: 'Auto-remove',
      removeWinnerDesc: 'Remove name after win',
      theme: 'Wheel Theme',
      language: 'Language',
      info: 'Info',
    },
    themes: {
      blue: 'Blue',
      green: 'Green',
      red: 'Red',
      purple: 'Purple',
      orange: 'Orange',
      rainbow: 'Color',
    },
    winner: {
      congrats: 'Congratulations',
      result: 'Selected:',
    },
    history: {
      title: 'Draw History',
      empty: 'No results yet.',
      clear: 'Clear Log',
    },
    actions: {
      import: 'Import',
      export: 'Export',
      save: 'Screenshot',
    },
    alert: {
        clearConfirm: 'Delete all entries?'
    },
    footer: {
        version: 'Version 1.2.0',
        copyright: 'Roda Berputar'
    },
    developer: {
        title: 'Developer',
        name: 'Febri Suryanto',
        role: 'Full Stack Web Developer',
        visitLabel: 'Visit Website'
    },
    infoContent: {
      aboutTitle: 'About App',
      aboutDesc: 'Roda Berputar is the ultimate Spin Wheel Picker for random name selection. It is a free, fair, and transparent tool perfect for giveaways, raffles, team selections, and random decision making.',
      featuresTitle: 'Key Features',
      featuresList: [
        'Premium 3D Glassmorphism UI',
        'No Ads & No Login Required',
        'Fair Random Algorithm',
        'Realistic Sound Effects',
        'Mobile & Desktop Optimized'
      ],
      changelogTitle: 'Changelog (v1.2.0)',
      changelogList: [
        'New Winner Modal Design (3D Character)',
        'Fixed Orange Theme & Text Contrast',
        'Performance optimization',
        'Premium Gold Pointer'
      ]
    }
  },
  es: {
    meta: {
        title: 'Ruleta de Nombres – Sorteos y Juegos Aleatorios',
        description: 'La mejor ruleta de nombres online gratis para sorteos. Gira la ruleta y elige un ganador de forma justa y divertida.',
    },
    label: 'Español',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'Ingrese nombres aquí...\nUno por línea',
    tabs: { entries: 'Entradas', settings: 'Ajustes', history: 'Historial', info: 'Info' },
    buttons: {
      shuffle: 'Mezclar', sort: 'Ordenar', unique: 'Único', spin: 'GIRAR',
      close: 'Cerrar', remove: 'Eliminar Ganador', keep: 'Mantener Ganador', clear: 'Borrar', menu: 'Menú'
    },
    ui: { go: 'GO', fast: 'RÁPIDO', slow: 'LENTO', editMode: 'EDICIÓN', items: 'ITEMS' },
    settings: {
      title: 'Configuración',
      sections: { appearance: 'Apariencia', gameplay: 'Juego' },
      sound: 'Efectos de sonido', soundDesc: 'SFX y BGM',
      duration: 'Duración', removeWinner: 'Auto-eliminar', removeWinnerDesc: 'Borrar tras ganar',
      theme: 'Tema', language: 'Idioma', info: 'Info',
    },
    themes: { blue: 'Azul', green: 'Verde', red: 'Rojo', purple: 'Morado', orange: 'Naranja', rainbow: 'Color' },
    winner: { congrats: '¡Felicidades!', result: 'Seleccionado:' },
    history: { title: 'Historial', empty: 'Sin resultados aún.', clear: 'Borrar' },
    actions: { import: 'Importar', export: 'Exportar', save: 'Captura' },
    alert: { clearConfirm: '¿Borrar todo?' },
    footer: { version: 'Versión 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: 'Desarrollador', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: 'Sitio Web' },
    infoContent: {
      aboutTitle: 'Acerca de', aboutDesc: 'Herramienta Spin Wheel Picker gratuita.',
      featuresTitle: 'Características', featuresList: ['Giro interactivo', 'Sin anuncios', 'Diseño moderno'],
      changelogTitle: 'Cambios (v1.2.0)', changelogList: ['Nueva Interfaz', 'Corrección de errores']
    }
  },
  fr: {
    meta: {
        title: 'Roue des Prénoms – Tirage au Sort en Ligne',
        description: 'La meilleure roue de la fortune gratuite pour tirages au sort, concours et jeux. Simple, équitable et sans inscription.',
    },
    label: 'Français',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'Entrez les noms ici...\nUn par ligne',
    tabs: { entries: 'Entrées', settings: 'Paramètres', history: 'Historique', info: 'Info' },
    buttons: {
      shuffle: 'Mélange', sort: 'Trier', unique: 'Unique', spin: 'TOURNER',
      close: 'Fermer', remove: 'Supprimer Gagnant', keep: 'Garder Gagnant', clear: 'Effacer', menu: 'Menu'
    },
    ui: { go: 'GO', fast: 'VITE', slow: 'LENT', editMode: 'ÉDITION', items: 'ÉLÉMENTS' },
    settings: {
      title: 'Paramètres',
      sections: { appearance: 'Apparence', gameplay: 'Jeu' },
      sound: 'Sons', soundDesc: 'Effets sonores',
      duration: 'Durée', removeWinner: 'Auto-suppression', removeWinnerDesc: 'Supprimer le gagnant',
      theme: 'Thème', language: 'Langue', info: 'Info',
    },
    themes: { blue: 'Bleu', green: 'Vert', red: 'Rouge', purple: 'Violet', orange: 'Orange', rainbow: 'Couleur' },
    winner: { congrats: 'Félicitations', result: 'Sélectionné:' },
    history: { title: 'Historique', empty: 'Aucun résultat.', clear: 'Effacer' },
    actions: { import: 'Importer', export: 'Exporter', save: 'Capture' },
    alert: { clearConfirm: 'Tout effacer ?' },
    footer: { version: 'Version 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: 'Développeur', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: 'Site Web' },
    infoContent: {
      aboutTitle: 'À propos', aboutDesc: 'Outil de tirage au sort gratuit.',
      featuresTitle: 'Caractéristiques', featuresList: ['Roue interactive', 'Gratuit', 'Design moderne'],
      changelogTitle: 'Changements (v1.2.0)', changelogList: ['Nouvelle interface', 'Corrections de bugs']
    }
  },
  de: {
    meta: {
        title: 'Glücksrad Online – Namen Zufallsgenerator',
        description: 'Das beste kostenlose Glücksrad für Gewinnspiele und Zufallsentscheidungen. Fair, schnell und ohne Werbung.',
    },
    label: 'Deutsch',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'Namen hier eingeben...',
    tabs: { entries: 'Einträge', settings: 'Einstell.', history: 'Verlauf', info: 'Info' },
    buttons: { shuffle: 'Mischen', sort: 'Sort.', unique: 'Einzig.', spin: 'DREHEN', close: 'Schließen', remove: 'Gewinner löschen', keep: 'Gewinner behalten', clear: 'Löschen', menu: 'Menü' },
    ui: { go: 'GO', fast: 'SCHNELL', slow: 'LANGSAM', editMode: 'BEARBEITEN', items: 'ELEMENTE' },
    settings: {
      title: 'Einstellungen',
      sections: { appearance: 'Aussehen', gameplay: 'Spiel' },
      sound: 'Soundeffekte', soundDesc: 'SFX an',
      duration: 'Dauer', removeWinner: 'Auto-Entfernen', removeWinnerDesc: 'Gewinner löschen',
      theme: 'Thema', language: 'Sprache', info: 'Info'
    },
    themes: { blue: 'Blau', green: 'Grün', red: 'Rot', purple: 'Lila', orange: 'Orange', rainbow: 'Bunt' },
    winner: { congrats: 'Glückwunsch', result: 'Ausgewählt:' },
    history: { title: 'Verlauf', empty: 'Leer', clear: 'Löschen' },
    actions: { import: 'Import', export: 'Export', save: 'Screenshot' },
    alert: { clearConfirm: 'Alles löschen?' },
    footer: { version: 'Version 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: 'Entwickler', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: 'Webseite' },
    infoContent: { aboutTitle: 'Über', aboutDesc: 'Spin', featuresTitle: 'Features', featuresList: [], changelogTitle: 'Changelog', changelogList: [] }
  },
  ar: {
    meta: {
        title: 'عجلة الأسماء - اختيار عشوائي للأسماء أونلاين',
        description: 'أفضل عجلة دوارة مجانية لاختيار الأسماء العشوائية والمسابقات والسحوبات. عادلة وشفافة وسهلة الاستخدام بدون إعلانات.',
    },
    label: 'العربية',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'أدخل الأسماء هنا...\nواحد في كل سطر',
    tabs: { entries: 'الإدخالات', settings: 'الإعدادات', history: 'السجل', info: 'معلومات' },
    buttons: {
      shuffle: 'خلط', sort: 'فرز', unique: 'فريد', spin: 'دوران',
      close: 'إغلاق', remove: 'حذف الفائز', keep: 'إبقاء الفائز', clear: 'مسح', menu: 'قائمة'
    },
    ui: { go: 'ابدأ', fast: 'سريع', slow: 'بطيء', editMode: 'وضع التعديل', items: 'عناصر' },
    settings: {
      title: 'الإعدادات',
      sections: { appearance: 'المظهر', gameplay: 'اللعب' },
      sound: 'المؤثرات الصوتية', soundDesc: 'تشغيل الصوت',
      duration: 'مدة الدوران', removeWinner: 'حذف تلقائي', removeWinnerDesc: 'حذف الاسم بعد الفوز',
      theme: 'موضوع العجلة', language: 'اللغة', info: 'معلومات',
    },
    themes: { blue: 'أزرق', green: 'أخضر', red: 'أحمر', purple: 'أرجواني', orange: 'برتقالي', rainbow: 'ألوان' },
    winner: { congrats: 'تهانينا', result: 'تم اختيار:' },
    history: { title: 'سجل السحب', empty: 'لا توجد نتائج بعد.', clear: 'مسح السجل' },
    actions: { import: 'استيراد', export: 'تصدير', save: 'لقطة شاشة' },
    alert: { clearConfirm: 'حذف جميع الإدخالات؟' },
    footer: { version: 'الإصدار 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: 'المطور', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: 'زيارة الموقع' },
    infoContent: {
      aboutTitle: 'عن التطبيق', aboutDesc: 'أداة عجلة دوارة مجانية للسحوبات العشوائية.',
      featuresTitle: 'الميزات', featuresList: ['عجلة تفاعلية', 'بدون إعلانات', 'عادل وشفاف', 'تصميم عصري'],
      changelogTitle: 'التغييرات', changelogList: []
    }
  },
  zh: {
    meta: {
        title: '名字轮盘 – 在线随机名字选择器',
        description: '用于随机选择名字、赠品和抽奖的最佳免费转盘选择器。公平、透明且易于使用，无广告。',
    },
    label: '中文',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: '在此处输入名字...\n每行一个',
    tabs: { entries: '条目', settings: '设置', history: '历史', info: '信息' },
    buttons: {
      shuffle: '打乱', sort: '排序', unique: '去重', spin: '旋转',
      close: '关闭', remove: '移除赢家', keep: '保留赢家', clear: '清空', menu: '菜单'
    },
    ui: { go: '开始', fast: '快', slow: '慢', editMode: '编辑模式', items: '项目' },
    settings: {
      title: '设置',
      sections: { appearance: '外观', gameplay: '游戏' },
      sound: '音效', soundDesc: '旋转音效',
      duration: '持续时间', removeWinner: '自动移除', removeWinnerDesc: '获胜后移除',
      theme: '主题', language: '语言', info: '信息',
    },
    themes: { blue: '蓝色', green: '绿色', red: '红色', purple: '紫色', orange: '橙色', rainbow: '彩色' },
    winner: { congrats: '恭喜', result: '已选中：' },
    history: { title: '抽奖历史', empty: '暂无结果。', clear: '清空日志' },
    actions: { import: '导入', export: '导出', save: '截图' },
    alert: { clearConfirm: '删除所有条目？' },
    footer: { version: '版本 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: '开发者', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: '访问网站' },
    infoContent: {
      aboutTitle: '关于应用', aboutDesc: '用于随机抽奖的免费转盘工具。',
      featuresTitle: '功能', featuresList: ['互动转盘', '无广告', '公平透明', '现代设计'], changelogTitle: 'Changelog', changelogList: []
    }
  },
  ja: {
    meta: {
        title: '名前ルーレット – ランダムスピナーオンライン',
        description: 'ランダムな名前選択、プレゼント、抽選に最適な無料のスピンホイールピッカー。公平で透明性があり、広告なしで使いやすい。',
    },
    label: '日本語',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'ここに名前を入力...\n1行に1つ',
    tabs: { entries: 'エントリー', settings: '設定', history: '履歴', info: '情報' },
    buttons: {
      shuffle: 'シャッフル', sort: 'ソート', unique: '重複削除', spin: '回す',
      close: '閉じる', remove: '勝者を削除', keep: '勝者を残す', clear: 'クリア', menu: 'メニュー'
    },
    ui: { go: 'GO', fast: '速い', slow: '遅い', editMode: '編集モード', items: 'アイテム' },
    settings: {
      title: '設定',
      sections: { appearance: '外観', gameplay: 'ゲームプレイ' },
      sound: '効果音', soundDesc: '回転音',
      duration: '回転時間', removeWinner: '自動削除', removeWinnerDesc: '勝者をリストから削除',
      theme: 'テーマ', language: '言語', info: '情報',
    },
    themes: { blue: '青', green: '緑', red: '赤', purple: '紫', orange: 'オレンジ', rainbow: '虹色' },
    winner: { congrats: 'おめでとうございます', result: '当選者:' },
    history: { title: '抽選履歴', empty: '結果はまだありません。', clear: 'ログ消去' },
    actions: { import: 'インポート', export: 'エクスポート', save: '保存' },
    alert: { clearConfirm: '全て削除しますか？' },
    footer: { version: 'バージョン 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: '開発者', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: 'ウェブサイト' },
    infoContent: {
      aboutTitle: 'アプリについて', aboutDesc: 'ランダム抽選のための無料スピンホイールツール。',
      featuresTitle: '機能', featuresList: ['インタラクティブホイール', '広告なし', '公平で透明', 'モダンデザイン'], changelogTitle: 'Changelog', changelogList: []
    }
  },
  ko: {
    meta: {
        title: '이름 룰렛 – 온라인 랜덤 추첨기',
        description: '랜덤 이름 선택, 경품, 추첨을 위한 최고의 무료 스핀 휠 피커. 공정하고 투명하며 광고 없이 사용하기 쉽습니다.',
    },
    label: '한국어',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: '이름을 입력하세요...\n줄당 하나',
    tabs: { entries: '참가자', settings: '설정', history: '기록', info: '정보' },
    buttons: {
      shuffle: '섞기', sort: '정렬', unique: '중복제거', spin: '돌리기',
      close: '닫기', remove: '당첨자 제거', keep: '당첨자 유지', clear: '지우기', menu: '메뉴'
    },
    ui: { go: 'GO', fast: '빠르게', slow: '느리게', editMode: '편집 모드', items: '아이템' },
    settings: {
      title: '설정',
      sections: { appearance: '외관', gameplay: '게임플레이' },
      sound: '효과음', soundDesc: '회전 소리',
      duration: '회전 시간', removeWinner: '자동 제거', removeWinnerDesc: '당첨 후 제거',
      theme: '테마', language: '언어', info: '정보',
    },
    themes: { blue: '파랑', green: '초록', red: '빨강', purple: '보라', orange: '주황', rainbow: '무지개' },
    winner: { congrats: '축하합니다', result: '선택됨:' },
    history: { title: '추첨 기록', empty: '아직 결과가 없습니다.', clear: '기록 삭제' },
    actions: { import: '가져오기', export: '내보내기', save: '저장' },
    alert: { clearConfirm: '모든 항목을 삭제하시겠습니까?' },
    footer: { version: '버전 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: '개발자', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: '웹사이트 방문' },
    infoContent: {
      aboutTitle: '앱 정보', aboutDesc: '랜덤 추첨을 위한 무료 스핀 휠 도구입니다.',
      featuresTitle: '기능', featuresList: ['인터랙티브 휠', '광고 없음', '공정하고 투명', '현대적인 디자인'], changelogTitle: 'Changelog', changelogList: []
    }
  },
  ru: {
    meta: {
        title: 'Колесо Имен – Случайный Выбор Онлайн',
        description: 'Лучшее бесплатное колесо фортуны для случайного выбора имен и розыгрышей. Честно, прозрачно и без рекламы.',
    },
    label: 'Русский',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'Введите имена здесь...\nОдно в строке',
    tabs: { entries: 'Записи', settings: 'Настройки', history: 'История', info: 'Инфо' },
    buttons: {
      shuffle: 'Перемешать', sort: 'Сорт.', unique: 'Уникал.', spin: 'КРУТИТЬ',
      close: 'Закрыть', remove: 'Удалить', keep: 'Оставить', clear: 'Очистить', menu: 'Меню'
    },
    ui: { go: 'GO', fast: 'БЫСТРО', slow: 'МЕДЛЕННО', editMode: 'РЕДАКТОР', items: 'ЭЛЕМЕНТЫ' },
    settings: {
      title: 'Настройки',
      sections: { appearance: 'Внешний вид', gameplay: 'Геймплей' },
      sound: 'Звуки', soundDesc: 'SFX при вращении',
      duration: 'Длительность', removeWinner: 'Авто-удаление', removeWinnerDesc: 'Удалять победителя',
      theme: 'Тема', language: 'Язык', info: 'Инфо',
    },
    themes: { blue: 'Синий', green: 'Зеленый', red: 'Красный', purple: 'Фиолетовый', orange: 'Оранжевый', rainbow: 'Радуга' },
    winner: { congrats: 'Поздравляем', result: 'Выбрано:' },
    history: { title: 'История', empty: 'Пока нет результатов.', clear: 'Очистить' },
    actions: { import: 'Импорт', export: 'Экспорт', save: 'Скриншот' },
    alert: { clearConfirm: 'Удалить все записи?' },
    footer: { version: 'Версия 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: 'Разработчик', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: 'Вебсайт' },
    infoContent: {
      aboutTitle: 'О приложении', aboutDesc: 'Бесплатный инструмент для случайного выбора.',
      featuresTitle: 'Функции', featuresList: ['Интерактивное колесо', 'Без рекламы', 'Честно', 'Современный дизайн'], changelogTitle: 'Changelog', changelogList: []
    }
  },
  pt: {
    meta: {
        title: 'Roda de Nomes – Sorteador Aleatório Online',
        description: 'O melhor sorteador de nomes gratuito para sorteios e rifas. Justo, transparente e fácil de usar, sem anúncios.',
    },
    label: 'Português',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'Insira nomes aqui...\nUm por linha',
    tabs: { entries: 'Entradas', settings: 'Config.', history: 'Histórico', info: 'Info' },
    buttons: {
      shuffle: 'Misturar', sort: 'Ordenar', unique: 'Único', spin: 'GIRAR',
      close: 'Fechar', remove: 'Remover Vencedor', keep: 'Manter Vencedor', clear: 'Limpar', menu: 'Menu'
    },
    ui: { go: 'VAI', fast: 'RÁPIDO', slow: 'LENTO', editMode: 'EDITAR', items: 'ITENS' },
    settings: {
      title: 'Configurações',
      sections: { appearance: 'Aparência', gameplay: 'Jogo' },
      sound: 'Efeitos sonoros', soundDesc: 'SFX ao girar',
      duration: 'Duração', removeWinner: 'Auto-remover', removeWinnerDesc: 'Remover ao ganhar',
      theme: 'Tema', language: 'Idioma', info: 'Info',
    },
    themes: { blue: 'Azul', green: 'Verde', red: 'Vermelho', purple: 'Roxo', orange: 'Laranja', rainbow: 'Arco-íris' },
    winner: { congrats: 'Parabéns', result: 'Selecionado:' },
    history: { title: 'Histórico', empty: 'Sem resultados.', clear: 'Limpar' },
    actions: { import: 'Importar', export: 'Exportar', save: 'Salvar' },
    alert: { clearConfirm: 'Apagar tudo?' },
    footer: { version: 'Versão 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: 'Desenvolvedor', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: 'Website' },
    infoContent: {
      aboutTitle: 'Sobre', aboutDesc: 'Ferramenta de roda de sorteio gratuita.',
      featuresTitle: 'Recursos', featuresList: ['Roda interativa', 'Sem anúncios', 'Justo', 'Design moderno'], changelogTitle: 'Changelog', changelogList: []
    }
  },
  hi: {
    meta: {
        title: 'नाम पहिया - रैंडम स्पिन व्हील ऑनलाइन',
        description: 'यादृच्छिक नाम चयन, उपहार और रैफल्स के लिए सबसे अच्छा मुफ्त स्पिन व्हील पिकर। निष्पक्ष, पारदर्शी और विज्ञापनों के बिना उपयोग करने में आसान।',
    },
    label: 'हिन्दी',
    title: 'Roda Berputar',
    subtitle: 'Spin Wheel Picker',
    inputPlaceholder: 'यहाँ नाम दर्ज करें...\nप्रति पंक्ति एक',
    tabs: { entries: 'प्रविष्टियां', settings: 'सेटिंग्स', history: 'इतिहास', info: 'जानकारी' },
    buttons: {
      shuffle: 'मिश्रण', sort: 'क्रमबद्ध', unique: 'अद्वितीय', spin: 'स्पिन',
      close: 'बंद करें', remove: 'विजेता हटाएं', keep: 'विजेता रखें', clear: 'साफ़ करें', menu: 'मेन्यू'
    },
    ui: { go: 'GO', fast: 'तेज़', slow: 'धीमा', editMode: 'संपादक', items: 'आइटम' },
    settings: {
      title: 'सेटिंग्स',
      sections: { appearance: 'उपस्थिति', gameplay: 'गेमप्ले' },
      sound: 'ध्वनि प्रभाव', soundDesc: 'घूमने पर ध्वनि',
      duration: 'अवधि', removeWinner: 'स्वतः हटाएं', removeWinnerDesc: 'जीतने पर हटाएं',
      theme: 'थीम', language: 'भाषा', info: 'जानकारी',
    },
    themes: { blue: 'नीला', green: 'हरा', red: 'लाल', purple: 'बैंगनी', orange: 'नारंगी', rainbow: 'इंद्रधनुष' },
    winner: { congrats: 'बधाई हो', result: 'चयनित:' },
    history: { title: 'इतिहास', empty: 'अभी कोई परिणाम नहीं।', clear: 'साफ़ करें' },
    actions: { import: 'आयात', export: 'निर्यात', save: 'सहेजें' },
    alert: { clearConfirm: 'सभी प्रविष्टियां हटाएं?' },
    footer: { version: 'संस्करण 1.2.0', copyright: 'Roda Berputar' },
    developer: { title: 'डेवलपर', name: 'Febri Suryanto', role: 'Full Stack Web Developer', visitLabel: 'वेबसाइट' },
    infoContent: {
      aboutTitle: 'ऐप के बारे में', aboutDesc: 'यादृच्छिक ड्रा के लिए मुफ्त स्पिन व्हील टूल।',
      featuresTitle: 'विशेषताएं', featuresList: ['इंटरैक्टिव व्हील', 'विज्ञापन मुक्त', 'निष्पक्ष', 'आधुनिक डिजाइन'], changelogTitle: 'Changelog', changelogList: []
    }
  }
};
