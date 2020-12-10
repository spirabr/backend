export function collectorIsValid(collector) {
  if (!collector) {
    return false;
  }

  if (typeof collector.name !== 'string' || collector.name.trim().length <= 0) {
    return false;
  }

  if (
    typeof collector.hospital !== 'string' ||
    collector.hospital.trim().length <= 0
  ) {
    return false;
  }

  return true;
}

export function patientIdIsValid(id) {
  return typeof id === 'string' && id.trim().length > 0;
}
