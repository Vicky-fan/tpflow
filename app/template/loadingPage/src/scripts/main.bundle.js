/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonEs6ModuleTpa = __webpack_require__(1);
	
	var _remAdjust = __webpack_require__(3);
	
	var _remAdjust2 = _interopRequireDefault(_remAdjust);
	
	var _commonEs6ModuleGa = __webpack_require__(4);
	
	var _commonEs6ModuleGa2 = _interopRequireDefault(_commonEs6ModuleGa);
	
	var _localInterface = __webpack_require__(5);
	
	var _constValue = __webpack_require__(8);
	
	(0, _commonEs6ModuleGa2['default'])('send', 'pageview', {
	  page: 'test-stepTracker'
	});
	(0, _remAdjust2['default'])(16, 360);
	var from = getQueryString('from');
	var version = (0, _localInterface.getVersion)();
	
	function getQueryString(name) {
	  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null) {
	    return unescape(r[2]);
	  } else {
	    return '';
	  }
	}
	
	var tpaEvent = _commonEs6ModuleTpa.TPC.tpaEvent;
	var tpaFrom = _commonEs6ModuleTpa.TPC.tpaFrom;
	var tpaDesc = _commonEs6ModuleTpa.TPC.tpaDesc;
	var tpaTarget = _commonEs6ModuleTpa.TPC.tpaTarget;
	
	_commonEs6ModuleTpa.tpa.init(location.href, from, 'test-stepTracker', _constValue.te);
	_commonEs6ModuleTpa.tpa.send(tpaEvent.OPEN, '' + _constValue.recordLocale, _constValue.keyboardPkgName + '_' + version);
	var url = (_constValue.te ? 'details?id=step.tracker.stepcounter.walking&referrer=utm_source%3Dshare%26utm_campaign%3Dmeabtesta%26utm_medium%3Dstep%26utm_type%3Dops' : 'details?id=step.tracker.stepcounter.walking&referrer=utm_source%3Dshare%26utm_campaign%3Dstepshare%26utm_medium%3Dstep%26utm_type%3Dops') + ('%26step_fb_id%3D' + _constValue.step_fb_id + '%26step_user_id%3D' + _constValue.step_user_id);
	
	// let title1 = document.getElementsByClassName('title-1')[0];
	var title2 = document.getElementsByClassName('title-2')[0];
	var subtitle1 = document.getElementsByClassName('subtitle-1')[0];
	var subtitle2 = document.getElementsByClassName('subtitle-2')[0];
	var downloadBtn = document.getElementsByClassName('btn-download')[0];
	
	initPage();
	
	function initEvents() {
	  document.body.addEventListener('click', function () {
	    _commonEs6ModuleTpa.tpa.send(tpaEvent.CLICK, tpaDesc.DOWNLOAD, _constValue.recordLocale);
	    (0, _localInterface.openUrlOutside)(url);
	  });
	
	  window.onload = function () {
	    _commonEs6ModuleTpa.tpa.send(tpaEvent.PAGEVIEW, '' + _constValue.recordLocale, _constValue.keyboardPkgName + '_' + version);
	  };
	}
	
	function initPage() {
	  var locale = 'en';
	
	  document.title = _constValue.translateMap.title[locale];
	  // title1.innerHTML = translateMap.title1[locale];
	  title2.innerHTML = _constValue.translateMap.title2[locale];
	
	  subtitle1.innerHTML = _constValue.translateMap.subtitle[locale];
	  subtitle2.innerHTML = _constValue.translateMap.subtitle2[locale];
	  downloadBtn.innerHTML = _constValue.translateMap.downloadBtn[locale];
	  initEvents();
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _TXMajaxJs = __webpack_require__(2);
	
	var _TXMajaxJs2 = _interopRequireDefault(_TXMajaxJs);
	
	var uuid = function uuid() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0,
	        v = c == 'x' ? r : r & 0x3 | 0x8;
	    return v.toString(16);
	  });
	};
	var getUUID = function getUUID() {
	  if (window.localStorage) {
	    if (localStorage.getItem('TouchQuizUUID')) {
	      return localStorage.getItem('TouchQuizUUID');
	    } else {
	      var userUUID = uuid();
	      localStorage.setItem('TouchQuizUUID', userUUID);
	      return userUUID;
	    }
	  } else {
	    return uuid();
	  }
	};
	var TPC = {
	  tpaEvent: {
	    PAGEVIEW: 'pageview',
	    CLICK: 'click',
	    SUB_PAGEVIEW: 'sub_pageview',
	    TIME: 'time',
	    OPEN: 'open',
	    PRODUCT_LOADED: 'product_loaded'
	  },
	  tpaFrom: {
	    SHARE: 'share',
	    HOME: 'home',
	    QUICK_PANEL: 'quickpanel',
	    TOOLBAR_ICON: 'toolbaricon',
	    TOOLBAR_MIDDLE: 'toolbarmiddle',
	    LUCKY_DRAW: 'luckydraw'
	  },
	  tpaDesc: {
	    DOWNLOAD: 'download_clicked',
	    UPDATE: 'get_touchpal',
	    MORE: 'more',
	    SHARE: 'share_to_fb',
	    GET_THEME: 'get', //theme自带keyboard
	    GET_EMOJI: 'get_emoji',
	    FILTER_AD: 'filter_ad'
	  },
	  tpaTarget: {}
	};
	exports.TPC = TPC;
	var tpa = {
	  uid: undefined,
	  linkFrom: undefined,
	  source: undefined,
	  page: undefined,
	  init: function init(page, linkFrom, source, te) {
	    this.page = page;
	    this.uid = getUUID();
	    this.linkFrom = linkFrom;
	    this.source = source;
	    this.te = te;
	  },
	  send: function send(event, desc) {
	    var url = 'http://usa.ime.cootek.com/statistic/game';
	    var d = new Date();
	    var month = d.getMonth() < 10 ? '0' + (d.getMonth() + 1).toString() : (d.getMonth() + 1).toString();
	    var day = d.getDate() < 10 ? '0' + d.getDate().toString() : d.getDate().toString();
	    var hour = d.getHours() < 10 ? '0' + d.getHours().toString() : d.getHours().toString();
	    var minute = d.getMinutes() < 10 ? '0' + d.getMinutes().toString() : d.getMinutes().toString();
	    var stamp = d.getFullYear().toString() + month + day + hour + minute;
	
	    var target = undefined;
	    var payload = undefined;
	
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }
	
	    if (args.length === 0) {
	      target = '';
	      payload = '';
	    } else if (args.length === 1) {
	      target = args[0];
	      payload = '';
	    } else {
	      target = args[0];
	      payload = args[1];
	    }
	    var te = args[2] || '';
	    new _TXMajaxJs2['default']().send({
	      type: 'post',
	      url: url,
	      timeout: 100 * 1000,
	      dataType: 'json',
	      postData: JSON.stringify({
	        page: this.page,
	        uid: this.uid,
	        event: event,
	        timestamp: stamp,
	        from: this.linkFrom,
	        payload: payload,
	        te: this.te,
	        attribute: { source: this.source, desc: desc, target: target }
	      }),
	      success: function success(res) {
	        if (res.error_code == 1000) {
	          console.log('post data failed');
	        } else {
	          console.log('post data succeed');
	        }
	      },
	      error: function error() {}
	    });
	  }
	};
	exports.tpa = tpa;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/*
	
	 (new AjaxRequest()).send({
	 type: 'GET',
	 url: _url,
	 timeout: 10 * 1000,
	 dataType: 'json',
	 success: success_personal_query,
	 error: error_personal_query
	 });
	 */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AjaxRequest = (function () {
	  // Try the XMLHttpRequest object first
	
	  function AjaxRequest() {
	    _classCallCheck(this, AjaxRequest);
	
	    if (window.XMLHttpRequest) {
	      try {
	        this.request = new XMLHttpRequest();
	      } catch (e) {
	        this.request = null;
	      }
	      // Now try the ActiveX (IE) version
	    } else if (window.ActiveXObject) {
	        try {
	          this.request = new ActiveXObject("Msxml2.XMLHTTP");
	          // Try the older ActiveX object for older versions of IE
	        } catch (e) {
	          try {
	            this.request = new ActiveXObject("Microsoft.XMLHTTP");
	          } catch (e) {
	            this.request = null;
	          }
	        }
	      }
	    // If the request creation failed, notify the user
	    if (this.request == null) {
	      console.log("Ajax error creating the request.\n" + "Details: " + e);
	    }
	    this.timeout;
	    this.global = false;
	  }
	
	  _createClass(AjaxRequest, [{
	    key: "send",
	    value: function send(opt) {
	      var self = this;
	
	      if (self.request != null) {
	        // Kill the previous request
	        self.request.abort();
	        //set timeout
	        if (opt.timeout) {
	          self.timeout = setTimeout(function () {
	            self.request.abort();
	            opt.error(self.request, 'timeout');
	            clearTimeout(self.timeout);
	          }, opt.timeout);
	        }
	        //set asyn
	        opt.asyn = opt.asyn ? opt.asyn : true;
	        //set dataType
	        opt.dataType = opt.dataType ? opt.dataType : 'text';
	        //set global
	        self.global = opt.global ? opt.global : false;
	        //run sendBefore
	        if (self.global && typeof AjaxRequest.sendBefore == 'function') {
	          AjaxRequest.sendBefore({ type: 'ajaxSend' }, self.request, opt);
	        }
	        //run beforeSend
	        if (opt.beforeSend) {
	          opt.beforeSend();
	        }
	        try {
	          self.request.onreadystatechange = function () {
	            if (self.getReadyState() == 4) {
	              var _status = self.getStatus();
	              if (_status >= 200 && _status < 300 || _status == 304) {
	                clearTimeout(self.timeout);
	                switch (opt.dataType) {
	                  case 'text':
	                    opt.success(self.getResponseText(), _status);
	                    break;
	                  case 'xml':
	                    opt.success(self.getResponseXML(), _status);
	                    break;
	                  case 'json':
	                    try {
	                      var responseText = self.getResponseText();
	                      if (responseText) {
	                        opt.success(JSON.parse(responseText), _status);
	                      } else {
	                        opt.success(null, _status);
	                      }
	                    } catch (e) {
	                      opt.success(null, _status);
	                      console.error(e);
	                    }
	                    break;
	                }
	                if (self.global && typeof AjaxRequest.sendSuccess == 'function') {
	                  AjaxRequest.sendSuccess({ type: 'ajaxSuccess' }, self.request, opt);
	                }
	              } else if (_status >= 400) {
	                clearTimeout(self.timeout);
	                switch (opt.dataType) {
	                  case 'text':
	                    opt.error(self.request, self.getStatus(), null, self.getResponseText());
	                    break;
	                  case 'xml':
	                    opt.error(self.request, self.getStatus(), null, self.getResponseXML());
	                    break;
	                  case 'json':
	                    try {
	                      var responseText = self.getResponseText();
	                      if (responseText) {
	                        opt.error(self.request, self.getStatus(), null, JSON.parse(self.getResponseText()));
	                      } else {
	                        opt.error(self.request, self.getStatus(), null, null);
	                      }
	                    } catch (e) {
	                      console.error(e);
	                      opt.error(self.request, self.getStatus(), null, null);
	                    }
	                    break;
	                  default:
	                    opt.error(self.request, self.getStatus(), null, self.getResponseText());
	                    break;
	                }
	              }
	            }
	          };
	          self.request.open(opt.type, opt.url, opt.asyn); // always asynchronous (true)
	          if (opt.type.toLowerCase() == "get") {
	            // Send a GET request; no data involved
	            self.request.send(null);
	          } else {
	            // Send a POST request; the last argument is data
	            opt.postDataType = opt.postDataType ? opt.postDataType : 'application/x-www-form-urlencoded';
	            self.request.setRequestHeader("Content-Type", opt.postDataType);
	            self.request.send(opt.postData);
	          }
	        } catch (e) {
	          clearTimeout(self.timeout);
	          switch (opt.dataType) {
	            case 'text':
	              opt.error(self.request, self.getStatus(), e, self.getResponseText());
	              break;
	            case 'xml':
	              opt.error(self.request, self.getStatus(), e, self.getResponseXML());
	              break;
	            case 'json':
	              opt.error(self.request, self.getStatus(), e, JSON.parse(self.getResponseText()));
	              break;
	            default:
	              opt.error(self.request, self.getStatus(), e, self.getResponseText());
	              break;
	          }
	
	          if (self.global && typeof AjaxRequest.sendError == 'function') {
	            AjaxRequest.sendError({ type: 'ajaxError' }, self.request, opt);
	          }
	          console.log("Ajax error communicating with the server.\n" + "Details: " + e);
	        }
	      }
	    }
	  }, {
	    key: "getReadyState",
	    value: function getReadyState() {
	      return this.request.readyState;
	    }
	  }, {
	    key: "getStatus",
	    value: function getStatus() {
	      return this.request.status;
	    }
	  }, {
	    key: "getResponseText",
	    value: function getResponseText() {
	      return this.request.responseText;
	    }
	  }, {
	    key: "getResponseXML",
	    value: function getResponseXML() {
	      return this.request.responseXML;
	    }
	  }, {
	    key: "sendBefore",
	    value: function sendBefore() {}
	  }, {
	    key: "sendSuccess",
	    value: function sendSuccess() {}
	  }, {
	    key: "sendError",
	    value: function sendError() {}
	  }]);
	
	  return AjaxRequest;
	})();
	
	exports["default"] = AjaxRequest;
	module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = function (defaultFontSize, defaultScreenWidth) {
	  var htmlNode = document.getElementsByTagName('html')[0];
	
	  function resize() {
	    var screenWidth = document.body.offsetWidth;
	    if (screenWidth <= 700) {
	      htmlNode.style.fontSize = screenWidth / defaultScreenWidth * defaultFontSize + 'px';
	    } else {
	      htmlNode.style.fontSize = 700 / defaultScreenWidth * defaultFontSize + 'px';
	    }
	  }
	  document.addEventListener('DOMContentLoaded', function () {
	    resize();
	  });
	  window.addEventListener('resize', resize);
	};
	
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	window.GoogleAnalyticsObject = "ga";
	window.ga = function () {
		(window.ga.q = window.ga.q || []).push(arguments);
	};
	window.ga.l = 1 * new Date();
	
	if (window.location.host.indexOf('cootekservice') > 0) {
		ga('create', 'UA-44448382-2', 'cootekservice.com');
	} else {
		ga('create', 'UA-44448382-3', 'cootek.com');
	}
	window.ga("send", "pageview");
	
	exports['default'] = function () {
		window.ga.apply(this, arguments);
	};
	
	;
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Y2X on 16/7/22.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.NativeLocalStorage = NativeLocalStorage;
	exports.getVersion = getVersion;
	exports.openUrlOutside = openUrlOutside;
	exports.jumpToStore = jumpToStore;
	exports.getPkgName = getPkgName;
	exports.isVIP = isVIP;
	exports.launchIntent = launchIntent;
	exports.createNativeAd = createNativeAd;
	exports.setNativeAdClickArea = setNativeAdClickArea;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonEs6ModuleGetLocalMethod = __webpack_require__(6);
	
	var _commonEs6ModuleGetLocalMethod2 = _interopRequireDefault(_commonEs6ModuleGetLocalMethod);
	
	var _commonEs6ModuleParam = __webpack_require__(7);
	
	var _commonEs6ModuleParam2 = _interopRequireDefault(_commonEs6ModuleParam);
	
	function NativeLocalStorage() {
	  if (window.CTKNativeLocalStorage) {
	    return {
	      put: function put(key, value) {
	        return window.CTKNativeLocalStorage.put(key, JSON.stringify(value));
	      },
	      get: function get(key) {
	        if (window.CTKNativeLocalStorage.get(key)) {
	          return JSON.parse(window.CTKNativeLocalStorage.get(key));
	        } else {
	          return false;
	        }
	      },
	      remove: function remove(key) {
	        return window.CTKNativeLocalStorage.remove(key);
	      },
	      save: function save() {
	        return window.CTKNativeLocalStorage.save();
	      },
	      load: function load() {
	        return window.CTKNativeLocalStorage.load();
	      }
	    };
	  } else {
	    return {
	      put: function put(key, value) {
	        return window.localStorage.setItem(key, JSON.stringify(value));
	      },
	      get: function get(key) {
	        return window.localStorage.getItem(key);
	      },
	      remove: function remove(key) {
	        return window.localStorage.removeItem(key);
	      },
	      save: function save() {
	        return true;
	      },
	      load: function load() {
	        return true;
	      }
	    };
	  }
	}
	
	function getVersion() {
	  return parseInt((0, _commonEs6ModuleGetLocalMethod2['default'])('tpInfo', 'getImeVersionOld', function () {
	    return 0;
	  }));
	}
	
	function openUrlOutside(pkgUri) {
	  var url = 'https://play.google.com/store/apps/' + pkgUri;
	  var marketUrl = 'market://' + pkgUri;
	  console.log();
	  if (hasGooglePlay() && marketUrl) {
	    launchGooglePlayWithPkg(marketUrl);
	  } else {
	    (0, _commonEs6ModuleGetLocalMethod2['default'])('CTKJavaScriptHandler', 'launchLocalApp', function (a, b, url) {
	      window.location.href = url;
	    }, null, 'android.intent.action.VIEW', url, null, false);
	  }
	}
	
	function jumpToStore(keyboardPkgName) {
	  window.CTKJavaScriptHandler.launchLocalApp(keyboardPkgName, keyboardPkgName + '.INTERNAL_ACTION.LOCAL_PAGE_SHOP_SKIN', '', "", false);
	  window.CTKJavaScriptHandler.launchLocalApp(keyboardPkgName, keyboardPkgName + '.LOCAL_PAGE_SHOP_SKIN', '', "", false);
	}
	
	function getPkgName() {
	  var pkgName = (0, _commonEs6ModuleParam2['default'])('packageName');
	  return pkgName || _getPkgName();
	}
	
	function isVIP() {
	  return window.tpHandler && window.tpHandler.isVIP && window.tpHandler.isVIP();
	}
	
	function _getPkgName() {
	  return (0, _commonEs6ModuleGetLocalMethod2['default'])('CTKJavaScriptHandler', 'getPackageName', (function () {
	    var appId = getAppId();
	    var pkgNameMap = {
	      'cootek.smartinput.international.android.public': 'com.cootek.smartinputv5',
	      'cootek.smartinput.international.android.public.1505': 'com.emoji.keyboard.touchpal',
	      'cootek.smartinput.international.android.publicthird.1505': 'com.cootek.smartinputv5.freeoem',
	      'cootek.smartinput.international.android.public.oem.1507': 'com.cootek.smartinputv5.oem'
	    };
	    return pkgNameMap[appId] || 'com.cootek.smartinputv5';
	  }).bind(this));
	}
	
	function getAppId() {
	  return (0, _commonEs6ModuleGetLocalMethod2['default'])('tpHandler', 'getAppId', function () {
	    return 'cootek.smartinput.international.android.public';
	  });
	}
	
	function launchGooglePlayWithPkg(url) {
	  (0, _commonEs6ModuleGetLocalMethod2['default'])('CTKJavaScriptHandler', 'launchLocalApp', null, 'com.android.vending', 'android.intent.action.VIEW', url, "", false);
	}
	
	function hasGooglePlay() {
	  return (0, _commonEs6ModuleGetLocalMethod2['default'])('CTKJavaScriptHandler', 'isInstalled', null, 'com.android.vending', null);
	}
	
	//包含INTERNAL_ACTION的intent需要拼接包名
	
	function launchIntent(intent) {
	  var pkgName = this.getPkgName();
	  var intentStr = intent;
	  if (intent.indexOf('INTERNAL_ACTION') !== -1) {
	    intentStr = pkgName + '.' + intent;
	  }
	  console.log(intentStr);
	  (0, _commonEs6ModuleGetLocalMethod2['default'])('CTKJavaScriptHandler', 'launchLocalApp', null, pkgName, intentStr, null, "", false);
	}
	
	function createNativeAd() {
	  var adUnitsId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	  var adId = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  return (0, _commonEs6ModuleGetLocalMethod2['default'])('nativeAdsHandler', 'createNativeAd', null, adUnitsId, callback, adId);
	}
	
	function setNativeAdClickArea(id, x, y, w, h) {
	  return (0, _commonEs6ModuleGetLocalMethod2['default'])('nativeAdsHandler', 'setNativeAdClickArea', null, id, x, y, w, h);
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (handler, method, compatibleMethod) {
	    for (var _len = arguments.length, methodArguments = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	        methodArguments[_key - 3] = arguments[_key];
	    }
	
	    if (typeof window[handler] !== 'undefined' && typeof window[handler][method] !== 'undefined') {
	        var _window$handler;
	
	        return (_window$handler = window[handler])[method].apply(_window$handler, methodArguments);
	    } else if (typeof compatibleMethod === 'function') {
	        return compatibleMethod.apply(undefined, methodArguments) || 1;
	    } else {
	        return false;
	    }
	};
	
	module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	};
	
	module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _commonEs6ModuleGetLocalMethod = __webpack_require__(6);
	
	var _commonEs6ModuleGetLocalMethod2 = _interopRequireDefault(_commonEs6ModuleGetLocalMethod);
	
	var _localInterface = __webpack_require__(5);
	
	/**
	 * 多语言需要的locale
	 * @param supportLanguages
	 * @returns {boolean|*|string|string}
	 */
	function getLocale(supportLanguages) {
	  var locale = window.navigator.language.toLowerCase();
	  if (supportLanguages.some(function (lang) {
	    return lang === locale;
	  })) {
	    return locale;
	  } else {
	    locale = locale.slice(0, 2);
	    return supportLanguages.some(function (lang) {
	      return lang === locale;
	    }) && locale || 'en';
	  }
	}
	
	/**
	 * 数据点需要的locale
	 * @returns {*}
	 */
	function getRecordLocale() {
	  var lan = window.navigator.language.toLowerCase();
	  if (lan === 'en-us' || lan === 'es-us' || lan === 'es-es' || lan === 'zh-tw' || lan === 'en-in' || lan === 'en-ph' || lan === 'zh-cn') {
	    return lan;
	  } else if (lan.indexOf('fr') === 0 || lan.indexOf('pt') === 0 || lan.indexOf('it') === 0 || lan.indexOf('ru') === 0 || lan.indexOf('de') === 0 || lan.indexOf('th') === 0 || lan.indexOf('id') === 0) {
	    return lan.slice(0, 2);
	  } else {
	    return 'en-others';
	  }
	}
	
	var CDN_TEST_ADDRESS = {
	  aws: 'http://fun.touchpal.com', //亚马逊
	  aliyun: 'http://fun-aliyun.touchpal.com', //阿里云
	  gochina: 'http://fun-gochina.touchpal.com', //东方嘉禾
	  qiqiu: 'http://fun-qiqiu.touchpal.com', //qiqiu
	  highwinds: 'http://fun-highwinds.touchpal.com'
	};
	exports.CDN_TEST_ADDRESS = CDN_TEST_ADDRESS;
	var CDN_TEST_NAME = ['aws', 'aliyun', 'gochina', 'qiqiu', 'highwinds'];
	exports.CDN_TEST_NAME = CDN_TEST_NAME;
	var supportLanguages = ['en'];
	
	var locale = getLocale(supportLanguages);
	exports.locale = locale;
	var recordLocale = getRecordLocale();
	exports.recordLocale = recordLocale;
	var keyboardPkgName = (0, _localInterface.getPkgName)();
	exports.keyboardPkgName = keyboardPkgName;
	var isInApp = window.CTKJavaScriptHandler ? true : false;
	exports.isInApp = isInApp;
	var appVersion = (0, _localInterface.getVersion)();
	exports.appVersion = appVersion;
	var upgradeVersion = 6000;exports.upgradeVersion = upgradeVersion;
	// 推送版本号,基于该版本号显示不同按钮
	
	var translateMap = {
	  downloadBtn: {
	    en: 'FREE Download'
	  },
	  title1: {
	    en: 'Step Tracker'
	  },
	  title2: {
	    en: 'Personalized Pedometer'
	  },
	  subtitle: {
	    en: 'Walk to Lose weight!<br/>Set goal, get achievement and level up.'
	  },
	  subtitle2: {
	    en: 'Every step counts'
	  },
	  title: {
	    en: 'Step Tracker - Step Counter & walking tracker app'
	  },
	  shareText: {
	    en: 'Walk to Lose weight! Set goal, get achievement and level up.'
	  }
	};
	
	exports.translateMap = translateMap;
	function _getQuery(name) {
	  var result = null;
	  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null) {
	    result = decodeURI(r[2]);
	  }
	  return result === null ? '' : decodeURIComponent(result);
	}
	
	var step_user_id = _getQuery('step_user_id') || '';
	exports.step_user_id = step_user_id;
	var step_fb_id = _getQuery('step_fb_id') || '';
	exports.step_fb_id = step_fb_id;
	var te = decodeURIComponent(_getQuery('te') || '');
	exports.te = te;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map