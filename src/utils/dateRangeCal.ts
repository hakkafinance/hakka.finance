export const dateRangeCal = (duration = 0, maximumDuration = 0, minimumDuration = 0) => {
  return duration <= maximumDuration && duration >= minimumDuration;
}

export function getExpectedDay(base = new Date, totalTime = 0) {
  const date = new Date(base.getTime() + totalTime);
  return date.getDate();
}