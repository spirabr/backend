export function collectorIsValid(collector) {
  if (!collector) {
    return false;
  }

  if (!stringIsValid(collector.hospital)) {
    return false;
  }

  return true;
}

export function stringIsValid(str) {
  return typeof str === 'string' && str.trim().length > 0;
}
