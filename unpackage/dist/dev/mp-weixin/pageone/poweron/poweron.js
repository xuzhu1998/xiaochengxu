require('../common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pageone/poweron/poweron"],{

/***/ 187:
/*!********************************************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/main.js?{"page":"pageone%2Fpoweron%2Fpoweron"} ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _poweron = _interopRequireDefault(__webpack_require__(/*! ./pageone/poweron/poweron.vue */ 188));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_poweron.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 188:
/*!*************************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./poweron.vue?vue&type=template&id=75d667fa& */ 189);
/* harmony import */ var _poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./poweron.vue?vue&type=script&lang=js& */ 191);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _poweron_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./poweron.vue?vue&type=style&index=0&lang=css& */ 197);
/* harmony import */ var _poweron_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./poweron.vue?vue&type=style&index=1&lang=scss& */ 199);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 33);

var renderjs






/* normalize component */

var component = Object(_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pageone/poweron/poweron.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 189:
/*!********************************************************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue?vue&type=template&id=75d667fa& ***!
  \********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./poweron.vue?vue&type=template&id=75d667fa& */ 190);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_template_id_75d667fa___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 190:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue?vue&type=template&id=75d667fa& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 =
    _vm.ggshow == 1
      ? _vm.__map(_vm.posterList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g0 =
            item.jump == "PPRO" && item.jump == "PPRO"
              ? JSON.parse(item.data)
              : null
          var g1 =
            item.jump == "PPRO" && item.jump == "PPRO"
              ? JSON.parse(item.data)
              : null
          return {
            $orig: $orig,
            g0: g0,
            g1: g1,
          }
        })
      : null
  var g2 = _vm.oftenList.length
  var g3 = _vm.temporaryList.length != 0 && _vm.xcxtype == 1
  var g4 = _vm.monthlyList.length
  var g5 = _vm.isVIP.substr(0, 1)
  var l1 =
    _vm.showclass == "2"
      ? _vm.__map(_vm.temporaryList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g6 =
            item.minPower != item.maxPower
              ? ((_vm.hsmoney / item.standard) * (1 + _vm.hsfl)).toFixed(2)
              : null
          var g7 =
            item.minPower != item.maxPower && _vm.hsfl
              ? ((_vm.hsmoney / item.standard) * _vm.hsfl).toFixed(2)
              : null
          var g8 =
            item.minPower == item.maxPower
              ? ((_vm.hsmoney / item.standard) * (1 + _vm.hsfl)).toFixed(2)
              : null
          var g9 =
            item.minPower == item.maxPower && _vm.hsfl
              ? ((_vm.hsmoney / item.standard) * _vm.hsfl).toFixed(2)
              : null
          return {
            $orig: $orig,
            g6: g6,
            g7: g7,
            g8: g8,
            g9: g9,
          }
        })
      : null
  var g10 =
    _vm.isSpan == false &&
    _vm.showclass == 1 &&
    (_vm.mtype == "B2" || _vm.mtype == "B5") &&
    _vm.projectServiceDetailList.length > 0
  var g11 =
    _vm.infolist.safeAllStafus == 1 &&
    _vm.infolist.monthSafe == 1 &&
    _vm.infolist.isMonthBye == false &&
    _vm.reassuring == 0
      ? (_vm.shbylist.monthOriginal - _vm.shbylist.monthPrice).toFixed(2)
      : null
  var g12 = _vm.showclass == 1 && _vm.mtype == "B2" && _vm.steps.length > 0
  var g13 = _vm.deviceId.substr(-2, 1)
  var g14 =
    g13 == 9 && _vm.showclass == 1 ? _vm.oftenOccupyFreeTime.length : null
  var l2 =
    g13 == 9 && _vm.showclass == 1
      ? _vm.__map(_vm.oftenOccupyFreeTime, function (itemo, indexo) {
          var $orig = _vm.__get_orig(itemo)
          var g15 = _vm.oftenOccupyFreeTime.length
          return {
            $orig: $orig,
            g15: g15,
          }
        })
      : null
  var g16 =
    g13 == 9 && _vm.showclass == 2 ? _vm.temporaryOccupyFreeTime.length : null
  var l3 =
    g13 == 9 && _vm.showclass == 2
      ? _vm.__map(_vm.temporaryOccupyFreeTime, function (itemt, indext) {
          var $orig = _vm.__get_orig(itemt)
          var g17 = _vm.temporaryOccupyFreeTime.length
          return {
            $orig: $orig,
            g17: g17,
          }
        })
      : null
  var g18 =
    g13 == 9 && _vm.showclass == 3 ? _vm.monthlyOccupyFreeTime.length : null
  var l4 =
    g13 == 9 && _vm.showclass == 3
      ? _vm.__map(_vm.monthlyOccupyFreeTime, function (itemm, indexm) {
          var $orig = _vm.__get_orig(itemm)
          var g19 = _vm.monthlyOccupyFreeTime.length
          return {
            $orig: $orig,
            g19: g19,
          }
        })
      : null
  var l5 = _vm.__map(_vm.onelist, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var g20 =
      item.status && item.status == "空闲"
        ? _vm.chooesPortList.includes(index) && _vm.isAll
        : null
    return {
      $orig: $orig,
      g20: g20,
    }
  })
  var g21 = _vm.imgList.length
  var g22 = (_vm.shbylist.monthOriginal - _vm.shbylist.monthPrice).toFixed(2)
  var m0 = Number(_vm.currentPay)
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.cmtap = true
    }
    _vm.e1 = function ($event) {
      _vm.checkPopup = false
    }
    _vm.e2 = function ($event) {
      _vm.cmtap = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        g2: g2,
        g3: g3,
        g4: g4,
        g5: g5,
        l1: l1,
        g10: g10,
        g11: g11,
        g12: g12,
        g13: g13,
        g14: g14,
        l2: l2,
        g16: g16,
        l3: l3,
        g18: g18,
        l4: l4,
        l5: l5,
        g21: g21,
        g22: g22,
        m0: m0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 191:
/*!**************************************************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./poweron.vue?vue&type=script&lang=js& */ 192);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 192:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 193));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 195));
var _Config = __webpack_require__(/*! ../../common/Config.js */ 30);
var _toast = _interopRequireDefault(__webpack_require__(/*! ../../wxcomponents/vant/toast/toast */ 53));
var _dialog = _interopRequireDefault(__webpack_require__(/*! ../../wxcomponents/vant/dialog/dialog */ 35));
var _clickThrottle = _interopRequireDefault(__webpack_require__(/*! ../../common/clickThrottle.js */ 196));
var _methods;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var _default = {
  components: {},
  data: function data() {
    return {
      isAll: 0,
      currentPay: '',
      checkPopup: false,
      showclass: '1',
      //模式选择
      tapclass: '1',
      //小时选择
      tapclass2: '',
      //金额选择
      show: false,
      //提示弹窗显示
      tanshow: 1,
      //弹窗按钮显示
      flshow: false,
      //查看费率弹窗显示
      wxshow: false,
      //微信二维码弹窗显示
      erimg: '',
      //二维码图片
      twocodeshow: false,
      //验证码弹窗显示
      Verification: true,
      //通过v-if控制显示获取还是倒计时
      timer: 60,
      //定义初始时间为60s
      duanshow: false,
      //端口选择弹窗显示
      montlist: ['1号端口', '2号端口'],
      mshow: 0,
      mshow1: -1,
      faultshow: false,
      //故障报修弹窗显示
      radio: '1',
      //退款类型
      activeNames: [''],
      radio1: '',
      //退款原因
      message: '',
      //故障描述
      reason: '请选择故障类型',
      imgList: [],
      cloudimgList: [],
      imgCount: 3,
      //最多支持3张上传，可以修改
      tishishow: false,
      option: {},
      //页面传参
      infolist: {},
      //页面数据
      monthlyList: [],
      //包月费率详情数组
      temporaryList: [],
      //临时费率详情数组
      oftenList: [],
      //常用模式费率详情数组
      onetype: "",
      //常用计费模式
      twotype: "",
      //临时计费模式
      threetype: "",
      //包月计费模式
      minMoney: "",
      //最低消费金额
      time: 0,
      //选择的时长
      handshu: '',
      //手动输入时长
      handm: '',
      //手动输入金额
      dishandm: 0,
      //手动输入金额优惠率
      chargeType: "",
      //上电类型
      isSpan: '',
      //是否跨区
      numm: 0,
      //重连websocket的次数
      ws: null,
      //websocket连接成功的对象
      webIsTrue: false,
      //websocket是否连接
      timeId: 0,
      from: '',
      //标识  从哪跳过来的   1代表外部扫一扫 2代表内部扫一扫 或远程上电
      first: '',
      //临时第一档
      second: '',
      //临时第二档
      third: '',
      //临时第三档
      fourth: '',
      //临时第四档
      tapclass1: '1',
      areaId: '',
      //充电区ID
      projectId: '',
      //小区id
      yzcode: '',
      //验证码
      yzdata: {},
      //获取验证码参数
      nearid: '',
      //跳转ID
      fourmsg: '',
      //500提示信息
      portnum: '',
      //端口号显示
      userId: '',
      //用户id
      amount: '',
      //临时充值金额
      rechargeNo: '',
      //临时充值订单号
      dknum: '00',
      //选择的端口号
      hat: [],
      //设备报修图片
      sbnum: '',
      //设备报修编号
      shebeino: '',
      //设备编号
      hsmoney: '',
      //选中金额
      hsfl: '',
      //选中费率
      flremarks1: '',
      //常用费率弹窗提示信息
      flremarks2: '',
      //临时费率弹窗提示信息
      flremarks3: '',
      //包月费率弹窗提示信息
      oftenMinMoney: '',
      //常用模式最低消费
      fwnum: '',
      //常用计量服务费费率
      steps: [],
      //常用计量服务费费率B2
      temporaryMinMoney: '',
      //临时模式最低消费
      deviceId: '',
      //16进制端口号
      noticeMsg: "",
      classtap: 'tclass',
      oneshow: false,
      //初始化ff端口选择
      onelist: [],
      //端口数据
      chooesPortList: [],
      //多选的端口数据

      oneport: '',
      //端口号
      sixnum: '',
      //转换后的设备号
      isFund: '',
      //是否临时退费
      posterList: [],
      //轮播图数组
      poster: 0,
      dshow: false,
      //指引提示
      mtype: '',
      //常用模式状态
      bytype: '',
      //包月模式状态
      firstOne: '',
      //一元第一档
      secondOne: '',
      //一元第二档
      thirdOne: '',
      //一元第三档
      fourthOne: '',
      //一元第四档
      disFirstOne: '',
      //一元第一档优惠率
      disSecondOne: '',
      //一元第二档优惠率
      disThirdOne: '',
      //一元第三档优惠率
      disFourthOne: '',
      //一元第四档优惠率
      temporaryDisFirst: '',
      //临时第一档优惠率
      temporaryDisSecond: '',
      //临时第二档优惠率
      temporaryDisThird: '',
      //临时第三档优惠率
      temporaryDisFourth: '',
      //临时第四档优惠率
      gbshow: false,
      timeshow: false,
      dgnum: '',
      occtype: 0,
      //是否有充电柜订单
      cdgnum: '',
      //充电柜未完成订单数量
      oftenOccupyFree: 0,
      //常用免费时长-小时（充电柜）
      oftenOccupyMax: 0,
      //常用占位费封顶金额
      oftenOccupyRate: 0,
      //常用占位费率（充电柜）
      temporaryOccupyFree: 0,
      //临时免费时长-小时（充电柜）
      temporaryOccupyMax: 0,
      //临时占位费封顶金额
      temporaryOccupyRate: 0,
      //临时占位费率（充电柜）
      monthlyOccupyFree: 0,
      //包月免费时长-小时（充电柜）
      monthlyOccupyMax: 0,
      //包月占位费封顶金额
      monthlyOccupyRate: 0,
      //包月占位费率（充电柜）
      wtype: 0,
      //未完成订单弹窗是否弹出
      logolist: '',
      //logo图片
      checked: true,
      //勾选
      isSafe: 0,
      //是否开启守护充电 0否1是
      bxname: '立即充电',
      cshow: false,
      yc: 0,
      //是否远程充电
      bhdk: '',
      //宝付端口
      refundId: 0,
      //退款定时
      gzshow: false,
      wechatLogo: '',
      //是否显示公众号二维码
      wechaturl: '',
      //是否显示公众号二维码
      xieyidata: {},
      //用户协议
      cxyshow: false,
      xychecked: false,
      onecmchecked: false,
      //一元是否充满自停勾选
      isAutoStopOne: 0,
      //一元是否充满自停
      lscmchecked: false,
      //临充是否充满自停勾选
      temporaryIsAutoStop: 0,
      //临充是否充满自停
      longcheck: false,
      //是否开启长充模式
      longshow: false,
      //是否显示长充模式
      longCharge: 0,
      xcxtype: 1,
      //0小程序环境 1公众号环境
      xzchecked: '2',
      //1 服务费套餐 2单独收费
      fwtan: false,
      //服务费套餐弹窗
      serviceType: '',
      //服务费类型
      projectServiceDetailList: [],
      //服务费套餐列表
      endTimeStr: '',
      //计量服务费包月到期时间
      fuwumoney: '',
      //单次服务费金额
      isVIP: '',
      //VIP状态
      warnshow: false,
      yonghunum: '',
      //充电守护人数
      occlist: '',
      //用户强制结算的充电柜订单
      occshow: false,
      occas: 1,
      xuanbtn: '',
      burl: '',
      ontime: 0,
      temporaryDefaultAutoStop: 0,
      // 默认勾选充满自停
      shbyshow: false,
      wxtsshow: false,
      wxtsnum: 1,
      shbylist: {},
      wxtszj: 0,
      oftenOccupyFreeTime: [],
      //常用-免费时间段（充电柜）
      temporaryOccupyFreeTime: [],
      //临时-免费时间段（充电柜）
      monthlyOccupyFreeTime: [],
      //包月免费时间段（充电柜）
      cmtap: false,
      reassuring: '',
      //充电守护；0不屏蔽 1屏蔽
      postervip: '',
      //广告：0不屏蔽 1屏蔽
      point: '',
      ggshow: 0,
      hasLoadedData: false // 标记是否已经加载过数据
    };
  },
  mounted: function mounted() {},
  created: function created() {
    // this.infoshow();
  },
  watch: {
    xzchecked: function xzchecked(newcheck, old) {
      if (newcheck == '1' && !this.endTimeStr && this.projectServiceDetailList.length > 0) {
        this.fwtan = true;
      }
    }
  },
  onShow: function onShow() {
    // 检查登录状态
    if (!this.checkLoginStatus()) {
      return; // 如果未登录且用户选择不登录，则不执行后续逻辑
    }

    // 如果页面还没有加载过数据，说明是从登录页面返回，需要重新加载
    if (this.option && this.option.device && !this.hasLoadedData) {
      // 执行完整的页面初始化
      this.initPageData();
      this.loadPageData(this.option);
    } else if (this.hasLoadedData) {
      // 页面已经加载过，只更新用户相关的信息
      this.initPageData();
    }
  },
  onLoad: function onLoad(option) {
    // 保存页面参数
    this.option = option;

    // 检查登录状态
    var userToken = uni.getStorageSync('userToken');
    var user = uni.getStorageSync('user');
    if (!userToken || !user) {
      // 充电功能需要登录，显示登录提示
      this.$base.handleLoginRequired('charge');
      return;
    }

    // 用户已登录，执行正常的页面加载逻辑
    this.loadPageData(option);
  },
  beforeDestroy: function beforeDestroy() {
    var _this2 = this;
    // 清除所有定时器
    if (this.timeId) {
      clearTimeout(this.timeId);
      this.timeId = null;
      console.log('清除timeId定时器');
    }
    if (this.refundId) {
      clearTimeout(this.refundId);
      this.refundId = null;
      console.log('清除refundId定时器');
    }

    // 关闭WebSocket连接
    if (this.webIsTrue) {
      this.ws.close();
      this.ws = null;
      console.log('关闭WebSocket连接');
    }

    // 处理临时充电模式下的退款
    if (this.showclass == 2 && this.duanshow == true) {
      clearTimeout(this.refundId);
      var data = {
        ornum: this.ornum
      };
      uni.showLoading({
        title: '请稍候',
        mask: true
      });
      this.$base.request('refund/refund', 'POST', data).then(function (res1) {
        if (res1.data.code == 200) {
          uni.hideLoading();
          _toast.default.success('退款成功');
          _this2.back();
        } else {
          _toast.default.fail(res1.data.msg);
          _this2.back();
        }
      }).catch(function (err) {});
    }

    // if(this.from=='1'){
    // 	WeixinJSBridge.call('closeWindow');
    // }
  },

  methods: (_methods = {
    // 检查登录状态
    checkLoginStatus: function checkLoginStatus() {
      var userToken = uni.getStorageSync('userToken');
      var user = uni.getStorageSync('user');

      // 如果没有token或用户信息，需要登录
      if (!userToken || !user) {
        console.log('poweron页面：用户未登录，显示登录提示');
        // 充电功能需要登录
        this.$base.handleLoginRequired('charge');
        return false;
      }
      return true;
    },
    // 初始化页面数据
    initPageData: function initPageData() {
      try {
        var user = uni.getStorageSync('user');
        var userId = uni.getStorageSync('userId');
        this.reassuring = uni.getStorageSync('reassuring');
        this.postervip = uni.getStorageSync('postervip');
        this.point = uni.getStorageSync('point');
        this.wechatLogo = uni.getStorageSync('wechatLogo');
        this.wechaturl = uni.getStorageSync('wechaturl');
        this.poster = uni.getStorageSync('poster');

        // 处理logo显示
        if (userId) {
          var logolist = 'logolist_' + userId;
          var logo = uni.getStorageSync(logolist);
          if (logo) {
            this.logolist = logo;
          } else {
            this.logoshow();
          }
        }

        // 处理操作指引显示
        if (userId) {
          var usertype = 'type_' + userId;
          if (uni.getStorageSync(usertype) == 1) {
            this.dshow = false;
          } else if (uni.getStorageSync(usertype) == 0) {
            this.dshow = true;
          }
        }

        // 处理充电柜相关逻辑
        if (this.option && this.option.device && this.option.device.substr(-2, 1) == 9 && this.option.cmd != 1 && this.wtype == 0) {
          this.deviceId = this.option.device.toUpperCase();
          this.occfirst();
        }
      } catch (error) {
        console.error('poweron页面初始化数据时出错:', error);
      }
    },
    // 页面加载数据处理
    loadPageData: function loadPageData(option) {
      var _this3 = this;
      // 标记数据已开始加载
      this.hasLoadedData = true;
      if (option.cmd === 0) {
        if (!uni.getStorageSync("isAlert")) {
          this.$base.request("user/info" + "/" + uni.getStorageSync("userId"), "GET").then(function (res) {
            if (res.data.code == 200) {
              _this3.$nextTick(function () {
                var _res$data$data = res.data.data,
                  isAlert = _res$data$data.isAlert,
                  arrears = _res$data$data.arrears;
                _this3.currentPay = arrears;
                _this3.checkPopup = !!+isAlert;
                uni.setStorageSync('isAlert', true);
              });
            }
          });
        }
      }
      this.xy();
      if (option.yc) {
        this.yc = option.yc;
      } else {
        this.yc = 0;
      }
      var sbno = this.option.device.substring(this.option.device.length - 2, this.option.device.length);
      if (this.option.cmd == 0 && sbno == '00') {
        var data = {
          portDevice: this.option.device
        };
        this.$base.request('charge/device', 'GET', data).then(function (res) {
          if (res.data.code == 200) {
            _this3.option.device = res.data.data.deviceId;
            _this3.option.port = res.data.data.ports;
            _this3.showone();
          } else {
            _toast.default.fail('此二维码未绑定到充电桩！');
            _this3.back();
            return;
          }
        }).catch(function (err) {});
      } else {
        this.showone();
      }
    },
    // 单次-计时模式上电前, 校验最大充电时长, code: 200-可以上电, code: 500-return无法上电
    checkMaxChargeTime: function checkMaxChargeTime(_ref) {
      var _this4 = this;
      var chargeTime = _ref.chargeTime,
        chargeType = _ref.chargeType;
      // 非单次计时模式不进入判断
      if (chargeType !== 'B1') return {
        code: 200
      };
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(reslove, reject) {
          var data, res, _res$data, code, msg, _res$data$data2, errorType, maxChargeTime;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  data = {
                    chargeTime: chargeTime,
                    chargeType: 'B1',
                    areaId: _this4.areaId,
                    projectId: _this4.projectId
                  };
                  _context.next = 3;
                  return _this4.$base.request('charge/check/time', 'GET', data);
                case 3:
                  res = _context.sent;
                  _res$data = res.data, code = _res$data.code, msg = _res$data.msg;
                  if (!(code === 200)) {
                    _context.next = 7;
                    break;
                  }
                  return _context.abrupt("return", reslove({
                    code: 200
                  }));
                case 7:
                  _res$data$data2 = res.data.data, errorType = _res$data$data2.errorType, maxChargeTime = _res$data$data2.maxChargeTime;
                  if (errorType === 1) {
                    _dialog.default.alert({
                      title: '提示',
                      message: msg,
                      confirmButtonText: '前往充值'
                    }).then(function () {
                      _this4.goToPay();
                      return reslove({
                        code: 500
                      });
                    });
                  }
                  if (errorType === 2) {
                    _dialog.default.confirm({
                      title: '提示',
                      message: msg,
                      confirmButtonText: '继续',
                      cancelButtonText: '前往充值'
                    }).then(function () {
                      return reslove({
                        code: 200,
                        maxChargeTime: maxChargeTime
                      });
                    }).catch(function () {
                      _this4.goToPay();
                      return reslove({
                        code: 500
                      });
                    });
                  }
                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    },
    goToPay: function goToPay() {
      uni.navigateTo({
        url: "../account_recharge/account_recharge"
      });
    },
    showone: function showone() {
      var _this5 = this;
      var fone = this.option.device.substring(this.option.device.length - 2, this.option.device.length);
      var ftwo = this.option.port;
      this.dgnum = this.option.device.substr(-2, 1);
      this.bhdk = this.option.port;
      if ((fone == '05' || fone == '06' || fone == '07') && (ftwo == 'ff' || ftwo == 'FF') || this.option.from == 3 || this.dgnum == 9 && this.option.cmd == 0) {
        if (this.dgnum != 9) {
          this.oneshow = true;
        } else {
          if (this.option.cmd == 1) {
            this.oneshow = true;
          }
        }
        var data = {
          fromType: this.option.from,
          deviceId: this.option.device
        };
        this.$base.request('charge/ports', 'GET', data).then(function (res) {
          if (res.data.code == 200) {
            console.log('res.data', res.data);
            _this5.onelist = res.data.data.ports;
            _this5.sixnum = res.data.data.device;
            _this5.isAll = res.data.data.isAll;
          } else {
            _toast.default.fail('端口异常，请稍后再试！');
            _this5.back();
          }
        }).catch(function (err) {});
      } else {
        this.oneport = this.option.port;
        var port = Number(this.oneport) + 1;
        var t = (port + '').length;
        var s = '';
        for (var i = 0; i < 2 - t; i++) {
          s += '0';
        }
        port = s + port;
        if (this.oneport != 'ff' && this.oneport != 'FF') {
          this.portnum = port;
        } else {
          this.portnum = 'ff';
        }
        this.infoshow();
      }
      this.from = this.option.from;
    },
    // 根据设备号查询信息
    infoshow: function infoshow() {
      var _this6 = this;
      var data = {
        device: this.option.device,
        port: this.oneport,
        cmd: this.option.cmd
      };
      this.$base.request('charge/info', 'GET', data).then(function (res) {
        if (res.data.code == 200) {
          if (!_this6.isAll || _this6.chooesPortList.length < 1) {
            _this6.initWebSocket(); //开启原始版
          }

          if (res.data.data.userProjectId && res.data.data.userProjectId != '0') {
            var user = uni.getStorageSync('user');
            user.projectId = res.data.data.userProjectId;
            user.projectName = res.data.data.projectName;
            uni.setStorageSync('user', user);
          }
          if (res.data.data.deviceId) {
            _this6.deviceId = res.data.data.deviceId;
          }
          _this6.isVIP = res.data.data.isVIP;
          _this6.longCharge = res.data.data.longCharge;
          _this6.infolist = res.data.data;
          if (uni.getStorageSync('user').poster == 1 && _this6.ontime == 0) {
            if (_this6.point != 0 && uni.getStorageSync('user').projectId != 0 && _this6.postervip == 0) {
              var isInArray = _this6.point.some(function (item) {
                return item.point === "charge";
              });
              if (isInArray == true) {
                _this6.guanggao();
                _this6.ontime = 1;
              }
            } else {
              if (_this6.isSpan == true) {
                _this6.guanggao();
                _this6.ontime = 1;
              }
            }
          }
          _this6.areaId = res.data.data.areaId;
          _this6.projectId = res.data.data.projectId;
          _this6.shebeino = res.data.data.code;
          if (_this6.infolist.safeMoney && _this6.infolist.transfer == 1) {
            var data = {
              amount: 0,
              safeMoney: _this6.infolist.safeMoney,
              checkType: 0
            };
            _this6.$base.request('charge/check/safe', 'GET', data).then(function (res) {
              if (res.data.code == 200) {
                _this6.occas = res.data.data;
                if (!_this6.infolist.defaultSafe) {
                  _this6.checked = false;
                  _this6.bxname = '立即充电';
                } else {
                  if (_this6.occas == 0) {
                    _this6.checked = true;
                    _this6.bxname = '充电守护';
                  } else {
                    _this6.checked = false;
                    _this6.bxname = '立即充电';
                  }
                }
              }
            }).catch(function (err) {});
          }
          if (res.data.data.wechatImg) {
            _this6.erimg = _Config.Config.imgapi + res.data.data.wechatImg;
          }
          var data1 = {
            areaId: res.data.data.areaId,
            projectId: res.data.data.projectId
          };
          _this6.$base.request('charge/rate', 'GET', data1).then(function (res) {
            if (res.data.code == 200) {
              _this6.lbbtn();
              _this6.isFund = res.data.data.isFund;
              _this6.first = res.data.data.first;
              _this6.tapclass1 = res.data.data.first;
              _this6.second = res.data.data.second;
              _this6.third = res.data.data.third;
              _this6.fourth = res.data.data.fourth;
              _this6.isSpan = res.data.data.isSpan;
              _this6.monthlyList = res.data.data.monthlyList;
              _this6.oftenList = res.data.data.oftenList;
              _this6.temporaryList = res.data.data.temporaryList;
              _this6.firstOne = res.data.data.firstOne;
              _this6.tapclass2 = res.data.data.firstOne;
              _this6.fourthOne = res.data.data.fourthOne;
              _this6.secondOne = res.data.data.secondOne;
              _this6.thirdOne = res.data.data.thirdOne;
              _this6.disFirstOne = res.data.data.disFirstOne;
              _this6.disFourthOne = res.data.data.disFourthOne;
              _this6.disSecondOne = res.data.data.disSecondOne;
              _this6.disThirdOne = res.data.data.disThirdOne;
              _this6.temporaryDisFirst = res.data.data.temporaryDisFirst;
              _this6.temporaryDisFourth = res.data.data.temporaryDisFourth;
              _this6.temporaryDisSecond = res.data.data.temporaryDisSecond;
              _this6.temporaryDisThird = res.data.data.temporaryDisThird;
              _this6.oftenOccupyFree = res.data.data.oftenOccupyFree;
              _this6.oftenOccupyMax = res.data.data.oftenOccupyMax;
              _this6.oftenOccupyRate = res.data.data.oftenOccupyRate;
              _this6.temporaryOccupyFree = res.data.data.temporaryOccupyFree;
              _this6.temporaryOccupyMax = res.data.data.temporaryOccupyMax;
              _this6.temporaryOccupyRate = res.data.data.temporaryOccupyRate;
              _this6.monthlyOccupyFree = res.data.data.monthlyOccupyFree;
              _this6.monthlyOccupyMax = res.data.data.monthlyOccupyMax;
              _this6.monthlyOccupyRate = res.data.data.monthlyOccupyRate;
              _this6.isAutoStopOne = res.data.data.isAutoStopOne; //一元模式是否充满自停
              _this6.temporaryIsAutoStop = res.data.data.temporaryIsAutoStop; //临充是否充满自停
              _this6.projectServiceDetailList = res.data.data.projectServiceDetailList;
              _this6.endTimeStr = res.data.data.endTimeStr;
              _this6.temporaryDefaultAutoStop = res.data.data.temporaryDefaultAutoStop;
              _this6.lscmchecked = !!res.data.data.temporaryDefaultAutoStop;
              if (res.data.data.oftenOccupyFreeTime) {
                _this6.oftenOccupyFreeTime = res.data.data.oftenOccupyFreeTime;
              }
              if (res.data.data.temporaryOccupyFreeTime) {
                _this6.temporaryOccupyFreeTime = res.data.data.temporaryOccupyFreeTime;
              }
              if (res.data.data.monthlyOccupyFreeTime) {
                _this6.monthlyOccupyFreeTime = res.data.data.monthlyOccupyFreeTime;
              }
              if (_this6.endTimeStr) {
                _this6.xzchecked = '1';
              }
              if (res.data.data.oftenList.length > 0) {
                _this6.mtype = res.data.data.oftenList[0].types;
                _this6.onetype = res.data.data.oftenList[0].typesStr;
                _this6.fwnum = res.data.data.oftenList[0].num / 100;
                // this.steps=res.data.data.oftenList[0].steps
                if (res.data.data.oftenList[0].steps) {
                  _this6.steps = res.data.data.oftenList[0].steps;
                }
                _this6.flremarks1 = res.data.data.oftenRemarks;
                _this6.oftenMinMoney = res.data.data.oftenMinMoney;
                _this6.fuwumoney = res.data.data.oftenList[0].num / 100;
              }
              if (res.data.data.temporaryList.length > 0) {
                _this6.twotype = res.data.data.temporaryList[0].typesStr;
                _this6.flremarks2 = res.data.data.temporaryRemarks;
                _this6.temporaryMinMoney = res.data.data.temporaryMinMoney;
                if (res.data.data.oftenList.length == 0 && res.data.data.monthlyList.length == 0) {
                  _this6.tapbtn(2);
                }
              }
              if (res.data.data.monthlyList.length > 0) {
                _this6.bytype = res.data.data.monthlyList[0].types;
                _this6.threetype = res.data.data.monthlyList[0].typesStr;
                _this6.flremarks3 = res.data.data.monthlyRemarks;
              }
              _this6.minMoney = res.data.data.minMoney;
              if (_this6.monthlyList.length > 0) {
                _this6.showclass = 3;
                if (_this6.longCharge == 1) {
                  _this6.longcheck = false;
                  _this6.longshow = true;
                }
              } else if (_this6.oftenList.length > 0) {
                _this6.showclass = 1;
                if (_this6.longCharge == 1 && _this6.mtype != 'B4') {
                  _this6.longcheck = false;
                  _this6.longshow = true;
                }
              } else if (_this6.temporaryList.length > 0) {
                _this6.showclass = 2;
              }
              if (_this6.infolist.defaultSafe == 1 && _this6.occas == 0) {
                _this6.checked = true;
              } else {
                _this6.checked = false;
              }
              if (_this6.xcxtype == 0) {
                if (_this6.monthlyList.length == 0 && _this6.oftenList.length == 0 && _this6.temporaryList.length > 0) {
                  _dialog.default.confirm({
                    title: '提示',
                    message: '临时模式暂无法使用，请联系运营商'
                  }).then(function () {
                    _this6.back();
                  }).catch(function () {
                    return;
                    // on cancel
                  });
                }
              }
            } else {
              _this6.show = true;
              _this6.tanshow = 4;
              _this6.fourmsg = res.data.msg;
              return;
            }
          }).catch(function (err) {});
          if (false) {}
          _this6.getSafeMonth();
          if (res.data.data.popSafe == 1 && _this6.reassuring == 0) {
            _this6.shbyshow = true;
          }
        } else if (res.data.code == 201) {
          _this6.show = true;
          _this6.tanshow = 3;
          _this6.nearid = res.data.data.projectId;
        } else if (res.data.code == 701) {
          _this6.show = true;
          _this6.tanshow = 2;
          var item = res.data.data;
          var _data = {
            areaId: item.areaId,
            projectId: item.projectId,
            deviceId: _this6.option.device,
            port: _this6.oneport
          };
          _this6.yzdata = _data;
        } else if (res.data.code == 801) {
          // this.ws.close()
          // this.ws = null
          uni.redirectTo({
            url: '../personal_data/personal_data?device=' + _this6.option.device + '&port=' + _this6.oneport + '&zt=' + 0 + '&from=' + _this6.from + '&cmd=' + _this6.option.cmd
          });
        } else if (res.data.code == 901) {
          _this6.oneshow = true;
          var data = {
            fromType: _this6.option.from,
            deviceId: _this6.option.device
          };
          _this6.$base.request('charge/ports', 'GET', data).then(function (res) {
            if (res.data.code == 200) {
              _this6.onelist = res.data.data.ports;
              _this6.sixnum = res.data.data.device;
            } else {
              _toast.default.fail('端口异常，请稍后再试！');
              _this6.back();
            }
          }).catch(function (err) {});
        } else {
          _this6.show = true;
          _this6.tanshow = 4;
          _this6.fourmsg = res.data.msg;
        }
      }).catch(function (err) {});
    },
    //开始上电
    cdbtn: function cdbtn(vul) {
      var _this7 = this;
      if ((0, _clickThrottle.default)(1100)) {
        if (this.xychecked == false && this.xieyidata != {} && this.xieyidata.display == 1) {
          _dialog.default.confirm({
            title: '提示',
            message: '请阅读并勾选《' + this.xieyidata.agreementName + '》',
            confirmButtonText: '同意并勾选'
          }).then(function () {
            _this7.xychecked = true;
            _this7.cdbtn(vul);
          }).catch(function () {
            return;
            // on cancel
          });
        } else {
          var isBF = uni.getStorageSync('user').isBF;
          if (isBF == 1 && this.showclass == 2 && (this.bhdk == 'ff' || this.bhdk == 'FF')) {
            if (this.dgnum != 9) {
              this.oneshow = true;
              this.xuanbtn = vul;
            } else {
              if (this.option.cmd == 1) {
                this.oneshow = true;
                this.xuanbtn = vul;
              }
            }
            var data = {
              fromType: this.option.from,
              deviceId: this.option.device
            };
            this.$base.request('charge/ports', 'GET', data).then(function (res) {
              if (res.data.code == 200) {
                _this7.onelist = res.data.data.ports;
                _this7.sixnum = res.data.data.device;
              } else {
                _toast.default.fail('端口异常，请稍后再试！');
                _this7.back();
              }
            }).catch(function (err) {});
          } else {
            if (this.infolist.isMonthBye == false && this.infolist.safeAllStafus == 1 && this.reassuring == 0 && (this.infolist.transfer == 1 && this.infolist.monthSafe == 1 || this.infolist.transfer == 1 && this.infolist.monthSafe == 0 || this.infolist.monthSafe == 1 && this.infolist.transfer == 0)) {
              if (this.infolist.displayButton == 0 && (this.infolist.transfer == 1 && this.infolist.monthSafe == 1 || this.infolist.transfer == 1 && this.infolist.monthSafe == 0)) {
                if (this.checked == true) {
                  this.tapcdb();
                } else {
                  if (this.infolist.twoWarn == 0) {
                    this.isSafe = 0;
                    this.cdbtnson();
                  } else {
                    if (this.occas == 0) {
                      this.seluser();
                      this.warnshow = true;
                    } else {
                      this.isSafe = 0;
                      this.cdbtnson();
                    }
                  }
                }
              } else if (this.infolist.displayButton == 1 && (this.infolist.transfer == 1 && this.infolist.monthSafe == 1 || this.infolist.transfer == 1 && this.infolist.monthSafe == 0)) {
                if (vul == 1) {
                  this.tapcdb();
                } else {
                  if (this.infolist.twoWarn == 0) {
                    this.isSafe = 0;
                    this.cdbtnson();
                  } else {
                    if (this.occas == 0) {
                      this.seluser();
                      this.warnshow = true;
                    } else {
                      this.isSafe = 0;
                      this.cdbtnson();
                    }
                  }
                }
              } else if (this.infolist.transfer == 0 && this.infolist.monthSafe == 1) {
                this.isSafe = 0;
                this.cdbtnson();
              }
            } else if (this.infolist.isMonthBye == false && (this.infolist.transfer == 0 && this.infolist.monthSafe == 0 || this.infolist.safeAllStafus == 0 || this.infolist.safeAllStafus == 0 && this.reassuring == 0 || this.reassuring == 1)) {
              this.isSafe = 0;
              this.cdbtnson();
            } else if (this.infolist.isMonthBye == true) {
              this.isSafe = 1;
              this.cdbtnson();
            }
          }
        }
      } else {
        _toast.default.fail('请勿重复点击');
        return;
      }
    },
    tapcdb: function tapcdb() {
      var _this8 = this;
      if (this.showclass == 2) {
        this.isSafe = 1;
        this.cdbtnson();
      } else {
        var amount = 0;
        if (this.showclass == 1) {
          this.chargeType = this.oftenList[0].types;
        } else if (this.showclass == 2) {
          this.chargeType = this.temporaryList[0].types;
        } else if (this.showclass == 3) {
          this.chargeType = this.monthlyList[0].types;
        }
        if (this.showclass == 1 && this.chargeType == 'B4') {
          if (this.tapclass2 == 'a') {
            if (!/(^[1-9]\d*$)/.test(Number(this.handm)) && Number(this.handm) || !Number(this.handm)) {
              _toast.default.fail('请输入整数金额');
              return;
            }
            if (Number(this.handm) && (Number(this.handm) > 20 || Number(this.handm) < 1)) {
              _toast.default.fail('请输入1至20之间的金额(包含20)');
              return;
            }
            amount = Number(this.handm);
          } else {
            amount = this.tapclass2;
          }
        } else {
          amount = 0;
        }
        var data = {
          amount: amount,
          safeMoney: this.infolist.safeMoney,
          checkType: 1
        };
        this.$base.request('charge/check/safe', 'GET', data).then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data == 1) {
              _dialog.default.confirm({
                title: '提示',
                message: '您已选择“守护充电”服务，当前基本账户余额不足，是否现在去充值？\n提示：您如果不想购买“守护充电”服务，可以取消后再进行充电操作。',
                messageAlign: 'left'
              }).then(function () {
                uni.navigateTo({
                  url: '../account_recharge/account_recharge?powerontype=' + 1
                });
              }).catch(function () {
                // on cancel
              });
            } else {
              _this8.isSafe = 1;
              _this8.cdbtnson();
            }
          } else {
            _toast.default.fail(res.data.msg);
            return;
          }
        }).catch(function (err) {});
      }
    },
    cdbtnson: function cdbtnson() {
      var _this9 = this;
      var endTime = uni.getStorageSync('user').endTime;
      // this.initWebSocket()
      if (this.showclass != 3 && endTime != null && this.monthlyList.length > 0) {
        _dialog.default.confirm({
          title: '提示',
          message: '系统检测到您已购买包月套餐,使用“常用或临时模式”会产生扣费，是否确认'
        }).then(function () {
          if (_this9.showclass == 2) {
            _dialog.default.confirm({
              title: '提示',
              message: '您选择的是“临时充电”模式，如果上电不成功，系统会在30分钟内自动退款，确认充电吗？'
            }).then(function () {
              setTimeout(function () {
                _this9.lsshow();
              }, 500);
            }).catch(function () {
              // on cancel
            });
          } else {
            if (_this9.showclass == 3) {
              _this9.$base.request('charge/check', 'GET').then(function (res) {
                if (res.data.code == 200) {
                  if (res.data.data.isAlert == 1) {
                    _this9.gbshow = true;
                  } else {
                    setTimeout(function () {
                      _this9.cyshow();
                    }, 500);
                  }
                }
              }).catch(function (err) {});
            } else {
              setTimeout(function () {
                _this9.cyshow();
              }, 500);
            }
          }
        }).catch(function () {
          setTimeout(function () {
            _this9.showclass = 3;
          }, 500);
        });
      } else {
        if (this.showclass == 2) {
          _dialog.default.confirm({
            title: '提示',
            message: '您选择的是“临时充电”模式，如果上电不成功，系统会在30分钟内自动退款，确认充电吗？'
          }).then(function () {
            setTimeout(function () {
              _this9.lsshow();
            }, 500);
          }).catch(function () {
            // on cancel
          });
        } else {
          if (this.showclass == 3) {
            this.$base.request('charge/check', 'GET').then(function (res) {
              if (res.data.code == 200) {
                if (res.data.data.isAlert == 1) {
                  _this9.gbshow = true;
                } else {
                  setTimeout(function () {
                    _this9.cyshow();
                  }, 500);
                }
              }
            }).catch(function (err) {});
          } else {
            setTimeout(function () {
              _this9.cyshow();
            }, 500);
          }
        }
      }
    },
    //临时充电调用接口
    lsshow: function lsshow() {
      if (this.isAll && this.chooesPortList.length > 0) {
        this.$base.prompt("提示", "一键开柜无法使用临时上电", function () {}, function () {});
        return;
      }
      // var safe = 0
      // if (this.checked&&this.infolist.transfer==1) {
      // 	safe = 1
      // } else {
      // 	safe = 0
      // }
      var lscm = 0;
      if (this.lscmchecked == false) {
        lscm = 0;
      } else {
        lscm = 1;
      }
      var data = {
        areaId: this.areaId,
        devicePort: this.deviceId + this.oneport,
        pear: this.tapclass1,
        projectid: this.projectId,
        safe: this.isSafe,
        isAutoStop: lscm,
        defaultAutoStop: 0
      };
      uni.showLoading({
        title: '请稍候',
        mask: true
      });
      var _this = this;
      _this.$base.request('order/temsave', 'POST', data).then(function (res) {
        uni.hideLoading();
        if (res.data.code == 200) {
          var arr = res.data.data;

          // 使用uni-app标准支付API
          uni.requestPayment({
            provider: 'wxpay',
            // 服务提供商
            timeStamp: arr.timeStamp,
            // 时间戳
            nonceStr: arr.nonceStr,
            // 随机字符串
            package: arr.wpackage,
            signType: arr.signType,
            // 签名算法
            paySign: arr.paySign,
            // 签名
            success: function success(res) {
              console.log('临时充电支付成功', res);
              // 支付成功后设置定时器等待充电结果
              _this.timeId = setTimeout(function () {
                //20秒之后没推过来关闭 弹窗
                uni.hideLoading();
                _this.timeId = null; // 清空定时器引用
                _this.$base.prompt('温馨提示', '因网络原因，您此次充电可能不成功，如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次', function () {
                  _this.back();
                }, function () {
                  _this.back();
                });
              }, 20000);
            },
            fail: function fail(err) {
              console.log('临时充电支付失败', err);
              uni.hideLoading();
              _toast.default.fail('支付失败，请重试');
            }
          });
        } else {
          _toast.default.fail(res.data.msg);
        }
      }).catch(function (err) {
        _this.$base.prompt('提示', '开始充电接口无响应', function () {}, function () {});
        uni.hideLoading();
      });
    },
    //常用充电调用接口
    cyshow: function cyshow() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var chang, span, data, onec, res, tempTime, _iterator, _step, _loop;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // var reg = /.*\..*/;
                // if (reg.test(this.handshu)) {
                // 	Toast.fail('请输入整数时长')
                // 	return
                // }
                chang = 0;
                if (_this10.longcheck == false) {
                  chang = 0;
                } else {
                  chang = 1;
                }
                if (!(_this10.mtype != 'B4' && _this10.showclass == 1)) {
                  _context2.next = 12;
                  break;
                }
                if (!(_this10.tapclass == 6)) {
                  _context2.next = 11;
                  break;
                }
                if (!(!/(^[1-9]\d*$)/.test(Number(_this10.handshu)) && Number(_this10.handshu) || !Number(_this10.handshu))) {
                  _context2.next = 7;
                  break;
                }
                _toast.default.fail('请输入整数时长');
                return _context2.abrupt("return");
              case 7:
                if (!_this10.handshu) {
                  _context2.next = 11;
                  break;
                }
                if (!(Number(_this10.handshu) > 18 || Number(_this10.handshu) < 1)) {
                  _context2.next = 11;
                  break;
                }
                _toast.default.fail('充电时长应在1-18小时之内');
                return _context2.abrupt("return");
              case 11:
                if (_this10.tapclass == 1) {
                  _this10.time = 0;
                } else if (_this10.tapclass == 2) {
                  _this10.time = 14400;
                } else if (_this10.tapclass == 3) {
                  _this10.time = 21600;
                } else if (_this10.tapclass == 4) {
                  _this10.time = 28800;
                } else if (_this10.tapclass == 5) {
                  _this10.time = 36000;
                } else if (_this10.tapclass == 6) {
                  _this10.time = 3600 * Number(_this10.handshu);
                }
              case 12:
                if (_this10.showclass == 1) {
                  _this10.chargeType = _this10.oftenList[0].types;
                } else if (_this10.showclass == 2) {
                  _this10.chargeType = _this10.temporaryList[0].types;
                } else if (_this10.showclass == 3) {
                  _this10.chargeType = _this10.monthlyList[0].types;
                } else if (_this10.showclass == 4) {
                  _this10.chargeType = _this10.isVIP;
                }
                span = '';
                if (_this10.isSpan == false) {
                  span = 1;
                } else if (_this10.isSpan == true) {
                  span = 2;
                }
                if (_this10.chargeType == 'B2' || _this10.chargeType == 'B5') {
                  if (_this10.xzchecked == '1') {
                    _this10.serviceType = 1;
                  } else if (_this10.xzchecked == '2') {
                    _this10.serviceType = 0;
                  }
                } else {
                  _this10.serviceType = '';
                }
                data = {};
                if (!(_this10.mtype == 'B4' && _this10.showclass == 1)) {
                  _context2.next = 33;
                  break;
                }
                onec = 0;
                if (_this10.onecmchecked == false) {
                  onec = 0;
                } else {
                  onec = 1;
                }
                if (!(_this10.tapclass2 == 'a')) {
                  _context2.next = 30;
                  break;
                }
                if (!(!/(^[1-9]\d*$)/.test(Number(_this10.handm)) && Number(_this10.handm) || !Number(_this10.handm))) {
                  _context2.next = 24;
                  break;
                }
                _toast.default.fail('请输入整数金额');
                return _context2.abrupt("return");
              case 24:
                if (!(Number(_this10.handm) && (Number(_this10.handm) > 20 || Number(_this10.handm) < 1))) {
                  _context2.next = 27;
                  break;
                }
                _toast.default.fail('请输入1至20之间的金额(包含20)');
                return _context2.abrupt("return");
              case 27:
                data = {
                  time: 0,
                  device: _this10.option.device,
                  cmd: _this10.option.cmd,
                  chargeType: _this10.chargeType,
                  isSpan: span,
                  port: _this10.oneport,
                  amount: Number(_this10.handm),
                  isSafe: _this10.isSafe,
                  isAutoStop: onec,
                  defaultAutoStop: 0,
                  longCharge: chang,
                  serviceType: _this10.serviceType
                };
                _context2.next = 31;
                break;
              case 30:
                data = {
                  time: 0,
                  device: _this10.option.device,
                  cmd: _this10.option.cmd,
                  chargeType: _this10.chargeType,
                  isSpan: span,
                  port: _this10.oneport,
                  amount: _this10.tapclass2,
                  isSafe: _this10.isSafe,
                  isAutoStop: onec,
                  defaultAutoStop: 0,
                  longCharge: chang,
                  serviceType: _this10.serviceType
                };
              case 31:
                _context2.next = 34;
                break;
              case 33:
                data = {
                  time: _this10.time,
                  device: _this10.option.device,
                  cmd: _this10.option.cmd,
                  chargeType: _this10.chargeType,
                  isSpan: span,
                  port: _this10.oneport,
                  isSafe: _this10.isSafe,
                  isAutoStop: 0,
                  defaultAutoStop: 0,
                  longCharge: chang,
                  serviceType: _this10.serviceType
                };
              case 34:
                _context2.next = 36;
                return _this10.checkMaxChargeTime({
                  chargeTime: data.time,
                  chargeType: data.chargeType
                });
              case 36:
                res = _context2.sent;
                if (res.code === 200) {
                  if (data.chargeType === 'B1' && res.maxChargeTime && Number(data.time) === 0) data.maxChargeTime = res.maxChargeTime;
                  if (data.chargeType === 'B1' && res.maxChargeTime && Number(data.time) !== 0) data.time = res.maxChargeTime;
                  uni.showLoading({
                    title: '请稍候',
                    mask: true
                  });
                  // 清除旧的定时器
                  if (_this10.timeId) {
                    clearTimeout(_this10.timeId);
                    _this10.timeId = null;
                  }

                  // 设置新的定时器
                  _this10.timeId = setTimeout(function () {
                    //20秒之后没推过来关闭 弹窗
                    uni.hideLoading();
                    _this10.timeId = null; // 清空定时器引用
                    _this10.$base.prompt('温馨提示', '因网络原因，您此次充电可能不成功，如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次', function () {
                      _this10.back();
                    }, function () {
                      _this10.back();
                    });
                  }, 20000);
                  if (!_this10.isAll) {
                    uni.showLoading({
                      title: "请稍候",
                      mask: true
                    });
                    // 清除旧的定时器
                    if (_this10.timeId) {
                      clearTimeout(_this10.timeId);
                      _this10.timeId = null;
                    }

                    // 设置新的定时器
                    _this10.timeId = setTimeout(function () {
                      //20秒之后没推过来关闭 弹窗
                      uni.hideLoading();
                      _this10.timeId = null; // 清空定时器引用
                      _this10.$base.prompt("温馨提示", "因网络原因，您此次充电可能不成功，如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次", function () {
                        _this10.back();
                      }, function () {
                        _this10.back();
                      });
                    }, 20000);
                  }
                  if (_this10.isAll && _this10.chooesPortList.length >= 1) {
                    //一键开门循环调用上电
                    tempTime = 100;
                    _iterator = _createForOfIteratorHelper(_this10.chooesPortList);
                    try {
                      _loop = function _loop() {
                        var item = _step.value;
                        tempTime += 3000;
                        setTimeout(function () {
                          if (item < 9) {
                            _this10.oneport = "0" + String(item);
                          } else {
                            _this10.oneport = String(item);
                          }
                          data.port = _this10.oneport;
                          _this10.$base.request("charge/start", "GET", data).then(function (res) {
                            if (res.data.msg == "不允许重复提交，请稍后再试") {
                              clearTimeout(_this10.timeId);
                              uni.hideLoading();
                              _toast.default.fail("系统繁忙，请稍后再试");
                            }
                            // this.initWebSocket()
                          }).catch(function (err) {
                            _this10.$base.prompt("提示", "开始充电接口无响应", function () {}, function () {});
                            uni.hideLoading();
                          });
                        }, tempTime);

                        // console.log("123");
                      };
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        _loop();
                      }
                      // console.log("456");
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                    setTimeout(function () {
                      _toast.default.success("上电成功");
                      uni.redirectTo({
                        url: "../index/index"
                      });
                    }, tempTime);
                  } else {
                    _this10.$base.request("charge/start", "GET", data).then(function (res) {
                      if (res.data.msg == "不允许重复提交，请稍后再试") {
                        clearTimeout(_this10.timeId);
                        uni.hideLoading();
                        _toast.default.fail("系统繁忙，请稍后再试");
                      }
                      // this.initWebSocket()
                    }).catch(function (err) {
                      _this10.$base.prompt("提示", "开始充电接口无响应", function () {}, function () {});
                      uni.hideLoading();
                    });
                  }
                }
              case 38:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    //   初次位置授权
    getAuthorize: function getAuthorize() {
      return new Promise(function (resolve, reject) {
        uni.authorize({
          scope: "scope.userLocation",
          success: function success() {
            resolve(); // 允许授权
          },

          fail: function fail() {
            reject(); // 拒绝授权
          }
        });
      });
    },
    // 确认授权后，获取用户位置
    getLocationInfo: function getLocationInfo() {
      var that = this;
      uni.getLocation({
        type: "gcj02",
        success: function success(res) {
          that.showMap(res.latitude, res.longitude);
        }
      });
    },
    // 拒绝授权后，弹框提示是否手动打开位置授权
    openConfirm: function openConfirm() {
      return new Promise(function (resolve, reject) {
        uni.showModal({
          title: "请求授权当前位置",
          content: "我们需要获取地理位置信息，为您推荐附近的充电站",
          success: function success(res) {
            if (res.confirm) {
              uni.openSetting().then(function (res) {
                if (res[1].authSetting["scope.userLocation"] === true) {
                  resolve(); // 打开地图权限设置
                } else {
                  reject();
                }
              });
            } else if (res.cancel) {
              reject();
            }
          }
        });
      });
    },
    // 彻底拒绝位置获取
    rejectGetLocation: function rejectGetLocation() {
      uni.showToast({
        title: "您拒绝了授权，无法获得周边信息",
        icon: "none",
        duration: 2000
      });
    },
    //包月套餐提示
    byque: function byque() {
      this.cyshow();
      this.gbshow = false;
    },
    bycolose: function bycolose() {
      this.gbshow = false;
    },
    bygo: function bygo() {
      var _this11 = this;
      uni.showLoading({
        title: '请稍候',
        mask: true
      });
      var type = '1';
      var tapshow = '3';
      setTimeout(function () {
        uni.hideLoading();
        uni.navigateTo({
          url: '../account_recharge/account_recharge?type=' + type + '&tapshow=' + tapshow + '&areaId=' + _this11.areaId + '&upshow=' + 1
        });
      }, 1200);
    },
    timebtn: function timebtn() {
      this.back();
    },
    showMap: function showMap(latitude, longitude) {
      var data = {
        deviceId: this.deviceId,
        latitude: latitude,
        longitude: longitude
      };
      this.$base.request('nearby/location', 'PUT', data).then(function (res) {}).catch(function (err) {});
    },
    //选择端口调用接口
    montbtn: function montbtn(vul) {
      this.mshow = vul;
      if (vul == 0) {
        this.dknum = '00';
      } else if (vul = 1) {
        this.dknum = '01';
      }
    },
    // 开门
    open: function open() {
      var _this12 = this;
      if (this.chooesPortList.length <= 0) {
        _toast.default.fail("请先选择端口");
        return;
      }
      if (this.chooesPortList.length > 0 && this.chooesPortList.length == 1) {
        var temp = this.chooesPortList[0];
        if (temp < 9) {
          this.portnum = "0" + String(Number(temp) + 1);
        } else {
          this.portnum = String(Number(temp) + 1);
        }
      } else {
        this.portnum = "多选";
      }
      var tempList = [];
      this.chooesPortList.sort(function (a, b) {
        return a - b;
      }).forEach(function (item) {
        if (item < 9) {
          tempList.push("0" + String(Number(item) + 1));
        } else {
          tempList.push(String(Number(item) + 1));
        }
      });
      var tempText = tempList.join(",");
      this.oneshow = false;
      this.sureText = "\u786E\u5B9A\u5F00\u542F".concat(tempText, "\u67DC\u95E8\u5417\uFF1F");
      // this.sureOpenShow = true;

      _dialog.default.confirm({
        title: this.sureText,
        message: "因网络连接问题，可能存在部分柜门开启失败， 届时请重新扫码开启！",
        confirmButtonColor: "#EC651C",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(function () {
        _this12.sureOpen();
      }).catch(function () {
        // on cancel
        _this12.cancelOpen();
      });
    },
    // 一键开门
    oneKeyOpen: function oneKeyOpen() {
      var _this13 = this;
      this.chooesPortList = [];
      this.onelist.forEach(function (item, index) {
        if (item.status == "空闲") {
          _this13.chooesPortList.push(index);
        }
      });
      this.portnum = "全选";
      this.sureText = "确定一键打开所有柜门吗？";
      this.oneshow = false;
      // this.sureOpenShow = true;

      _dialog.default.confirm({
        title: this.sureText,
        message: "因网络连接问题，可能存在部分柜门开启失败， 届时请重新扫码开启！",
        confirmButtonColor: "#EC651C",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(function () {
        _this13.sureOpen();
      }).catch(function () {
        // on cancel
        _this13.cancelOpen();
      });
    },
    // 取消多选开门或一键开门
    cancelOpen: function cancelOpen() {
      this.sureOpenShow = false, this.oneshow = true;
    },
    // 确认开门
    sureOpen: function sureOpen() {
      var _this14 = this;
      console.log(this.chooesPortList);
      this.chooesPortList.forEach(function (item) {
        if (item < 9) {
          _this14.oneport = "0" + String(item);
        } else {
          _this14.oneport = String(item);
        }
      });
      this.sureOpenShow = false;
      this.bhdk = this.oneport;
      var isBF = uni.getStorageSync("user").isBF;
      if (isBF == 1 && this.showclass == 2) {
        this.cdbtn(this.xuanbtn);
      } else {
        this.infoshow();
      }
    },
    //选择端口调用接口
    montbtn1: function montbtn1(vul, status) {
      if (status == "空闲" || status == "") {
        if (this.isAll) {
          if (!this.chooesPortList.includes(vul)) {
            this.chooesPortList.push(vul);
          } else {
            var index = this.chooesPortList.indexOf(vul);
            if (index != -1) {
              this.chooesPortList.splice(index, 1);
            }
          }
        } else {
          if (vul < 9) {
            this.oneport = "0" + String(vul);
            this.portnum = "0" + String(Number(vul) + 1);
          } else {
            this.oneport = String(vul);
            this.portnum = String(Number(vul) + 1);
          }
          this.oneshow = false;
          this.bhdk = this.oneport;
          var isBF = uni.getStorageSync("user").isBF;
          if (isBF == 1 && this.showclass == 2) {
            this.cdbtn(this.xuanbtn);
          } else {
            this.infoshow();
          }
        }
      } else if (status == "禁用") {
        _toast.default.fail("该端口已被禁用，请选择其他空闲端口");
        return;
      } else if (status == "绑定") {
        _toast.default.fail("该端口已被绑定，请选择其他空闲端口");
        return;
      } else if (status == "已充满") {
        _toast.default.fail("该端口充满占用，请选择其他空闲端口");
        return;
      } else {
        _toast.default.fail("该端口已被占用，请选择其他空闲端口");
        return;
      }
    },
    pad: function pad(num, n) {
      var len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    dkshowbtn: function dkshowbtn() {
      var _this15 = this;
      var chang = 0;
      if (this.longcheck == false) {
        chang = 0;
      } else {
        chang = 1;
      }
      this.duanshow = false;
      if (this.tapclass == 1) {
        this.time = 0;
      } else if (this.tapclass == 2) {
        this.time = 14400;
      } else if (this.tapclass == 3) {
        this.time = 21600;
      } else if (this.tapclass == 4) {
        this.time = 28800;
      } else if (this.tapclass == 5) {
        this.time = 36000;
      } else if (this.tapclass == 6) {
        this.time = 3600 * this.handshu;
      }
      if (this.showclass == 1) {
        this.chargeType = this.oftenList[0].types;
      } else if (this.showclass == 2) {
        this.chargeType = this.temporaryList[0].types;
      } else if (this.showclass == 3) {
        this.chargeType = this.monthlyList[0].types;
      }
      var span = '';
      if (this.isSpan == false) {
        span = 1;
      } else if (this.isSpan == true) {
        span = 2;
      }
      if (this.chargeType == 'B2' || this.chargeType == 'B5') {
        if (this.xzchecked == '1') {
          this.serviceType = 1;
        } else if (this.xzchecked == '2') {
          this.serviceType = 0;
        }
      } else {
        this.serviceType = '';
      }
      var data = {};
      if (this.mtype == 'B4' && this.showclass == 1) {
        var onec = 0;
        if (this.onecmchecked == false) {
          onec = 0;
        } else {
          onec = 1;
        }
        if (this.tapclass2 == 'a') {
          if (!/(^[1-9]\d*$)/.test(Number(this.handm)) && Number(this.handm) || !Number(this.handm)) {
            _toast.default.fail('请输入整数金额');
            return;
          }
          if (Number(this.handm) && (Number(this.handm) > 20 || Number(this.handm) < 1)) {
            _toast.default.fail('请输入1至20之间的金额(包含20)');
            return;
          }
          data = {
            time: 0,
            device: this.option.device,
            cmd: this.option.cmd,
            chargeType: this.chargeType,
            isSpan: span,
            port: this.dknum,
            amount: Number(this.handm),
            isSafe: this.isSafe,
            isAutoStop: onec,
            defaultAutoStop: 0,
            longCharge: chang,
            serviceType: this.serviceType
          };
        } else {
          data = {
            time: 0,
            device: this.option.device,
            cmd: this.option.cmd,
            chargeType: this.chargeType,
            isSpan: span,
            port: this.dknum,
            amount: this.tapclass2,
            isSafe: this.isSafe,
            isAutoStop: onec,
            defaultAutoStop: 0,
            longCharge: chang,
            serviceType: this.serviceType
          };
        }
      } else if (this.showclass == 2) {
        var lscm = 0;
        if (this.lscmchecked == false) {
          lscm = 0;
        } else {
          lscm = 1;
        }
        data = {
          time: 0,
          device: this.option.device,
          cmd: this.option.cmd,
          chargeType: this.chargeType,
          isSpan: span,
          port: this.dknum,
          amount: this.amount,
          userId: this.userId,
          isSafe: this.isSafe,
          rechargeNo: this.rechargeNo,
          isAutoStop: lscm,
          defaultAutoStop: 0,
          longCharge: chang,
          serviceType: this.serviceType
        };
      } else {
        data = {
          time: this.time,
          device: this.option.device,
          cmd: this.option.cmd,
          chargeType: this.chargeType,
          isSpan: span,
          port: this.dknum,
          userId: this.userId,
          rechargeNo: this.rechargeNo,
          isSafe: this.isSafe,
          isAutoStop: 0,
          defaultAutoStop: 0,
          longCharge: chang,
          serviceType: this.serviceType
        };
      }
      uni.showLoading({
        title: '请稍候',
        mask: true
      });
      // 清除旧的定时器
      if (this.timeId) {
        clearTimeout(this.timeId);
        this.timeId = null;
      }

      // 清除退款定时器
      if (this.refundId) {
        clearTimeout(this.refundId);
        this.refundId = null;
      }

      // 设置新的定时器
      this.timeId = setTimeout(function () {
        //20秒之后没推过来关闭 弹窗
        uni.hideLoading();
        _this15.timeId = null; // 清空定时器引用
        _this15.$base.prompt('温馨提示', '因网络原因，您此次充电可能不成功，如已开始充电，请留意随后的微信消息提示，如未开始充电，请重试一次', function () {
          _this15.back();
        }, function () {
          _this15.back();
        });
      }, 20000);
      this.$base.request('charge/start', 'GET', data).then(function (res) {
        if (res.data.msg == '不允许重复提交，请稍后再试') {
          clearTimeout(_this15.timeId);
          uni.hideLoading();
          _toast.default.fail('系统繁忙，请稍后再试');
        }
        // this.initWebSocket()
        // this.duanshow = false
      }).catch(function (err) {
        _this15.$base.prompt('提示', '开始充电接口无响应', function () {}, function () {});
        uni.hideLoading();
      });
    },
    //websocket  原始版
    initWebSocket: function initWebSocket() {
      var _this16 = this;
      //初始化weosocket
      var wsuri = _Config.Config.wx + uni.getStorageSync('userId');
      this.ws = uni.connectSocket({
        url: wsuri,
        //仅为示例，并不是真实接口地址。
        success: function success(data) {
          console.log("websocket连接成功");
        }
      });
      // 监听开启websocket开启 并发送数据
      this.ws.onOpen(function () {
        console.log('websocket链接开启');
        _this16.webIsTrue = true;
      });
      this.ws.onMessage(function (res) {
        console.log('websocket链接数据返回信息', res);
        var res0 = JSON.parse(res.data);

        // 清除所有定时器，防止页面离开后仍然触发
        if (_this16.timeId) {
          clearTimeout(_this16.timeId);
          _this16.timeId = null;
          console.log('WebSocket响应时清除timeId定时器');
        }
        if (_this16.refundId) {
          clearTimeout(_this16.refundId);
          _this16.refundId = null;
          console.log('WebSocket响应时清除refundId定时器');
        }
        if (res0.code == 200) {
          //充电成功
          if (_this16.isAll) {
            uni.navigateTo({
              url: "../index/index"
            });
          }
          uni.hideLoading();
          _toast.default.success('充电成功');
          setTimeout(function () {
            uni.redirectTo({
              url: "../chargingzhong_detail/chargingzhong_detail?codetype=0&id=".concat(res0.id, "&projectId=").concat(_this16.infolist.projectId)
            });
            _this16.ontime = 0;
          }, 1200);
        } else if (res0.code == '0D' || res0.code == '05' || res0.code == '07') {
          _toast.default.fail(res0.msg);
          var type = '1';
          var tapshow = '3';
          setTimeout(function () {
            uni.navigateTo({
              url: '../account_recharge/account_recharge?type=' + type + '&tapshow=' + tapshow + '&areaId=' + _this16.areaId + '&upshow=' + 1
            });
          }, 1200);
        } else if (res0.code == '101') {
          _this16.duanshow = true;
          uni.hideLoading();
          _this16.refundId = setTimeout(function () {
            _this16.duanshow = false;
            var data = {
              ornum: _this16.ornum
            };
            uni.showLoading({
              title: '请稍候',
              mask: true
            });
            _this16.$base.request('refund/refund', 'POST', data).then(function (res1) {
              if (res1.data.code == 200) {
                uni.hideLoading();
                _toast.default.success('退款成功');
                _this16.back();
              } else {
                _toast.default.fail(res1.data.msg);
                _this16.back();
              }
            }).catch(function (err) {});
          }, 100000);
          if (res0.userId) {
            _this16.userId = res0.userId;
          }
          if (res0.amount) {
            _this16.amount = res0.amount;
          }
          if (res0.rechargeNo) {
            _this16.rechargeNo = res0.rechargeNo;
            _this16.ornum = res0.rechargeNo;
          }
        } else if (res0.code == '06') {
          //余额不足
          uni.hideLoading();
          _dialog.default.confirm({
            title: '提示',
            message: res0.msg
          }).then(function () {
            uni.navigateTo({
              url: '../account_recharge/account_recharge?powerontype=' + 1
            });
          }).catch(function () {
            // on cancel
          });
        } else if (res0.code == '0C') {
          uni.hideLoading();
          var phone = uni.getStorageSync('user').projectPhone;
          _dialog.default.confirm({
            title: '提示',
            message: '您当前属于跨区充电，资金池余额不足，请点击确认联系您绑定的小区运营商'
          }).then(function () {
            uni.makePhoneCall({
              phoneNumber: phone
            });
          }).catch(function () {
            // on cancel
          });
        } else if (res0.code == '0G') {
          uni.hideLoading();
          _dialog.default.confirm({
            title: '提示',
            message: res0.msg
          }).then(function () {
            _this16.fwtan = true;
          });
        } else if (res0.code == '0H') {
          uni.hideLoading();
          _dialog.default.confirm({
            title: '提示',
            message: res0.msg
          }).then(function () {
            _this16.xzchecked = '2';
          });
        } else {
          uni.hideLoading();
          _toast.default.fail(res0.msg);
        }
      });
      this.ws.onClose(function (e) {
        // 关闭 websocket
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean);
        _this16.webIsTrue = false;
        if (_this16.ws != null) {
          _this16.initWebSocket();
        }
      });
      this.ws.onError(function (e) {
        console.log(e, 'WebSocket发生错误');
      });
    },
    //模式选择按钮
    tapbtn: function tapbtn(val) {
      this.showclass = val;
      this.longcheck = false;
      if (this.infolist.defaultSafe == 1 && this.occas == 0) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      if (val == 2) {
        this.handbtn1(1);
        this.longshow = false;
      } else if (val == 1) {
        if (this.longCharge == 1 && this.tapclass == 1 && this.mtype != 'B4') {
          this.longshow = true;
        } else {
          this.longshow = false;
        }
      } else if (val == 3) {
        if (this.longCharge == 1) {
          this.longshow = true;
        } else {
          this.longshow = false;
        }
      }
    },
    //小时选择按钮
    handbtn: function handbtn(val) {
      this.tapclass = val;
      this.longcheck = false;
      if (this.longCharge == 1 && this.tapclass == 1) {
        this.longshow = true;
      } else {
        this.longshow = false;
      }
    },
    //金额选择按钮
    handbtn2: function handbtn2(val) {
      this.tapclass2 = val;
    },
    onInput: function onInput(e) {
      var reg = /.*\..*/;
      if (reg.test(e.detail.value)) {
        _toast.default.fail('请输入整数时长');
        return;
      }
    },
    onInput1: function onInput1(e) {
      var num = e.detail.value;
      // var reg = /.*\..*/;
      if (!/(^[1-9]\d*$)/.test(num) && num) {
        _toast.default.fail('请输入整数金额');
        this.dishandm = 0;
        return;
      }
      if (num && (num > 20 || num < 1)) {
        _toast.default.fail('请输入1至20之间的金额(包含20)');
        this.dishandm = 0;
        return;
      }
      function sortNumber(a, b) {
        //升序
        return a - b;
      }
      var m = new Map();
      m.set(this.firstOne, this.disFirstOne);
      m.set(this.secondOne, this.disSecondOne);
      m.set(this.thirdOne, this.disThirdOne);
      m.set(this.fourthOne, this.disFourthOne);
      var arr1 = [this.firstOne, this.secondOne, this.thirdOne, this.fourthOne, Number(num)];
      arr1.sort(sortNumber);
      function unique1(arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
          if (hash.indexOf(arr[i]) == -1) {
            hash.push(arr[i]);
          }
        }
        return hash;
      }
      arr1 = unique1(arr1);
      if (arr1.length == 4) {
        this.dishandm = m.get(Number(num));
      } else {
        var i = arr1.indexOf(Number(num));
        if (i == 0) {
          this.dishandm = 0;
        } else {
          this.dishandm = m.get(arr1[i - 1]);
        }
      }
    },
    //金额选择按钮2
    handbtn1: function handbtn1(val) {
      if (val == 1) {
        this.hsmoney = this.first;
        this.hsfl = this.temporaryDisFirst;
      } else if (val == 2) {
        this.hsmoney = this.second;
        this.hsfl = this.temporaryDisSecond;
      } else if (val == 3) {
        this.hsmoney = this.third;
        this.hsfl = this.temporaryDisThird;
      } else if (val == 4) {
        this.hsmoney = this.fourth;
        this.hsfl = this.temporaryDisFourth;
      }
      this.tapclass1 = val;
    },
    //关闭费率弹窗
    flshowclose: function flshowclose() {
      this.flshow = false;
    },
    //打开费率弹窗
    flshowopen: function flshowopen() {
      this.flshow = true;
    },
    //关闭微信二维码弹窗
    wxshowclose: function wxshowclose() {
      this.wxshow = false;
    },
    //打开微信二维码弹窗
    wxshowopen: function wxshowopen() {
      if (this.erimg) {
        this.wxshow = true;
      } else {
        _toast.default.fail('该小区暂未配置微信客服');
        return;
      }
    },
    //关闭验证码弹窗
    twoshowclose: function twoshowclose() {
      this.twocodeshow = false;
    },
    //关闭弹窗
    showbtn: function showbtn() {
      this.show = false;
      this.back();
    },
    //跳转附近充电区
    nearbtn: function nearbtn() {
      uni.navigateTo({
        url: '../nearest_charging/nearest_charging'
      });
    },
    //打开验证码弹窗
    twoshowopen: function twoshowopen() {
      var _this17 = this;
      this.show = false;
      this.twocodeshow = true;
      var data = this.yzdata;
      this.$base.request('charge/code', 'GET', data).then(function (res1) {
        if (res1.data.code == 200) {
          _this17.yzcode = res1.data.msg;
        } else {
          _toast.default.fail(res1.data.msg);
        }
      }).catch(function (err) {});
    },
    //获取验证码倒计时
    handleClick: function handleClick() {
      var _this18 = this;
      this.Verification = false; //点击button改变v-if的状态
      var auth_timer = setInterval(function () {
        //定时器设置每秒递减
        _this18.timer--; //递减时间
        if (_this18.timer <= 0) {
          _this18.Verification = true; //60s时间结束还原v-if状态并清除定时器
          clearInterval(auth_timer);
        }
      }, 1000);
    },
    //关闭端口选择弹窗
    duanshowclose: function duanshowclose() {
      var _this19 = this;
      if (this.showclass == 2) {
        var _data2 = {
          ornum: this.ornum
        };
        uni.showLoading({
          title: '请稍候',
          mask: true
        });
        this.$base.request('refund/refund', 'POST', _data2).then(function (res1) {
          if (res1.data.code == 200) {
            uni.hideLoading();
            _toast.default.success('退款成功');
            _this19.back();
          } else {
            _toast.default.fail(res1.data.msg);
            _this19.back();
          }
        }).catch(function (err) {});
      }
      this.duanshow = false;
    },
    //打开端口选择弹窗
    duanshowopen: function duanshowopen() {
      this.duanshow = true;
    },
    //打开故障报修弹窗
    faultshowclose: function faultshowclose() {
      this.activeNames = [''];
      this.radio = '1';
      this.message = '';
      this.classtap = 'tclass';
      this.imgList = [];
      this.reason = '请选择故障类型';
      this.faultshow = false;
    },
    //打开故障报修弹窗
    faultshowopen: function faultshowopen() {
      this.sbnum = this.shebeino + this.portnum;
      this.faultshow = true;
    },
    //上传图片
    imgInfo: function imgInfo(i) {
      var tempList = [];
      this.imgList.forEach(function (img) {
        tempList.push(img.path);
      });
      //显示图片
      uni.previewImage({
        current: i,
        loop: false,
        urls: tempList,
        indicator: 'default'
      });
    },
    //删除图片
    delImg: function delImg(i) {
      this.imgList.splice(i, 1);
      this.hat.splice(i, 1);
      this.imgCount++;
    },
    txtchange: function txtchange(e) {
      this.message = e.detail;
    },
    onchange: function onchange(e) {
      this.activeNames = e.detail;
    },
    openCamera: function openCamera() {
      var _this20 = this;
      uni.chooseImage({
        // sourceType: ['camera'],
        count: this.imgCount,
        sizeType: ['compressed'],
        success: function success(res) {
          var path = res.tempFilePaths[0];
          var userToken = uni.getStorageSync('userToken');
          uni.uploadFile({
            url: _Config.Config.api + 'uploadFile',
            filePath: path,
            name: 'file',
            header: {
              Authorization: "Bearer " + userToken
            },
            success: function success(res1) {
              _this20.hat.push(JSON.parse(res1.data).data.fileName);
            }
          });
          _this20.imgList = [].concat((0, _toConsumableArray2.default)(_this20.imgList), (0, _toConsumableArray2.default)(res.tempFiles));
          _this20.imgCount = 3 - _this20.imgList.length;
        }
      });
    },
    //确认提交报错
    kbtngo: function kbtngo() {
      var _this21 = this;
      if (this.reason == '请选择故障类型') {
        _toast.default.fail('请选择故障类型');
        return;
      }
      var str = "";
      for (var i = 0; i < this.hat.length; i++) {
        str += this.hat[i] + ",";
      }
      //去掉最后一个逗号(如果不需要去掉，就不用写)
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
      }
      var data = {
        device: this.sbnum,
        type: this.radio1,
        remarks: this.message,
        imgNames: str
      };
      var header = {
        'content-type': 'application/json'
      };
      this.$base.request('failure', 'POST', data, header).then(function (res) {
        if (res.data.code == 200) {
          _toast.default.success('提交成功');
          _this21.faultshow = false;
          _this21.tishishow = true;
        } else {
          _toast.default.fail(res.data.msg);
        }
      }).catch(function (err) {});
    },
    //电动车安全使用承诺书
    xy: function xy() {
      var _this22 = this;
      var data = {
        appid: uni.getStorageSync('user').appid,
        site: 'chongdian'
      };
      this.$base.agreement(data).then(function (res) {
        if (res.data.code == 200) {
          _this22.xieyidata = res.data.data;
          if (_this22.xieyidata.selecteds == 0) {
            _this22.xychecked = false;
          } else if (_this22.xieyidata.selecteds == 1) {
            _this22.xychecked = true;
          }
        } else {
          _this22.xieyidata = {};
        }
      }).catch(function (err) {});
    }
  }, (0, _defineProperty2.default)(_methods, "kbtngo", function kbtngo() {
    var _this23 = this;
    if (this.reason == '请选择故障类型') {
      _toast.default.fail('请选择故障类型');
      return;
    }
    var str = "";
    for (var i = 0; i < this.hat.length; i++) {
      str += this.hat[i] + ",";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    var data = {
      device: this.sbnum,
      type: this.radio1,
      remarks: this.message,
      imgNames: str
    };
    var header = {
      'content-type': 'application/json'
    };
    this.$base.request('failure', 'POST', data, header).then(function (res) {
      if (res.data.code == 200) {
        _toast.default.success('提交成功');
        _this23.faultshow = false;
        _this23.tishishow = true;
      } else {
        _toast.default.fail(res.data.msg);
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "gobtn", function gobtn(e) {
    this.radio1 = e.detail;
    this.reason = this.radio1;
    this.activeNames = [''];
    this.classtap = 'tclass1';
  }), (0, _defineProperty2.default)(_methods, "go1btn", function go1btn(e) {
    this.xzchecked = e.detail;
  }), (0, _defineProperty2.default)(_methods, "kbtngoclose", function kbtngoclose() {
    this.tishishow = false;
  }), (0, _defineProperty2.default)(_methods, "back", function back() {
    console.log('poweron页面 back方法被调用');

    // 清除所有定时器，防止页面离开后仍然触发
    if (this.timeId) {
      clearTimeout(this.timeId);
      this.timeId = null;
      console.log('返回时清除timeId定时器');
    }
    if (this.refundId) {
      clearTimeout(this.refundId);
      this.refundId = null;
      console.log('返回时清除refundId定时器');
    }
    if (this.from == '1') {
      //外部的
      uni.reLaunch({
        url: "../index/index"
      });
    } else if (this.from == '2' || this.from == '3') {
      //内部跳转过来的
      uni.navigateBack({
        delta: 1
      });
    }
  }), (0, _defineProperty2.default)(_methods, "lbbtn", function lbbtn() {
    var _this24 = this;
    var data = {
      pageNum: 1,
      pageSize: 5
    };
    this.$base.request('notice/list', 'GET', data).then(function (res) {
      if (res.data.code == 0) {
        var arr = [];
        var list = res.data.rows;
        for (var i = 0; i < list.length; i++) {
          arr.push(list[i].title);
        }
        _this24.noticeMsg = arr.join("|");
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "colosezhi", function colosezhi() {
    this.dshow = false;
    var usertype = 'type_' + uni.getStorageSync('userId');
    uni.setStorageSync(usertype, 1);
    this.$base.request('guide/state', 'PUT').then(function (res) {}).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "gozhi", function gozhi() {
    this.$base.request('guide/state', 'PUT').then(function (res) {}).catch(function (err) {});
    uni.navigateTo({
      url: '../Operation_guide/Operation_guide'
    });
  }), (0, _defineProperty2.default)(_methods, "occ", function occ() {
    var _this25 = this;
    var data = {
      deviceId: this.deviceId
    };
    this.$base.request('charging/occ/list', 'GET', data).then(function (res) {
      if (res.data.total != 0) {
        _this25.occtype = 1;
        _this25.cdgnum = "您有" + res.data.total + "条未完成订单,点击查看>>>";
        _dialog.default.confirm({
          title: '提示',
          message: "您有" + res.data.total + "条未完成订单,点击确认查看",
          confirmButtonColor: '#EC651C',
          confirmButtonText: '查看已有订单',
          cancelButtonText: '开始新的订单'
        }).then(function () {
          uni.navigateTo({
            url: '../unsettled_order/unsettled_order?deviceId=' + _this25.deviceId
          });
        }).catch(function () {
          // on cancel
          _this25.wtype = 1;
          _this25.oneshow = true;
        });
      } else {
        _this25.occtype = 0;
        _this25.oneshow = true;
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "occ1", function occ1() {
    var _this26 = this;
    var data = {
      deviceId: this.deviceId
    };
    this.$base.request('charging/occ/list', 'GET', data).then(function (res) {
      if (res.data.total != 0) {
        _this26.occtype = 1;
        _this26.cdgnum = "您有" + res.data.total + "条未完成订单,点击查看>>>";
      } else {
        _this26.occtype = 0;
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "occbtn", function occbtn() {
    uni.navigateTo({
      url: '../unsettled_order/unsettled_order?deviceId=' + this.deviceId
    });
  }), (0, _defineProperty2.default)(_methods, "logoshow", function logoshow() {
    var userId = uni.getStorageSync('userId');
    var userToken = uni.getStorageSync('userToken');
    if (!userId || !userToken) {
      console.log('缺少用户ID或token，跳过logo获取');
      return;
    }
    var _this = this;
    var logolist = 'logolist_' + userId;
    uni.removeStorageSync(logolist);
    _this.$base.request('wechat/phone', 'GET').then(function (res) {
      if (res.data.code == 200) {
        var list = res.data.data;
        if (list.logo) {
          list.logo = _Config.Config.imgapi + list.logo;
          // 使用小程序的方式获取图片信息
          uni.getImageInfo({
            src: list.logo,
            success: function success(res) {
              console.log('图片信息获取成功:', res);
              if (res.width == res.height) {
                list.loshow = 1;
              } else {
                list.loshow = 0;
              }
              _this.logolist = list;
              uni.setStorageSync(logolist, list);
            },
            fail: function fail(err) {
              console.error('获取图片信息失败:', err);
              // 如果获取图片信息失败，默认显示logo
              list.loshow = 1;
              _this.logolist = list;
              uni.setStorageSync(logolist, list);
            }
          });
        }
      } else {
        _Toast.fail(res.data.msg);
      }
    }).catch(function (err) {
      console.error('获取logo信息失败:', err);
    });
  }), (0, _defineProperty2.default)(_methods, "bxbtn", function bxbtn(e) {
    this.checked = e.detail;
    if (this.infolist.displayButton == 0) {
      if (this.checked && this.infolist.transfer == 1) {
        this.bxname = '充电守护';
      } else {
        this.bxname = '立即充电';
      }
    }
  }), (0, _defineProperty2.default)(_methods, "axbtn", function axbtn(e) {
    this.onecmchecked = e.detail;
  }), (0, _defineProperty2.default)(_methods, "cxbtn", function cxbtn(e) {
    this.lscmchecked = e.detail;
  }), (0, _defineProperty2.default)(_methods, "dxbtn", function dxbtn(e) {
    this.longcheck = e.detail;
  }), (0, _defineProperty2.default)(_methods, "exbtn", function exbtn(e) {
    this.xychecked = e.detail;
  }), (0, _defineProperty2.default)(_methods, "bxxy", function bxxy() {
    uni.navigateTo({
      url: '../protocol_specification/protocol_specification'
    });
    // this.cshow = true
  }), (0, _defineProperty2.default)(_methods, "cshowclose", function cshowclose() {
    this.cshow = false;
  }), (0, _defineProperty2.default)(_methods, "clshow", function clshow() {
    this.cxyshow = true;
  }), (0, _defineProperty2.default)(_methods, "clshowclose", function clshowclose() {
    this.cxyshow = false;
  }), (0, _defineProperty2.default)(_methods, "czbtn", function czbtn() {
    uni.navigateTo({
      url: '../account_recharge/account_recharge?powerontype=' + 1
    });
  }), (0, _defineProperty2.default)(_methods, "gzbtn", function gzbtn() {
    this.gzshow = true;
  }), (0, _defineProperty2.default)(_methods, "changbtn", function changbtn() {
    _dialog.default.alert({
      title: '提示',
      message: '长充模式：当用户充满自停后将一直保持供电，此时段内的功率将按照充电器最大功率的比例换算成相应时长，不会多收用户的费用，旨在解决某些用户充不满的问题。'
    }).then(function () {
      // on close
    });
  }), (0, _defineProperty2.default)(_methods, "fwfeiclose", function fwfeiclose() {
    this.fwtan = false;
  }), (0, _defineProperty2.default)(_methods, "buyfuwu", function buyfuwu(id) {
    var _this27 = this;
    if (!this.endTimeStr) {
      _dialog.default.confirm({
        title: '提示',
        message: "确认购买套餐？"
      }).then(function () {
        var data = {
          areaId: _this27.areaId,
          projectId: _this27.projectId,
          serviceDetailId: id
        };
        uni.showLoading({
          title: '请稍候',
          mask: true
        });
        _this27.$base.request('user/servicePackage', 'POST', data).then(function (res) {
          uni.hideLoading();
          if (res.data.code == 200) {
            _toast.default.success('购买成功');
            _this27.fwtan = false;
            _this27.flmap();
          } else if (res.data.code == 20006) {
            _this27.czbtn();
          } else {
            _toast.default.fail(res.data.msg);
          }
        }).catch(function (err) {});
      }).catch(function () {});
    } else {
      _toast.default.fail('你已购买过套餐,请勿重复购买');
    }
  }), (0, _defineProperty2.default)(_methods, "flmap", function flmap() {
    var _this28 = this;
    var data = {
      areaId: this.areaId,
      projectId: this.projectId
    };
    uni.showLoading({
      title: '请稍候',
      mask: true
    });
    this.$base.request('charge/rate', 'GET', data).then(function (res) {
      uni.hideLoading();
      if (res.data.code == 200) {
        _this28.projectServiceDetailList = res.data.data.projectServiceDetailList;
        _this28.endTimeStr = res.data.data.endTimeStr;
        if (_this28.endTimeStr) {
          _this28.xzchecked = '1';
        }
        _this28.fuwumoney = res.data.data.oftenList[0].num / 100;
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "bxcolose", function bxcolose() {
    this.isSafe = 0;
    this.cdbtnson();
    this.warnshow = false;
  }), (0, _defineProperty2.default)(_methods, "bxque", function bxque() {
    this.checked = true;
    this.tapcdb();
    this.warnshow = false;
  }), (0, _defineProperty2.default)(_methods, "seluser", function seluser() {
    var _this29 = this;
    var data = {
      deviceId: this.deviceId
    };
    this.$base.request('charge/safe/random', 'GET', data).then(function (res) {
      if (res.data.code == 200) {
        _this29.yonghunum = res.data.data;
      } else {
        _toast.default.fail(res.data.msg);
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "occfirst", function occfirst() {
    var _this30 = this;
    var data = {
      deviceId: this.deviceId
    };
    this.$base.request('charging/occ/end/list', 'GET', data).then(function (res) {
      if (res.data.code == 200) {
        if (res.data.data.length > 0) {
          _this30.occlist = res.data.data;
          _this30.occshow = true;
        } else {
          _this30.occ();
          _this30.occ1();
        }
      } else {
        _toast.default.fail(res.data.msg);
        _this30.occ();
        _this30.occ1();
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "know", function know() {
    var _this31 = this;
    var data = {
      deviceId: this.deviceId
    };
    this.$base.request('charging/occ/alert', 'POST', data).then(function (res) {
      if (res.data.code == 200) {
        _this31.occshow = false;
        _this31.occ();
        _this31.occ1();
      } else {
        _toast.default.fail(res.data.msg);
        _this31.occshow = false;
        _this31.occ();
        _this31.occ1();
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "knowclose", function knowclose() {
    this.occshow = false;
    this.occ();
    this.occ1();
  }), (0, _defineProperty2.default)(_methods, "guanggao", function guanggao() {
    var _this32 = this;
    var data = {
      point: 'charge',
      projectId: this.infolist.projectId,
      token: uni.getStorageSync('userToken')
    };
    this.$base.request('poster/getPosterList', 'POST', data).then(function (res) {
      if (res.data.code == 200) {
        _this32.posterList = res.data.data;
        if (_this32.posterList.length > 0) {
          _this32.poster = 1;
          _this32.ggshow = 1;
        } else {
          _this32.poster = 0;
        }
      } else {
        _this32.poster = 0;
      }
    }).catch(function (err) {});
    // this.getbtn()
  }), (0, _defineProperty2.default)(_methods, "gogd", function gogd(url, jump, msg, libId, teamId) {
    if (jump == 'PU' || jump == 'SA') {
      if (url != 0) {
        var point = 'charge';
        this.ggadd(libId, teamId, point);
        // window.location.href = url
        uni.navigateTo({
          url: '/pages/webview/webview?url=' + url
        });
        this.ontime = 0;
      }
    } else if (jump == 'PA') {
      var _point = 'charge';
      this.ggadd(libId, teamId, _point);
      uni.navigateTo({
        url: '/pageone/ad_details/ad_details?msg=' + msg
      });
      this.ontime = 0;
    } else if (jump == 'PPRO') {
      var _point2 = 'charge';
      this.ggadd(libId, teamId, _point2);
      this.ontime = 0;
    }
  }), (0, _defineProperty2.default)(_methods, "ggadd", function ggadd(libId, teamId, point) {
    var data = {
      systemId: 0,
      libId: libId,
      teamId: teamId,
      point: point,
      appid: uni.getStorageSync('user').appid,
      projectId: uni.getStorageSync('user').projectId
    };
    this.$base.request('posterClickMsg/add', 'POST', data).then(function (res) {}).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "getSafeMonth", function getSafeMonth() {
    var _this33 = this;
    var data = {
      token: uni.getStorageSync('userToken')
    };
    this.$base.request('recharge/getSafeMonth', 'GET', data).then(function (res) {
      if (res.data.code == 200) {
        _this33.shbylist = res.data.data;
      } else {
        _toast.default.fail(res.data.msg);
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "shbygb", function shbygb() {
    this.shbyshow = false;
  }), (0, _defineProperty2.default)(_methods, "openwxts", function openwxts() {
    this.wxtsshow = true;
    this.wxtsnum = 1;
    this.wxtszj = this.shbylist.monthPrice;
  }), (0, _defineProperty2.default)(_methods, "goshby", function goshby() {
    this.shbyshow = false;
    this.wxtsshow = true;
    this.wxtsnum = 1;
    this.wxtszj = this.shbylist.monthPrice;
  }), (0, _defineProperty2.default)(_methods, "closewxts", function closewxts() {
    this.wxtsshow = false;
  }), (0, _defineProperty2.default)(_methods, "surewxts", function surewxts() {
    var _this34 = this;
    var data = {
      token: uni.getStorageSync('userToken'),
      num: this.wxtsnum,
      money: this.shbylist.monthPrice,
      totalMoney: this.wxtszj
    };
    uni.showLoading({
      title: '请稍候',
      mask: true
    });
    this.$base.request('safe/monthBuy', 'POST', data).then(function (res) {
      if (res.data.code == 200) {
        _toast.default.success('购买成功');
        uni.hideLoading();
        _this34.wxtsshow = false;
        setTimeout(function () {
          _this34.infoshow();
        }, 1500);
      } else {
        _toast.default.fail(res.data.msg);
        uni.hideLoading();
        _this34.wxtsshow = false;
      }
    }).catch(function (err) {});
  }), (0, _defineProperty2.default)(_methods, "wxtsChange", function wxtsChange(value) {
    this.wxtszj = (this.wxtsnum * this.shbylist.monthPrice).toFixed(2);
  }), (0, _defineProperty2.default)(_methods, "callphone", function callphone(phone) {
    if (phone) {
      uni.makePhoneCall({
        phoneNumber: phone.toString()
      }).catch(function (e) {
        // console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
      });
    } else {
      _toast.default.fail('暂无客服');
    }
  }), (0, _defineProperty2.default)(_methods, "vipgo", function vipgo() {
    uni.navigateTo({
      url: '/pages/guard_vip/guard_vip'
    });
  }), _methods)
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 197:
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./poweron.vue?vue&type=style&index=0&lang=css& */ 198);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 198:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 199:
/*!***********************************************************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue?vue&type=style&index=1&lang=scss& ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./poweron.vue?vue&type=style&index=1&lang=scss& */ 200);
/* harmony import */ var _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_24_2024072208_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_poweron_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 200:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/pageone/poweron/poweron.vue?vue&type=style&index=1&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[187,"common/runtime","common/vendor","pageone/common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pageone/poweron/poweron.js.map