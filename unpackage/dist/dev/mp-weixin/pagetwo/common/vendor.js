(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagetwo/common/vendor"],{

/***/ 341:
/*!******************************************************************************************!*\
  !*** C:/Users/44553/Desktop/微信图片视频/备份代码/66_Chargingpile_applet_2.0/common/formatDate.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var k in o) {
    if (new RegExp("(".concat(k, ")")).test(fmt)) {
      var str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagetwo/common/vendor.js.map