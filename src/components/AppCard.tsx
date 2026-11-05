import type { AppInfo } from '../types/app'
import { categoryAccent, categoryStyles, formatDate } from '../lib/format'

interface AppCardProps {
  app: AppInfo
  onSelect: (app: AppInfo) => void
}

const MAX_TAGS = 4

export function AppCard({ app, onSelect }: AppCardProps) {
  const visibleTags = app.architecture.slice(0, MAX_TAGS)
  const hiddenCount = app.architecture.length - visibleTags.length

  return (
    <button
      type="button"
      onClick={() => onSelect(app)}
      aria-haspopup="dialog"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-white/20 dark:hover:shadow-indigo-500/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* アクセントライン */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${categoryAccent[app.category]} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
      />
      {/* ホバー時のグロー */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-gradient-to-br ${categoryAccent[app.category]} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15 dark:group-hover:opacity-25`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${categoryStyles[app.category]}`}
        >
          {app.category}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 shrink-0 text-slate-300 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-500 dark:text-slate-600 dark:group-hover:text-indigo-400"
        >
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h2 className="relative mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
        {app.title}
      </h2>
      <p className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {app.description}
      </p>

      <ul className="relative mt-5 flex flex-wrap gap-1.5" aria-label="システム構成">
        {visibleTags.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-700 dark:bg-white/5 dark:text-slate-300"
          >
            {tech}
          </li>
        ))}
        {hiddenCount > 0 && (
          <li className="rounded-md px-2 py-1 font-mono text-[11px] text-slate-500 dark:text-slate-500">
            +{hiddenCount}
          </li>
        )}
      </ul>

      <p className="relative mt-auto pt-5 text-xs text-slate-500 dark:text-slate-500">
        更新: <time dateTime={app.updatedAt}>{formatDate(app.updatedAt)}</time>
      </p>
    </button>
  )
}
