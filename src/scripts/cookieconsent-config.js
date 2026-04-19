/**
 * Cookie Consent Configuration for GTM Integration
 * Integrates vanilla-cookieconsent with Google Tag Manager consent mode
 */

import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

// Category constants
const CAT_NECESSARY = 'necessary';
const CAT_ANALYTICS = 'analytics';
const CAT_ADVERTISEMENT = 'advertisement';
const CAT_FUNCTIONALITY = 'functionality';
const CAT_PERSONALIZATION = 'personalization';

// Service constants (Google Consent Mode)
const SERVICE_AD_STORAGE = 'ad_storage';
const SERVICE_AD_USER_DATA = 'ad_user_data';
const SERVICE_AD_PERSONALIZATION = 'ad_personalization';
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage';
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage';
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage';
const SERVICE_SECURITY_STORAGE = 'security_storage';

/**
 * Update gtag consent based on user choices
 * Note: window.gtag is defined in Layout.astro before GTM loads
 */
function updateGtagConsent() {
  // Safety check - gtag should already be defined by Layout.astro
  if (!window.gtag) {
    console.warn('gtag not defined - consent update skipped');
    return;
  }

  window.gtag('consent', 'update', {
    [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedCategory(CAT_ANALYTICS) ? 'granted' : 'denied',
    [SERVICE_AD_STORAGE]: CookieConsent.acceptedCategory(CAT_ADVERTISEMENT) ? 'granted' : 'denied',
    [SERVICE_AD_USER_DATA]: CookieConsent.acceptedCategory(CAT_ADVERTISEMENT) ? 'granted' : 'denied',
    [SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedCategory(CAT_ADVERTISEMENT) ? 'granted' : 'denied',
    [SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedCategory(CAT_FUNCTIONALITY) ? 'granted' : 'denied',
    [SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedCategory(CAT_PERSONALIZATION) ? 'granted' : 'denied',
    // security_storage 始终保持 denied（安全相关，不应依赖用户同意）
    [SERVICE_SECURITY_STORAGE]: 'denied',
  });
}

/**
 * Initialize Cookie Consent with GTM integration
 */
export function initCookieConsent(lang = 'en') {
  const isZh = lang === 'zh';
  
  CookieConsent.run({
    // Root element where the modal will be appended
    root: 'body',
    // Auto-show the consent modal if no consent is found
    autoShow: true,
    // Disable page scroll when modal is open
    disablePageInteraction: true,
    // Store consent in localStorage
    mode: 'opt-in',
    
    // GUI Options
    guiOptions: {
      consentModal: {
        layout: 'cloud',
        position: 'bottom center',
        flipButtons: false,
        equalWeightButtons: true,
      },
      preferencesModal: {
        layout: 'box',
        position: 'right',
        flipButtons: false,
        equalWeightButtons: true,
      },
    },
    
    // Categories configuration
    categories: {
      [CAT_NECESSARY]: {
        enabled: true,  // Always enabled
        readOnly: true, // Cannot be disabled
      },
      [CAT_ANALYTICS]: {
        enabled: false,
        readOnly: false,
        autoClear: {
          cookies: [
            { name: /^_ga/ },  // Google Analytics cookies
            { name: '_gid' },
            { name: /^_utm/ },
          ],
        },
      },
      [CAT_ADVERTISEMENT]: {
        enabled: false,
        readOnly: false,
      },
      // Future-ready categories (disabled by default, enable when needed)
      [CAT_FUNCTIONALITY]: {
        enabled: false,
        readOnly: false,
      },
      [CAT_PERSONALIZATION]: {
        enabled: false,
        readOnly: false,
      },
    },
    
    // Language configuration
    language: {
      default: lang,
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies',
            description: 'We use cookies to ensure you get the best experience on our website. Some cookies are necessary for the website to function and cannot be disabled.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
            footer: '<a href="/about">Privacy Policy</a>',
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            closeIconLabel: 'Close',
            serviceCounterLabel: 'Service',
            sections: [
              {
                title: 'Necessary cookies',
                description: 'These cookies are essential for the website to function properly.',
                linkedCategory: CAT_NECESSARY,
              },
              {
                title: 'Analytics cookies',
                description: 'These cookies help us understand how visitors interact with our website.',
                linkedCategory: CAT_ANALYTICS,
              },
              {
                title: 'Advertising cookies',
                description: 'These cookies are used to deliver relevant advertisements.',
                linkedCategory: CAT_ADVERTISEMENT,
              },
              {
                title: 'Functional cookies',
                description: 'These cookies enable enhanced functionality and personalization.',
                linkedCategory: CAT_FUNCTIONALITY,
              },
              {
                title: 'Personalization cookies',
                description: 'These cookies remember your preferences and settings.',
                linkedCategory: CAT_PERSONALIZATION,
              },
            ],
          },
        },
        zh: {
          consentModal: {
            title: '我们使用 Cookie',
            description: '我们使用 Cookie 以确保您在我们的网站上获得最佳体验。某些 Cookie 对于网站正常运行是必要的，无法禁用。',
            acceptAllBtn: '接受所有',
            acceptNecessaryBtn: '拒绝所有',
            showPreferencesBtn: '管理偏好',
            footer: '<a href="/zh/about">隐私政策</a>',
          },
          preferencesModal: {
            title: 'Cookie 偏好设置',
            acceptAllBtn: '接受所有',
            acceptNecessaryBtn: '拒绝所有',
            savePreferencesBtn: '保存偏好',
            closeIconLabel: '关闭',
            serviceCounterLabel: '服务',
            sections: [
              {
                title: '必要的 Cookie',
                description: '这些 Cookie 对于网站正常运行是必不可少的。',
                linkedCategory: CAT_NECESSARY,
              },
              {
                title: '分析 Cookie',
                description: '这些 Cookie 帮助我们了解访问者如何与我们的网站互动。',
                linkedCategory: CAT_ANALYTICS,
              },
              {
                title: '广告 Cookie',
                description: '这些 Cookie 用于提供相关广告。',
                linkedCategory: CAT_ADVERTISEMENT,
              },
              {
                title: '功能 Cookie',
                description: '这些 Cookie 提供增强功能和个性化体验。',
                linkedCategory: CAT_FUNCTIONALITY,
              },
              {
                title: '个性化 Cookie',
                description: '这些 Cookie 记住您的偏好和设置。',
                linkedCategory: CAT_PERSONALIZATION,
              },
            ],
          },
        },
      },
    },
    
    // Callbacks for GTM consent mode integration
    onFirstConsent: () => {
      updateGtagConsent();
    },
    onConsent: () => {
      updateGtagConsent();
    },
    onChange: () => {
      updateGtagConsent();
    },
  });
}

// Export for use in Astro components
export default initCookieConsent;