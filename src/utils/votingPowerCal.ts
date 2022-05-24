import Decimal from 'decimal.js';
export const v1PowerWeighting = (hours: number) => {
  hours = hours >=8766 ? 8766 : hours;
  // .25(1-x/8766);
  return new Decimal(hours).mul(-0.25).div(8766).add(0.25);
}
export const v2PowerWeighting = (hours: number) => {
  // 1-v1PowerWeighting(hours)
  return new Decimal(1).sub(v1PowerWeighting(hours));
}