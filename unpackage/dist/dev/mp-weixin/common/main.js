(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!*****************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/main.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createApp) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 27));
var _Base = __webpack_require__(/*! ./common/Base.js */ 34);
var _share = _interopRequireDefault(__webpack_require__(/*! ./common/share.js */ 36));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
_vue.default.config.productionTip = false;
_vue.default.prototype.$base = new _Base.Base();
_vue.default.mixin(_share.default);
_App.default.mpType = 'app';
var app = new _vue.default(_objectSpread(_objectSpread({}, _App.default), {}, {
  share: _share.default
}));
createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createApp"]))

/***/ }),

/***/ 27:
/*!*****************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/App.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 28);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 31);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 33);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 28:
/*!******************************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/App.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 29);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 29:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _Config = __webpack_require__(/*! ./common/Config.js */ 30);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  globalData: {
    scanParams: null // 存储扫码参数
  },

  onLaunch: function onLaunch(options) {
    // if(!wx.cloud){
    // 	console.error('请使用2.3.3或以上的基础库以使用云能力')
    // }else{
    // 	wx.cloud.init({
    // 		env:'jump-4g7tz67x8afafdf2',
    // 		traceUser:true,
    // 	})
    // }

    // 处理启动参数，可能包含扫码信息
    this.handleScanParams(options);
  },
  onShow: function onShow(options) {
    // uni.setEnableDebug({
    //     enableDebug: true
    // })

    // 只在应用启动时处理扫码参数，避免在页面切换时重复处理
    // 检查是否已经有扫码参数，如果有则不重复处理
    if (!this.globalData.scanParams) {
      this.handleScanParams(options);
    }
  },
  onHide: function onHide() {},
  methods: {
    // 处理扫码参数
    handleScanParams: function handleScanParams(options) {
      if (!options) {
        return;
      }

      // 检查是否有扫码场景值
      var scene = options.scene;

      // 扫码场景值通常为1011, 1012, 1013, 1047, 1048, 1049
      var scanScenes = [1011, 1012, 1013, 1047, 1048, 1049];

      // 获取query参数中的device和port
      var device = '';
      var port = '';

      // 检查是否从URL中获取参数 (如 https://test.yueguisuchong.com/ap3200/2824C905/FF)
      if (options.query && options.query.q) {
        // 解码URL
        var url = decodeURIComponent(options.query.q);

        // 使用正则表达式匹配URL中的设备ID和端口号
        // 匹配形如 baseUrl/ap3200/2824C905/FF 的URL
        var regex = /\/([A-Fa-f0-9]{8})\/([A-Fa-f0-9]{2})(?:\/|$)/;
        var match = url.match(regex);
        if (match && match.length >= 3) {
          device = match[1]; // 第一个捕获组是设备ID
          port = match[2]; // 第二个捕获组是端口号
          console.log('App正则匹配结果:', device, port);
        } else {
          // 如果正则匹配失败，尝试使用分割方法
          var urlParts = url.split('/');
          if (urlParts.length >= 2) {
            // 获取倒数第二个和最后一个参数
            device = urlParts[urlParts.length - 2];
            port = urlParts[urlParts.length - 1];
          }
        }
      }
      // 直接从参数中获取
      else if (options.query && options.query.device && options.query.port) {
        device = options.query.device;
        port = options.query.port;
      }

      // 如果获取到了设备ID和端口号，并且是扫码进入的场景，则保存参数
      if (device && port && (scanScenes.includes(scene) || options.query && options.query.q)) {
        // 检查是否已经有相同的扫码参数，避免重复设置
        if (this.globalData.scanParams && this.globalData.scanParams.device === device && this.globalData.scanParams.port === port) {
          console.log('App: 相同的扫码参数已存在，跳过设置');
          return;
        }

        // 保存扫码参数到全局数据
        this.globalData.scanParams = {
          device: device,
          port: port,
          isFromScan: true,
          timestamp: Date.now() // 添加时间戳
        };

        console.log('App: 扫码参数已保存到全局数据');

        // 检查用户是否已经登录
        var userToken = uni.getStorageSync('userToken');
        var user = uni.getStorageSync('user');
        if (userToken && user) {
          console.log('用户已登录，通过外部扫码进入，调用wxlogin/applet接口');
          this.handleLoggedUserScan(device);
        } else {
          console.log('用户未登录，扫码参数已保存，等待登录流程处理');
        }
      } else {
        console.log('App: 未满足扫码参数保存条件', {
          device: device,
          port: port,
          scene: scene,
          isScanScene: scanScenes.includes(scene),
          hasQuery: !!(options.query && options.query.q)
        });
      }
    },
    // 清除用户相关的本地存储
    clearUserRelatedStorage: function clearUserRelatedStorage(oldUserId) {
      console.log('开始清除旧用户相关存储，用户ID:', oldUserId);

      // 清除用户基本信息
      uni.removeStorageSync('user');
      uni.removeStorageSync('userId');
      uni.removeStorageSync('userToken');
      uni.removeStorageSync('phone');
      uni.removeStorageSync('Name');
      uni.removeStorageSync('poster');
      uni.removeStorageSync('adunit');
      uni.removeStorageSync('posterList');

      // 清除用户特定的存储项
      if (oldUserId) {
        var oldLogolist = "logolist_" + oldUserId;
        var oldUsertype = 'type_' + oldUserId;
        uni.removeStorageSync(oldLogolist);
        uni.removeStorageSync(oldUsertype);
        console.log('清除旧用户特定存储:', oldLogolist, oldUsertype);
      }

      // 清除其他可能的用户相关存储
      uni.removeStorageSync('PrevLoginPath');
      uni.removeStorageSync('JeepGetPhone');
      console.log('旧用户相关存储已清除完成');
    },
    // 刷新当前页面数据
    refreshCurrentPageData: function refreshCurrentPageData() {
      var _this = this;
      console.log('开始刷新当前页面数据');

      // 获取当前页面栈
      var pages = getCurrentPages();
      if (pages.length === 0) {
        console.log('没有当前页面，跳过刷新');
        return;
      }
      var currentPage = pages[pages.length - 1];
      var currentRoute = currentPage.route;
      console.log('当前页面路由:', currentRoute);

      // 延迟执行，确保用户信息已经完全更新
      setTimeout(function () {
        // 根据不同页面执行不同的刷新策略
        if (currentRoute === 'pages/index/index') {
          console.log('刷新index页面数据');
          _this.refreshIndexPage(currentPage);
        } else if (currentRoute === 'pages/chargingzhong/chargingzhong') {
          console.log('刷新chargingzhong页面数据');
          _this.refreshChargingzhongPage(currentPage);
        } else if (currentRoute === 'pages/smcharging/smcharging') {
          console.log('刷新smcharging页面数据');
          _this.refreshSmchargingPage(currentPage);
        } else {
          console.log('其他页面，执行通用刷新');
          _this.refreshGenericPage(currentPage);
        }
      }, 100);
    },
    // 刷新index页面
    refreshIndexPage: function refreshIndexPage(page) {
      if (page && page.$vm) {
        console.log('执行index页面数据刷新');
        // 重新获取用户信息
        if (typeof page.$vm.getUserInfo === 'function') {
          page.$vm.getUserInfo();
        }
        // 重新初始化页面数据
        if (typeof page.$vm.initPageData === 'function') {
          page.$vm.initPageData();
        }
        // 重新调用onShow方法
        if (typeof page.$vm.onShow === 'function') {
          page.$vm.onShow();
        }
        // 强制更新页面
        if (typeof page.$vm.$forceUpdate === 'function') {
          page.$vm.$forceUpdate();
        }
      }
    },
    // 刷新chargingzhong页面
    refreshChargingzhongPage: function refreshChargingzhongPage(page) {
      if (page && page.$vm) {
        console.log('执行chargingzhong页面数据刷新');
        // 重新获取用户信息和充电数据
        if (typeof page.$vm.getUserInfo === 'function') {
          page.$vm.getUserInfo();
        }
        if (typeof page.$vm.getChargingData === 'function') {
          page.$vm.getChargingData();
        }
        if (typeof page.$vm.initPageData === 'function') {
          page.$vm.initPageData();
        }
        // 重新调用onShow方法
        if (typeof page.$vm.onShow === 'function') {
          page.$vm.onShow();
        }
        // 强制更新页面
        if (typeof page.$vm.$forceUpdate === 'function') {
          page.$vm.$forceUpdate();
        }
      }
    },
    // 刷新smcharging页面
    refreshSmchargingPage: function refreshSmchargingPage(page) {
      if (page && page.$vm) {
        console.log('执行smcharging页面数据刷新');
        // 重新初始化页面数据
        if (typeof page.$vm.initPageData === 'function') {
          page.$vm.initPageData();
        }
        // 重新调用onShow方法
        if (typeof page.$vm.onShow === 'function') {
          page.$vm.onShow();
        }
        // 强制更新页面
        if (typeof page.$vm.$forceUpdate === 'function') {
          page.$vm.$forceUpdate();
        }
      }
    },
    // 通用页面刷新
    refreshGenericPage: function refreshGenericPage(page) {
      if (page && page.$vm) {
        console.log('执行通用页面数据刷新');
        // 尝试调用常见的刷新方法
        if (typeof page.$vm.onShow === 'function') {
          page.$vm.onShow();
        } else if (typeof page.$vm.initPageData === 'function') {
          page.$vm.initPageData();
        }
        // 强制更新页面
        if (typeof page.$vm.$forceUpdate === 'function') {
          page.$vm.$forceUpdate();
        }
      }
    },
    // 用户切换后刷新当前页面
    refreshCurrentPageAfterUserSwitch: function refreshCurrentPageAfterUserSwitch() {
      var _this2 = this;
      console.log('用户切换后刷新当前页面');

      // 验证token是否已更新
      var currentToken = uni.getStorageSync('userToken');
      var currentUserId = uni.getStorageSync('userId');
      console.log('当前token:', currentToken);
      console.log('当前userId:', currentUserId);
      var pages = getCurrentPages();
      if (pages.length === 0) {
        console.log('没有当前页面，跳过刷新');
        return;
      }
      var currentPage = pages[pages.length - 1];
      var currentRoute = currentPage.route;
      console.log('当前页面路由:', currentRoute);
      if (currentPage && currentPage.$vm) {
        // 增加延迟，确保token完全更新
        setTimeout(function () {
          // 再次验证token
          var verifyToken = uni.getStorageSync('userToken');
          console.log('验证token:', verifyToken);

          // 根据不同页面执行特定的刷新逻辑
          if (currentRoute === 'pages/index/index') {
            console.log('刷新index页面用户信息');
            _this2.refreshIndexPageUserInfo(currentPage.$vm);
          } else if (currentRoute === 'pages/chargingzhong/chargingzhong') {
            console.log('刷新chargingzhong页面用户信息');
            _this2.refreshChargingzhongPageUserInfo(currentPage.$vm);
          } else if (currentRoute === 'pages/smcharging/smcharging') {
            console.log('刷新smcharging页面用户信息');
            _this2.refreshSmchargingPageUserInfo(currentPage.$vm);
          }
        }, 200); // 增加延迟时间
      }
    },
    // 刷新index页面用户信息
    refreshIndexPageUserInfo: function refreshIndexPageUserInfo(vm) {
      try {
        // 重新从本地存储获取用户信息
        var user = uni.getStorageSync('user');
        var userToken = uni.getStorageSync('userToken');
        console.log('更新index页面用户信息:', user);
        console.log('使用的token:', userToken);

        // 更新页面的用户信息
        vm.isLoggedIn = !!(userToken && user);
        vm.userlist = user || {};

        // 延迟调用页面的用户信息更新方法，确保token已更新
        setTimeout(function () {
          if (typeof vm.usertap === 'function') {
            console.log('调用index页面usertap方法');
            vm.usertap();
          }
        }, 100);

        // 如果有子组件，也要更新子组件
        if (vm.$refs.childComponent && typeof vm.$refs.childComponent.userdetail === 'function') {
          setTimeout(function () {
            vm.$refs.childComponent.userdetail();
          }, 50);
        }
        if (vm.$refs.mainindex && typeof vm.$refs.mainindex.userdetail === 'function') {
          setTimeout(function () {
            vm.$refs.mainindex.userdetail();
          }, 50);
        }

        // 强制更新页面
        if (typeof vm.$forceUpdate === 'function') {
          vm.$forceUpdate();
        }
        console.log('index页面用户信息刷新完成');
      } catch (error) {
        console.error('刷新index页面用户信息时出错:', error);
      }
    },
    // 刷新chargingzhong页面用户信息
    refreshChargingzhongPageUserInfo: function refreshChargingzhongPageUserInfo(vm) {
      try {
        console.log('更新chargingzhong页面用户信息');

        // 调用页面的刷新方法
        if (typeof vm.onRefresh === 'function') {
          vm.onRefresh();
        }

        // 更新子组件
        if (vm.$refs.childComponent && typeof vm.$refs.childComponent.userdetail === 'function') {
          setTimeout(function () {
            vm.$refs.childComponent.userdetail();
          }, 50);
        }

        // 强制更新页面
        if (typeof vm.$forceUpdate === 'function') {
          vm.$forceUpdate();
        }
        console.log('chargingzhong页面用户信息刷新完成');
      } catch (error) {
        console.error('刷新chargingzhong页面用户信息时出错:', error);
      }
    },
    // 刷新smcharging页面用户信息
    refreshSmchargingPageUserInfo: function refreshSmchargingPageUserInfo(vm) {
      try {
        console.log('更新smcharging页面用户信息');

        // 调用页面的初始化方法
        if (typeof vm.initPageData === 'function') {
          vm.initPageData();
        }

        // 强制更新页面
        if (typeof vm.$forceUpdate === 'function') {
          vm.$forceUpdate();
        }
        console.log('smcharging页面用户信息刷新完成');
      } catch (error) {
        console.error('刷新smcharging页面用户信息时出错:', error);
      }
    },
    // 强制重新加载当前页面
    forceReloadCurrentPage: function forceReloadCurrentPage() {
      console.log('强制重新加载当前页面');
      var pages = getCurrentPages();
      if (pages.length === 0) {
        console.log('没有当前页面，跳过重新加载');
        return;
      }
      var currentPage = pages[pages.length - 1];
      var currentRoute = currentPage.route;
      console.log('当前页面路由:', currentRoute);

      // 对于tabBar页面，使用reLaunch重新加载
      if (currentRoute === 'pages/index/index' || currentRoute === 'pages/smcharging/smcharging' || currentRoute === 'pages/chargingzhong/chargingzhong') {
        console.log('重新加载tabBar页面:', currentRoute);
        uni.reLaunch({
          url: '/' + currentRoute
        });
      } else {
        console.log('非tabBar页面，使用redirectTo重新加载');
        // 获取当前页面的完整路径（包含参数）
        var fullPath = currentPage.$page ? currentPage.$page.fullPath : '/' + currentRoute;
        uni.redirectTo({
          url: fullPath
        });
      }
    },
    // 数字补零方法
    pad: function pad(num, n) {
      var len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    // 处理已登录用户的扫码进入
    handleLoggedUserScan: function handleLoggedUserScan(deviceId) {
      var _this3 = this;
      console.log('处理已登录用户扫码进入，设备ID:', deviceId);

      // 保存当前的扫码参数，防止被其他地方清除
      var currentScanParams = this.globalData.scanParams ? _objectSpread({}, this.globalData.scanParams) : null;
      console.log('保存当前扫码参数:', currentScanParams);

      // 获取当前登录code
      uni.login({
        success: function success(res) {
          console.log('获取登录code成功:', res.code);

          // 构造登录参数
          var data = {
            code: res.code,
            deviceId: deviceId // 添加设备ID参数
          };

          console.log('调用wxlogin/applet接口，参数:', data);

          // 调用登录接口（不需要手机号授权）
          uni.request({
            url: _Config.Config.api + 'wxlogin/applet',
            method: 'POST',
            data: data,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function success(response) {
              console.log('wxlogin/applet接口调用成功:', response);
              if (response.data && response.data.code == 200) {
                var newUserData = response.data.data;
                var currentUserId = uni.getStorageSync('userId');
                console.log('当前用户ID:', currentUserId);
                console.log('新用户ID:', newUserData.id);

                // 比较userId，如果不同则清除所有用户相关信息，相当于新用户登录
                if (currentUserId && currentUserId !== newUserData.id) {
                  console.log('检测到不同用户，清除旧用户信息，切换到新用户');

                  // 清除所有用户相关的本地存储
                  _this3.clearUserRelatedStorage(currentUserId);
                } else {
                  console.log('相同用户或首次登录，更新用户信息');
                }

                // 设置新用户信息
                uni.setStorageSync('user', newUserData);
                uni.setStorageSync('userId', newUserData.id);
                uni.setStorageSync('userToken', newUserData.token);
                uni.setStorageSync('phone', newUserData.phone);
                uni.setStorageSync('Name', newUserData.realName);
                uni.setStorageSync('poster', newUserData.poster);
                uni.setStorageSync('adunit', newUserData.adunit);
                console.log('新用户token已保存:', newUserData.token);

                // 设置新用户的特定存储项
                var logolist = "logolist_" + newUserData.id;
                uni.setStorageSync(logolist, "");
                var usertype = 'type_' + newUserData.id;
                uni.setStorageSync(usertype, newUserData.scan);

                // 处理海报列表
                if (newUserData.posterList) {
                  var posterList = newUserData.posterList;
                  for (var i = 0; i < posterList.length; i++) {
                    posterList[i].img = _Config.Config.imgapi + posterList[i].img.replace("/tabBarimg", "");
                  }
                  uni.setStorageSync('posterList', posterList);
                } else {
                  uni.setStorageSync('posterList', []);
                }
                console.log('用户信息已更新完成，扫码参数已保存');

                // 如果检测到用户切换，立即跳转到充电页面
                if (currentUserId && currentUserId !== newUserData.id) {
                  console.log('用户已切换，立即跳转到充电页面');

                  // 构造充电页面URL
                  if (currentScanParams && currentScanParams.device && currentScanParams.port) {
                    // 处理端口号转换
                    var processedPort = '';
                    if (currentScanParams.port.toUpperCase() !== 'FF') {
                      try {
                        processedPort = _this3.pad(parseInt(currentScanParams.port, 16).toString(10), 2);
                      } catch (e) {
                        console.error('端口号转换错误:', e);
                        processedPort = currentScanParams.port;
                      }
                    } else {
                      processedPort = currentScanParams.port;
                    }
                    var chargeUrl = "/pageone/poweron/poweron?device=".concat(currentScanParams.device, "&port=").concat(processedPort, "&cmd=0&from=1");
                    console.log('跳转到充电页面:', chargeUrl);

                    // 延迟跳转，确保用户信息已经完全更新
                    setTimeout(function () {
                      console.log('用户切换，跳转到充电页面:', chargeUrl);
                      uni.redirectTo({
                        url: chargeUrl,
                        success: function success() {
                          console.log('用户切换后跳转充电页面成功');
                        },
                        fail: function fail(err) {
                          console.error('跳转充电页面失败:', err);
                        }
                      });
                    }, 200);
                  } else {
                    console.log('没有扫码参数，无法跳转到充电页面');
                  }
                } else {
                  console.log('相同用户，无需跳转');
                }
              } else if (response.data && response.data.code == 599) {
                console.log('已登录用户扫码时未关注公众号，跳转到登录页面处理');

                // 构造跳转URL，保留设备号和端口号参数
                var loginUrl = '/pages/login/login?reason=follow_wechat';
                if (currentScanParams && currentScanParams.device && currentScanParams.port) {
                  loginUrl += "&device=".concat(currentScanParams.device, "&port=").concat(currentScanParams.port);
                  console.log('保留设备参数跳转到登录页面:', currentScanParams);
                }

                // 清除扫码参数，避免重复处理
                _this3.globalData.scanParams = null;

                // 跳转到登录页面，让登录页面处理关注引导
                setTimeout(function () {
                  uni.reLaunch({
                    url: loginUrl,
                    success: function success() {
                      console.log('跳转到登录页面成功');
                    },
                    fail: function fail(err) {
                      console.error('跳转到登录页面失败:', err);
                      // 如果reLaunch失败，尝试使用redirectTo
                      console.log('尝试使用redirectTo跳转');
                      uni.redirectTo({
                        url: loginUrl,
                        success: function success() {
                          console.log('redirectTo跳转成功');
                        },
                        fail: function fail(err2) {
                          console.error('redirectTo也失败:', err2);
                        }
                      });
                    }
                  });
                }, 100);
              } else if (response.data && response.data.code == 598) {
                console.log('已登录用户扫码时需要重新授权手机号，跳转到登录页面');
                console.log('保存的扫码参数:', currentScanParams);

                // 构造跳转URL，保留设备号和端口号参数
                var _loginUrl = '/pages/login/login?reason=phone_auth';
                if (currentScanParams && currentScanParams.device && currentScanParams.port) {
                  _loginUrl += "&device=".concat(currentScanParams.device, "&port=").concat(currentScanParams.port);
                  console.log('保留设备参数跳转到登录页面:', currentScanParams);
                  console.log('构造的跳转URL:', _loginUrl);
                } else {
                  console.log('没有设备参数，使用基础URL:', _loginUrl);
                }

                // 清除扫码参数，避免重复处理
                _this3.globalData.scanParams = null;
                console.log('准备跳转到登录页面，URL:', _loginUrl);
                // 跳转到登录页面，让登录页面处理手机号授权
                // 使用setTimeout延迟跳转，避免在接口回调中立即跳转导致的问题
                setTimeout(function () {
                  uni.reLaunch({
                    url: _loginUrl,
                    success: function success() {
                      console.log('跳转到登录页面成功');
                    },
                    fail: function fail(err) {
                      console.error('跳转到登录页面失败:', err);
                      // 如果reLaunch失败，尝试使用redirectTo
                      console.log('尝试使用redirectTo跳转');
                      uni.redirectTo({
                        url: _loginUrl,
                        success: function success() {
                          console.log('redirectTo跳转成功');
                        },
                        fail: function fail(err2) {
                          console.error('redirectTo也失败:', err2);
                        }
                      });
                    }
                  });
                }, 100);
              } else {
                console.log('wxlogin/applet接口返回失败:', response.data);
              }
            },
            fail: function fail(error) {
              console.error('wxlogin/applet接口调用失败:', error);
            }
          });
        },
        fail: function fail(error) {
          console.error('获取登录code失败:', error);
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 31:
/*!**************************************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/App.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 32);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 32:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/App.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map