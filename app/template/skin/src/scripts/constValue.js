import getLocalMethod from '../../../common/es6Module/getLocalMethod';
import { getPkgName, getVersion } from './localInterface';

/**
 * 多语言需要的locale
 * @param supportLanguages
 * @returns {boolean|*|string|string}
 */
function getLocale(supportLanguages) {
  let locale = window.navigator.language.toLowerCase();
  if (supportLanguages.some(lang => lang === locale)) {
    return locale;
  } else {
    locale = locale.slice(0, 2);
    return (supportLanguages.some(lang => lang === locale) && locale) || 'en';
  }
}

/**
 * 数据点需要的locale
 * @returns {*}
 */
function getRecordLocale() {
  var lan = window.navigator.language.toLowerCase();
  if (
    lan === 'en-us' ||
    lan === 'es-us' ||
    lan === 'es-es' ||
    lan === 'zh-tw' ||
    lan === 'en-in' ||
    lan === 'en-ph' ||
    lan === 'zh-cn'
  ) {
    return lan;
  } else if (
    lan.indexOf('fr') === 0 ||
    lan.indexOf('pt') === 0 ||
    lan.indexOf('it') === 0 ||
    lan.indexOf('ru') === 0 ||
    lan.indexOf('de') === 0 ||
    lan.indexOf('th') === 0 ||
    lan.indexOf('id') === 0
  ) {
    return lan.slice(0, 2);
  } else {
    return 'en-others';
  }
}

export const CDN_TEST_ADDRESS = {
  aws: 'http://fun.touchpal.com', //亚马逊
  aliyun: 'http://fun-aliyun.touchpal.com', //阿里云
  gochina: 'http://fun-gochina.touchpal.com', //东方嘉禾
  qiqiu: 'http://fun-qiqiu.touchpal.com', //qiqiu
  highwinds: 'http://fun-highwinds.touchpal.com',
};
export const CDN_TEST_NAME = ['aws', 'aliyun', 'gochina', 'qiqiu', 'highwinds'];
const supportLanguages = [
  'zh-cn',
  'zh',
  'en',
  'de',
  'es',
  'it',
  'fr',
  'pt',
  'ru',
  'th',
  'id',
];

export const locale = getLocale(supportLanguages);
export const recordLocale = getRecordLocale();
export const keyboardPkgName = getPkgName();
export const isInApp = window.CTKJavaScriptHandler ? true : false;
export const appVersion = getVersion();
export const upgradeVersion = 6000; // 推送版本号,基于该版本号显示不同按钮

export const translateMap = {
  moreBtn: {
    zh: '更多',
    'zh-cn': '更多',
    en: 'More',
    de: 'More',
    es: 'Más',
    it: 'Altri',
    fr: 'Plus',
    pt: 'Mais',
    ru: 'Больше',
    th: 'มากกว่า',
    id: 'Lebih Banyak',
  },
  updateBtn: {
    zh: '升級',
    'zh-cn': '升级',
    en: 'Upgrade',
    de: 'Upgrade',
    es: 'Actualizar',
    it: 'Upgrade',
    fr: 'Mettre à jour',
    pt: 'Atualizar',
    ru: 'Обновить',
    th: 'อัปเกรด',
    id: 'Tingkatkan',
  },
  downloadBtn: {
    zh: '下載',
    'zh-cn': '下载',
    en: 'Download',
    de: 'Download',
    es: 'Descargar',
    it: 'Scarica',
    fr: 'Télécharger',
    pt: 'Baixar',
    ru: 'Скачайте',
    th: 'ดาวน์โหลดฟรี',
    id: 'Unduh',
  },
  shareBtn: {
    zh: '分享',
    'zh-cn': '分享',
    en: 'Share',
    de: 'Teilen',
    es: 'Compartir',
    it: 'Condividi',
    fr: 'Partager',
    pt: 'Compartilhar',
    ru: 'Поделиться',
    th: 'แชร์',
    id: 'Bagikan',
  },
  title: {
    "en": "Do you like golden roses?",
    "es": "¿Te gustan las rosas doradas?",
    "pt": "Você gosta de rosas douradas?",
    "fr": "Vous aimez le rose d'or ?",
    "de": "Magst du goldene Rosen?",
    "id": "Apakah Anda menyukai mawar emas?",
    "th": "คุณชอบกุหลาบทองคำหรือไม่?",
    "it": "Ti piacciono le rose dorate?",
    "ru": "Нравятся золотые розы?",
    "zh": "您喜歡金色玫瑰嗎？",
    "zh-cn": "您喜欢金色玫瑰吗？"
  },
  shareText: {
    "en": "Do you like golden roses? Click to get this golden rose keyboard!",
    "es": "¿Te gustan las rosas doradas? ¡Haz clic para obtener este teclado de rosas doradas!",
    "pt": "Você gosta de rosas douradas? Clique para obter este teclado de rosa dourada!",
    "fr": "Vous aimez le rose d'or ? Cliquez pour obtenir ce clavier rose d'or !",
    "de": "Magst du goldene Rosen? Klicke hier, um diese Tastatur mit goldenen Rosen zu erhalten!",
    "id": "Apakah Anda menyukai mawar emas? Klik untuk mendapatkan papan tombol mawar emas ini!",
    "th": "คุณชอบกุหลาบทองคำหรือไม่? คลิกเพื่อรับคีย์บอร์ดกุหลาบทองคำนี้!",
    "it": "Ti piacciono le rose dorate? Clicca per ottenere questa tastiera con tema di rose dorate!",
    "ru": "Нравятся золотые розы? Нажмите, чтобы получить клавиатуру с золотыми розами!",
    "zh": "您喜歡金色玫瑰嗎？ 這有一朵金色玫瑰在等待您呢！",
    "zh-cn": "您喜欢金色玫瑰吗？ 这有一朵金色玫瑰在等待您呢！"
  },
};

const utmSource = 'goldenrose_h5_Theme';
const packs = ['keyboard_theme_golden_rose'];

let UrlMap = {
  basicUrlMap: {
    'com.cootek.smartinputv5': `details?id=com.cootek.smartinputv5&referrer=utm_source%3D${utmSource}%26utm_campaign%3DBigBrother`,
    'com.emoji.keyboard.touchpal': `details?id=com.emoji.keyboard.touchpal&referrer=utm_source%3D${utmSource}%26utm_campaign%3D2ndBrother`,
    'com.cootek.smartinputv5.freeoem': `details?id=com.cootek.smartinputv5.freeoem&referrer=utm_source%3D${utmSource}%26utm_campaign%3D3rdBrother`,
    'com.cootek.smartinputv5.oem': `details?id=com.cootek.smartinputv5.oem&referrer=utm_source%3D${utmSource}%26utm_campaign%3D4thBrother`,
  },
  generateUrlMap: function(packs) {
    let packName;
    let arr;
    packs.forEach(pack => {
      arr = pack.split('_');
      let isSticker = false;
      for (let i = 0; i < arr.length; i++) {
        arr[i] === 'sticker' && (isSticker = true);
        if (
          arr[i] === 'keyboard' ||
          arr[i] === 'sticker' ||
          arr[i] === 'theme'
        ) {
          arr.splice(i, 1);
          i--;
        }
      }
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i]
          .toLowerCase()
          .replace(/(^)[a-z]/g, L => L.toUpperCase());
      }
      packName = arr.join('');
      if (isSticker) {
        this.basicUrlMap[
          pack
        ] = `details?id=com.cootek.smartinputv5.sticker.${pack}&referrer=utm_source%3D${utmSource}%26utm_campaign%3D${packName}`;
      } else {
        this.basicUrlMap[
          pack
        ] = `details?id=com.cootek.smartinputv5.skin.${pack}&referrer=utm_source%3D${utmSource}%26utm_campaign%3D${packName}`;
      }
    });
    return this.basicUrlMap;
  },
};

export const urlMap = UrlMap.generateUrlMap(packs);
