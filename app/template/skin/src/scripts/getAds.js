/**
 * Created by xinxin on 2017/3/3.
 */
import { getVersion, createNativeAd, setNativeAdClickArea } from './localInterface'

const AD_ID = 'shop_more';

export function showAds(nativeAdContainer, adsenseContainer) {
  if (window.nativeAdsHandler) {
    getNativeAds(nativeAdContainer, () => {
      showAdsense(adsenseContainer);
    });
  } else {
    showAdsense(adsenseContainer);
  }
}

function getNativeAds(containerClass, fallback) {
  window.fbAdsCallback = window.fbAdsCallback ? window.fbAdsCallback : {};
  let compatible = getVersion() < 5840;
  let adId = AD_ID;
  let thisAdId = 'bridgeGetNativeAd_' + adId + new Date().getTime();
  window.fbAdsCallback['bridgeGetNativeAd_' + adId] = data => {
    console.log(data);
    if (data.adStatus) {
      data.adRes.ad_id = thisAdId;
      data.adRes.coverImage.url = compatible ? decodeURI(data.adRes.coverImage.url) : (data.adRes.coverImage.url || '').replace(/ /g, '');
      if (data.adRes.icon) {
        data.adRes.icon.url = compatible ? decodeURI(data.adRes.icon.url) : (data.adRes.icon.url || '').replace(/ /g, '');
      }
      getAdData(document.getElementsByClassName(containerClass)[0], data.adRes);
    } else {
      fallback();
    }
  };
  createNativeAd(null, 'fbAdsCallback.bridgeGetNativeAd_' + adId, thisAdId);
}

function showAdsense(classname) {
  document.getElementsByClassName(classname)[0].style.display = 'block';
}

function getAdData(container, data) {
  let adObj = {
    itemActionType: 'FB_ADS',
    adId: data.ad_id,
    title: data.title,
    url: data.coverImage.url,
    buttonText: data.buttonText,
    icon: data.icon,
    body: data.body,
    rating: data.rating,
    ratingScale: data.ratingScale,
    needAdChoices: data.needAdChoices,
    goodsType: 'more',
  };
  renderBannerAd(container, adObj);
}

function renderBannerAd(container, itemData) {

  let adsclass = `oblong-${itemData.goodsType}-ads`;
  let ele = document.createElement('div');
  let adsIcon = itemData.icon.url ? `<div class="ads-icon"><img src=${itemData.icon.url} alt=""/></div>` : '';
  let adChoice = itemData.needAdChoices ? `<div class="ad-choices"></div>` : '';
  ele.className = adsclass;
  let eleStr = `
			<div class="ads-bd"><img src=${itemData.url} /></div>
			<div class="ads-label"></div>
			${adChoice}
			<div class="ads-header">
				${adsIcon}
				<h2 class="ads-txt"><span>${itemData.title}</span></h2>
				<div class="button-container">
					<span class="ads-btn">${itemData.buttonText}</span>
				</div>
			</div>
			<div class="ad-footer">
				<span>${cutString(itemData.body, 90)}</span>
				<span> </span>
			</div>`;

  ele.innerHTML = eleStr;


  container.appendChild(ele);
  listenAndInitCensor(ele, itemData.adId)

}

function listenAndInitCensor(ele, adId) {
  setClickArea(ele, adId);
  window.addEventListener('scroll', () => {
    setClickArea(ele, adId)
  }, false);
}


function setClickArea(ele, adId) {
  var rect = ele.getBoundingClientRect();
  var x = rect.left;
  var y = rect.top;
  var w = ele.offsetWidth;
  var h = ele.offsetHeight;
  setNativeAdClickArea(adId, x, y, w, h);
}


function cutString(str, len) {
  //length属性读出来的汉字长度为1
  if (str.length * 2 <= len) {
    return str;
  }
  var strlen = 0;
  var s = "";
  for (var i = 0; i < str.length; i++) {
    s = s + str.charAt(i);
    if (str.charCodeAt(i) > 128) {
      strlen = strlen + 2;
      if (strlen >= len) {
        return s.substring(0, s.length - 1) + "...";
      }
    } else {
      strlen = strlen + 1;
      if (strlen >= len) {
        return s.substring(0, s.length - 2) + "...";
      }
    }
  }
  return s;
}