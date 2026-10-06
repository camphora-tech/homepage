/** 2025-09-01 → 2025.09.01（Growth Ring の日付表記） */
export function formatDate(value: string | Date) {
  const d = new Date(value)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`
}

/** フロントマターの badge は文字列と { label } の両方を受け付ける */
export function badgeLabel(badge?: string | { label: string } | null) {
  if (!badge) return undefined
  return typeof badge === 'string' ? badge : badge.label
}
