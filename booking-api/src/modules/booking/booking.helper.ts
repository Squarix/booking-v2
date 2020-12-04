export function daysBetween(date1: Date, date2: Date): number {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(
    new Date(date1).getTime() - new Date(date2).getTime(),
  );

  return Math.round(differenceMs / ONE_DAY);
}
