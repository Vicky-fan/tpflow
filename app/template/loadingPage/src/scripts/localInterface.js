/**
 * Created by Y2X on 16/7/22.
 */
import getLocalMethod from '../../../common/es6Module/getLocalMethod';
import query from '../../../common/es6Module/Param';


export function NativeLocalStorage() {
  if (window.CTKNativeLocalStorage) {
    return {
      put(key, value) {
        return window.CTKNativeLocalStorage.put(key, JSON.stringify(value));
      },
      get(key) {
        if (window.CTKNativeLocalStorage.get(key)) {
          return JSON.parse(window.CTKNativeLocalStorage.get(key));
        } else {
          return false;
        }
      },
      remove(key) {
        return window.CTKNativeLocalStorage.remove(key);
      },
      save() {
        return window.CTKNativeLocalStorage.save();
      },
      load() {
        return window.CTKNativeLocalStorage.load();
      },
    }
  } else {
    return {
      put(key, value) {
        return window.localStorage.setItem(key, JSON.stringify(value));
      },
      get(key) {
        return window.localStorage.getItem(key);
      },
      remove(key) {
        return window.localStorage.removeItem(key);
      },
      save() {
        return true;
      },
      load() {
        return true;
      },
    }
  }
}
export function getVersion() {
  return parseInt(getLocalMethod('tpInfo', 'getImeVersionOld', function() {
    return 0;
  }));
}
export function openUrlOutside(pkgUri) {
  var url = 'https://play.google.com/store/apps/' + pkgUri;
  var marketUrl = 'market://' + pkgUri;
  console.log()
  if (hasGooglePlay() && marketUrl) {
    launchGooglePlayWithPkg(marketUrl);
  } else {
    getLocalMethod('CTKJavaScriptHandler', 'launchLocalApp', function(a, b, url) {
      window.location.href = url;
    }, null, 'android.intent.action.VIEW', url, null, false)
  }
}
export function jumpToStore(keyboardPkgName) {
  window.CTKJavaScriptHandler.launchLocalApp(
    keyboardPkgName,
    keyboardPkgName + '.INTERNAL_ACTION.LOCAL_PAGE_SHOP_SKIN',
    '',
    "",
    false);
  window.CTKJavaScriptHandler.launchLocalApp(
    keyboardPkgName,
    keyboardPkgName + '.LOCAL_PAGE_SHOP_SKIN',
    '',
    "",
    false);
}
export function getPkgName() {
  const pkgName = query('packageName');
  return pkgName || _getPkgName();
}

export function isVIP() {
  return window.tpHandler && window.tpHandler.isVIP && window.tpHandler.isVIP();
}

function _getPkgName() {
  return getLocalMethod('CTKJavaScriptHandler', 'getPackageName', function() {
    let appId = getAppId();
    let pkgNameMap = {
      'cootek.smartinput.international.android.public': 'com.cootek.smartinputv5',
      'cootek.smartinput.international.android.public.1505': 'com.emoji.keyboard.touchpal',
      'cootek.smartinput.international.android.publicthird.1505': 'com.cootek.smartinputv5.freeoem',
      'cootek.smartinput.international.android.public.oem.1507': 'com.cootek.smartinputv5.oem'
    };
    return pkgNameMap[appId] || 'com.cootek.smartinputv5';
  }.bind(this));
}

function getAppId() {
  return getLocalMethod('tpHandler', 'getAppId', function() {
    return 'cootek.smartinput.international.android.public';
  });
}

function launchGooglePlayWithPkg(url) {
  getLocalMethod('CTKJavaScriptHandler', 'launchLocalApp', null, 'com.android.vending', 'android.intent.action.VIEW', url, "", false);
}

function hasGooglePlay() {
  return getLocalMethod('CTKJavaScriptHandler', 'isInstalled', null, 'com.android.vending', null);
}


//包含INTERNAL_ACTION的intent需要拼接包名
export function launchIntent(intent) {
  let pkgName = this.getPkgName();
  let intentStr = intent;
  if (intent.indexOf('INTERNAL_ACTION') !== -1) {
    intentStr = `${pkgName}.${intent}`;
  }
  console.log(intentStr);
  getLocalMethod('CTKJavaScriptHandler', 'launchLocalApp', null, pkgName, intentStr, null, "", false);
}


export function createNativeAd(adUnitsId = null, callback = null, adId = null) {
  return getLocalMethod('nativeAdsHandler', 'createNativeAd', null, adUnitsId, callback, adId);
}

export function setNativeAdClickArea(id, x, y, w, h) {
  return getLocalMethod('nativeAdsHandler', 'setNativeAdClickArea', null, id, x, y, w, h);
}