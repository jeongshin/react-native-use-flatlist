export function isPercentValue(value: string | number): value is `${number}%` {
  return typeof value === 'string' && value.endsWith('%');
}
