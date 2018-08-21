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
const supportLanguages = ['en'];

export const locale = getLocale(supportLanguages);
export const recordLocale = getRecordLocale();
export const keyboardPkgName = getPkgName();
export const isInApp = window.CTKJavaScriptHandler ? true : false;
export const appVersion = getVersion();
export const upgradeVersion = 6000; // 推送版本号,基于该版本号显示不同按钮

export const translateMap = {
  downloadBtn: {
    en: 'FREE Download',
  },
  title1: {
    en: 'Step Tracker',
  },
  title2: {
    en: 'Personalized Pedometer',
  },
  subtitle: {
    en: 'Walk to Lose weight!<br/>Set goal, get achievement and level up.',
  },
  subtitle2: {
    en: 'Every step counts',
  },
  title: {
    en: 'Step Tracker - Step Counter & walking tracker app',
  },
  shareText: {
    en: 'Walk to Lose weight! Set goal, get achievement and level up.',
  },
};

function _getQuery(name) {
  let result = null;
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    result = decodeURI(r[2]);
  }
  return result === null ? '' : decodeURIComponent(result);
}

export const step_user_id = _getQuery('step_user_id') || '';
export const step_fb_id = _getQuery('step_fb_id') || '';
export const te = decodeURIComponent(_getQuery('te') || '');
