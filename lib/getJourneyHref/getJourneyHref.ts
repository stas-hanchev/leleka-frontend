const MS_PER_DAY = 24 * 60 * 60 * 1000;  // Мілісекунди в одному дні
const TOTAL_PREGNANCY_DAYS = 280; // Загальна кількість днів вагітності

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function getPregnancyWeekFromDueDate(dueDateISO: string, now = new Date()): number {
  const due = new Date(dueDateISO);
  if (Number.isNaN(due.getTime())) return 1;

  const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / MS_PER_DAY);
  
  const daysPassed = TOTAL_PREGNANCY_DAYS - daysUntilDue;
   
  const week = Math.min(42, Math.max(1, Math.ceil(daysPassed / 7)));
  
  return clamp(week, 1, 40);
}

export function getJourneyHref(birthDate: string | null | undefined): string {
  if (birthDate === null) return `/journey/1`;
  if (!birthDate) return "/auth/register";
  
  const week = getPregnancyWeekFromDueDate(birthDate);
  return `/journey/${week}`;
}

