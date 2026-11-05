import { useEffect, useRef, type ReactNode } from 'react'
import type { AppInfo } from '../types/app'
import { categoryAccent, categoryStyles, formatDate } from '../lib/format'

interface AppModalProps {
  app: AppInfo | null
  onClose: () => void
}

export function AppModal({ app, onClose }: AppModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // app の有無に合わせてネイティブ <dialog> を開閉（フォーカストラップ・Esc 対応はブラウザ任せ）
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (app && !dialog.open) dialog.showModal()
    if (!app && dialog.open) dialog.close()
  }, [app])

  // 背景スクロールを固定
  useEffect(() => {
    if (!app) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [app])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // 背景（::backdrop）クリックで閉じる
        if (e.target === e.currentTarget) onClose()
      }}
      aria-labelledby="app-modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
    >
      {app && (
        <div className="max-h-[85vh] overflow-y-auto">
          <div className={`h-1.5 bg-gradient-to-r ${categoryAccent[app.category]}`} aria-hidden />

          <div className="p-6 sm:p-8">
            <header className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${categoryStyles[app.category]}`}
                >
                  {app.category}
                </span>
                <h2 id="app-modal-title" className="mt-3 text-2xl font-bold tracking-tight">
                  {app.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="閉じる"
                className="-mt-1 -mr-2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-indigo-500 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden>
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </header>

            <section className="mt-6">
              <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                概要
              </h3>
              <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">
                {app.longDescription}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                システム構成
              </h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {app.architecture.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    <span
                      aria-hidden
                      className={`size-1.5 shrink-0 rounded-full bg-gradient-to-br ${categoryAccent[app.category]}`}
                    />
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <dl className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <dt>最終更新日:</dt>
              <dd>
                <time dateTime={app.updatedAt} className="font-medium text-slate-700 dark:text-slate-200">
                  {formatDate(app.updatedAt)}
                </time>
              </dd>
            </dl>

            <footer className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end dark:border-white/10">
              <LinkButton
                href={app.githubUrl}
                disabledLabel="GitHub リポジトリは未設定です"
                className="border border-slate-300 font-medium text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden>
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                GitHub
              </LinkButton>
              <LinkButton
                href={app.url}
                disabledLabel="アプリの URL は未設定です"
                className="bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                アプリを開く
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.25-.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V6.31l-5.47 5.47a.75.75 0 1 1-1.06-1.06l5.47-5.47H12.25a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </LinkButton>
            </footer>
          </div>
        </div>
      )}
    </dialog>
  )
}

const linkButtonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'

interface LinkButtonProps {
  href?: string | null
  /** 非活性時にツールチップ・スクリーンリーダーへ伝える理由 */
  disabledLabel: string
  /** 活性時のみ適用するスタイル */
  className: string
  children: ReactNode
}

/** href が空（空白のみ・null・undefined）のときは非活性ボタンとして描画する */
function LinkButton({ href, disabledLabel, className, children }: LinkButtonProps) {
  const url = href?.trim()

  if (!url) {
    return (
      <button
        type="button"
        disabled
        title={disabledLabel}
        aria-label={disabledLabel}
        className={`${linkButtonBase} cursor-not-allowed border border-slate-200 bg-slate-100 font-medium text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-500`}
      >
        {children}
      </button>
    )
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${linkButtonBase} ${className}`}>
      {children}
    </a>
  )
}
