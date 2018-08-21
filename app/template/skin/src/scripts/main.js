import { tpa, TPC } from '../../../common/es6Module/tpa';
import Share from '../../../common/es6Module/share';
import remAdjust from '../../../common/es6Module/rem-adjust';
import ga from '../../../common/es6Module/ga';
import {
  openUrlOutside,
  getVersion,
  jumpToStore,
  isVIP
} from './localInterface';
import {
  recordLocale,
  locale,
  translateMap,
  urlMap,
  keyboardPkgName,
  upgradeVersion,
} from './constValue';
let from = getQueryString('from');
tpa.init(location.href, from, 'test-goldenrose');
ga('send', 'pageview', {
  'page': 'test-goldenrose'
});
remAdjust(16, 360);
let version = getVersion();

function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return "";
  }
}

let { tpaEvent, tpaFrom, tpaDesc, tpaTarget } = TPC;
tpa.send(tpaEvent.OPEN, `${recordLocale}`, `${keyboardPkgName}_${version}`);


let shareBtn = document.getElementsByClassName('btn-share')[0];
let moreBtn = document.getElementsByClassName('btn-more')[0];
let updateBtn = document.getElementsByClassName('btn-update')[0];
let isDowload = false;

function initEvents() {
  document.body.addEventListener('click', function(event) {
    let e = event || window.event;
    let target = e.target;
    let id = target.getAttribute('data-id');
    if (id) {
      if (id.indexOf('keyboard') !== -1) {
        tpa.send(tpaEvent.CLICK, `${tpaDesc.GET_THEME}_${id}`, recordLocale);
      } else {
        tpa.send(tpaEvent.CLICK, `${tpaDesc.GET_EMOJI}_${id}`, recordLocale);
      }
      openUrlOutside(urlMap[id]);
    }
  })

  shareBtn.addEventListener('click', function() {
    let reg = /^(.*)index.*\.html(.*)$/.exec(window.location.href);
    let shareUrl = reg[1] + 'index_' + locale + '.html?from=share';
    let shareData = {
      title: translateMap.title[locale],
      dlgTitle: translateMap.title[locale],
      msg: translateMap.shareText[locale],
      url: shareUrl
    };
    tpa.send(tpaEvent.CLICK, tpaDesc.SHARE, recordLocale);

    new Share(shareData).doShare('facebook', false);
  });

  moreBtn.addEventListener('click', function() {
    tpa.send(tpaEvent.CLICK, tpaDesc.MORE, recordLocale);
    jumpToStore(keyboardPkgName);
  });

  updateBtn.addEventListener('click', function() {
    if (isDowload) {
      tpa.send(tpaEvent.CLICK, tpaDesc.UPDATE, recordLocale);
    } else {
      tpa.send(tpaEvent.CLICK, tpaDesc.DOWNLOAD, recordLocale);
    }
    openUrlOutside(urlMap[keyboardPkgName]);
  });

  window.onload = function() {
    tpa.send(tpaEvent.PAGEVIEW, `${recordLocale}`, `${keyboardPkgName}_${version}`);
  };
  let imgs = document.getElementsByTagName('img');
  imgs[imgs.length - 1].onload = function() {
    tpa.send(tpaEvent.PRODUCT_LOADED, `${recordLocale}`, `${keyboardPkgName}_${version}`);
  }
}

function initPage() {
  const appVersion = getVersion();
  if (appVersion < upgradeVersion) {
    updateBtn.style.display = 'inline-block';
    moreBtn.style.display = 'none';
  }
  shareBtn.innerHTML = translateMap.shareBtn[locale];
  if (window.tpHandler) {
    updateBtn.innerHTML = translateMap.updateBtn[locale];
  } else {
    updateBtn.innerHTML = translateMap.downloadBtn[locale];
    isDowload = true;
  }
  moreBtn.innerHTML = translateMap.moreBtn[locale];
  document.getElementsByTagName('title')[0].innerHTML = translateMap.title[locale]; // 不用document.title防止被转义

  initEvents();
}

initPage();