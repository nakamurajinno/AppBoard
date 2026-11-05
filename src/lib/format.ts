import type { AppCategory } from '../types/app'

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${iso}T00:00:00`))
}

/** カテゴリごとのバッジ配色（ライト / ダーク両対応） */
export const categoryStyles: Record<AppCategory, string> = {
  'Web App': 'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/30',
  Mobile: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30',
  Tool: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/30',
  API: 'bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/30',
  AI: 'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/30',
}

/** カード上部のアクセントグラデーション */
export const categoryAccent: Record<AppCategory, string> = {
  'Web App': 'from-sky-500 to-indigo-500',
  Mobile: 'from-emerald-500 to-teal-500',
  Tool: 'from-amber-500 to-orange-500',
  API: 'from-rose-500 to-pink-500',
  AI: 'from-violet-500 to-fuchsia-500',
}
