export function twoDecimalPlaces(value) {
  const [first, second] = value.toFixed(2).split('.');
  return `${first}.${second.padEnd(2, '0')}`;
}
