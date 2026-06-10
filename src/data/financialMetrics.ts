export const BASE_NET_WORTH = 840_000

/** Prior value attributed to advisor relationship before current action plan */
export const PRIOR_ADVISOR_VALUE = 18_400

/** Estimated 5-year wealth impact per task */
export const TASK_VALUES: Record<string, { value: number; label: string }> = {
  'task-1': { value: 20_000, label: 'Roth IRA conversion' },
  'task-2': { value: 8_500, label: 'Beneficiary update' },
  'task-3': { value: 24_000, label: '401(k) contribution increase' },
  'task-4': { value: 12_000, label: 'Estate plan alignment' },
}

export const NET_WORTH_HISTORY = [
  { date: 'Jan 2024', value: 698_000 },
  { date: 'Jul 2024', value: 715_000 },
  { date: 'Jan 2025', value: 738_000 },
  { date: 'Jul 2025', value: 772_000 },
  { date: 'Jan 2026', value: 801_000 },
  { date: 'Apr 2026', value: 825_000 },
  { date: 'Jun 2026', value: BASE_NET_WORTH },
]

export function formatCurrency(value: number, compact = false): string {
  if (compact && value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (compact && value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
