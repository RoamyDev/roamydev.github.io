export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.docs': 'Docs',
    'footer.copyright': '© 2026 Kanata Labs LLC. All rights reserved.',
    'lang.en': 'English',
    'lang.zh': '中文',
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.blog': '博客',
    'nav.docs': '文档',
    'footer.copyright': '© 2026 Kanata Labs LLC. 保留所有权利。',
    'lang.en': 'English',
    'lang.zh': '中文',
  },
} as const;

export type UILanguage = keyof typeof ui;
export type UIKey = keyof typeof ui.en;
