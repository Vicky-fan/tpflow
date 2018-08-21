import { tpa, TPC } from '../../../common/es6Module/tpa';
import remAdjust from './rem-adjust';
import ga from '../../../common/es6Module/ga';
import { openUrlOutside, getVersion } from './localInterface';

import { recordLocale, locale, translateMap, keyboardPkgName, step_fb_id, step_user_id, te } from './constValue';
ga('send', 'pageview', {
  page: 'test-stepTracker',
});
remAdjust(16, 360);
let from = getQueryString('from');
let version = getVersion();

function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return '';
  }
}

let { tpaEvent, tpaFrom, tpaDesc, tpaTarget } = TPC;
tpa.init(location.href, from, 'test-stepTracker', te);
tpa.send(tpaEvent.OPEN, `${recordLocale}`, `${keyboardPkgName}_${version}`);
let url =
  (te
    ? 'details?id=step.tracker.stepcounter.walking&referrer=utm_source%3Dshare%26utm_campaign%3Dmeabtesta%26utm_medium%3Dstep%26utm_type%3Dops'
    : 'details?id=step.tracker.stepcounter.walking&referrer=utm_source%3Dshare%26utm_campaign%3Dstepshare%26utm_medium%3Dstep%26utm_type%3Dops') +
  `%26step_fb_id%3D${step_fb_id}%26step_user_id%3D${step_user_id}`;

// let title1 = document.getElementsByClassName('title-1')[0];
let title2 = document.getElementsByClassName('title-2')[0];
let subtitle1 = document.getElementsByClassName('subtitle-1')[0];
let subtitle2 = document.getElementsByClassName('subtitle-2')[0];
let downloadBtn = document.getElementsByClassName('btn-download')[0];

initPage();

function initEvents() {
  document.body.addEventListener('click', () => {
    tpa.send(tpaEvent.CLICK, tpaDesc.DOWNLOAD, recordLocale);
    openUrlOutside(url);
  });

  window.onload = function() {
    tpa.send(tpaEvent.PAGEVIEW, `${recordLocale}`, `${keyboardPkgName}_${version}`);
  };
}

function initPage() {
  const locale = 'en';

  document.title = translateMap.title[locale];
  // title1.innerHTML = translateMap.title1[locale];
  title2.innerHTML = translateMap.title2[locale];

  subtitle1.innerHTML = translateMap.subtitle[locale];
  subtitle2.innerHTML = translateMap.subtitle2[locale];
  downloadBtn.innerHTML = translateMap.downloadBtn[locale];
  initEvents();
}
