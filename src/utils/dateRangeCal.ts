export const dateRangeCal = (duration = 0, maximumDuration = 0, minimumDuration = 0) => {
  return duration <= maximumDuration && duration >= minimumDuration;
}

export function getExpectedDay(base = new Date, totalTime = 0) {
  const date = new Date(base.getTime() + totalTime);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}