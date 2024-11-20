"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function getTarget(target, defaultElement) {
  if (!target) {
    return defaultElement;
  }
  var targetElement;
  if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }
  return targetElement;
}
var _default = exports["default"] = getTarget;