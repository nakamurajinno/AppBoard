import { useState } from 'react'
import appsData from './data/apps.json'
import type { AppInfo } from './types/app'
import { AppCard } from './components/AppCard'
import { AppModal } from './components/AppModal'
import { useTheme } from './hooks/useTheme'

const apps = [...(appsData as AppInfo[])].sort((a, b) => a.updatedAt.localeCompare(b.updatedAt))

export default function App() {
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null)
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* 背景の装飾 */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-0 h-96 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent dark:from-indigo-500/15"
      />

      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/30">
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden>
                <path d="M3 4.25A1.25 1.25 0 0 1 4.25 3h3.5A1.25 1.25 0 0 1 9 4.25v3.5A1.25 1.25 0 0 1 7.75 9h-3.5A1.25 1.25 0 0 1 3 7.75v-3.5ZM11 4.25A1.25 1.25 0 0 1 12.25 3h3.5A1.25 1.25 0 0 1 17 4.25v3.5A1.25 1.25 0 0 1 15.75 9h-3.5A1.25 1.25 0 0 1 11 7.75v-3.5ZM3 12.25A1.25 1.25 0 0 1 4.25 11h3.5A1.25 1.25 0 0 1 9 12.25v3.5A1.25 1.25 0 0 1 7.75 17h-3.5A1.25 1.25 0 0 1 3 15.75v-3.5ZM11 12.25A1.25 1.25 0 0 1 12.25 11h3.5A1.25 1.25 0 0 1 17 12.25v3.5A1.25 1.25 0 0 1 15.75 17h-3.5A1.25 1.25 0 0 1 11 15.75v-3.5Z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">My Apps Dashboard</h1>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden>
                <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">アプリ一覧</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {apps.length} 件のアプリ・カードをクリックすると詳細を表示します
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <li key={app.id}>
              <AppCard app={app} onSelect={setSelectedApp} />
            </li>
          ))}
        </ul>
      </main>

      <AppModal app={selectedApp} onClose={() => setSelectedApp(null)} />
    </div>
  )
}
