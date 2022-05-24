export function inputStrTransformNumber(str: string) {
  if (str.startsWith('0.')) return str;
  if (/^(0+)[1-9]/.test(str)) return str.replace(/^(0+)/, '');
  return str;
}