function getTarget(target, defaultElement) {
  if (!target) {
    return defaultElement;
  }

  let targetElement;

  if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
export default getTarget;
