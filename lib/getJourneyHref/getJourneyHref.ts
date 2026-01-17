const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function getPregnancyWeekFromDueDate(dueDateISO: string, now = new Date()): number {
  const due = new Date(dueDateISO);
  if (Number.isNaN(due.getTime())) return 1;

  const weeksUntilDue = Math.ceil((due.getTime() - now.getTime()) / MS_PER_WEEK);
  const week = 40 - weeksUntilDue /*+ 1*/;

  return clamp(week, 1, 40);
}

export function getJourneyHref(birthDate: string | null | undefined): string {
  // console.log(`BirthDate: ${birthDate}`);
  if (birthDate===null) return `/journey/1`; 
  if (!birthDate) return "/auth/register";
  const week = getPregnancyWeekFromDueDate(birthDate);
  return `/journey/${week}`;
}
