"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ahooks = require("ahooks");
var _react = _interopRequireWildcard(require("react"));
var _getTarget = _interopRequireDefault(require("./getTarget"));
var _excluded = ["children", "selector", "scrollOptions", "isScrollable", "scrollRef", "target"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
var ScrollInto = function ScrollInto(_ref) {
  var children = _ref.children,
    selector = _ref.selector,
    _ref$scrollOptions = _ref.scrollOptions,
    scrollOptions = _ref$scrollOptions === void 0 ? {} : _ref$scrollOptions,
    _isScrollable = _ref.isScrollable,
    scrollRef = _ref.scrollRef,
    target = _ref.target,
    rest = _objectWithoutProperties(_ref, _excluded);
  var el = (0, _getTarget["default"])(target, document);
  var scrollIntoView = function scrollIntoView() {
    if (selector) {
      var element = document.querySelector(selector);
      element === null || element === void 0 || element.scrollIntoView(scrollOptions);
      return;
    }
    if (scrollRef && scrollRef !== null && scrollRef !== void 0 && scrollRef.current) {
      var _scrollRef$current;
      (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 || _scrollRef$current.scrollIntoView(scrollOptions);
    }
  };
  var ref = (0, _react.useRef)(null);
  var size = (0, _ahooks.useSize)(ref);
  var _useState = (0, _react.useState)(_isScrollable !== null && _isScrollable !== void 0 ? _isScrollable : true),
    _useState2 = _slicedToArray(_useState, 2),
    isScrollable = _useState2[0],
    setIsScrollable = _useState2[1];
  var cancelObserve = function cancelObserve() {
    setIsScrollable(false);
  };
  (0, _react.useEffect)(function () {
    if (_isScrollable !== undefined) {
      setIsScrollable(_isScrollable);
    }
  }, [_isScrollable]);
  (0, _ahooks.useDebounceEffect)(function () {
    if (isScrollable) {
      scrollIntoView();
    }
  }, [size, isScrollable], {
    wait: 300
  });
  (0, _react.useEffect)(function () {
    if (isScrollable && el) {
      el.addEventListener("scroll", cancelObserve);
      el.addEventListener("click", cancelObserve);
    }
    return function () {
      if (el) {
        el.removeEventListener("scroll", cancelObserve);
        el.removeEventListener("click", cancelObserve);
      }
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref
  }, rest), children);
};
var _default = exports["default"] = ScrollInto;