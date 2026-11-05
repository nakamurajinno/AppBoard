export type AppCategory = 'Web App' | 'Mobile' | 'Tool' | 'API' | 'AI'

export interface AppInfo {
  id: string
  title: string
  category: AppCategory
  /** 一覧カード用の短い概要 */
  description: string
  /** モーダル用の詳細な概要 */
  longDescription: string
  /** システム構成（使用技術・インフラ） */
  architecture: string[]
  /** 未設定（空文字・null・undefined）の場合はボタンが非活性になる */
  url?: string | null
  githubUrl?: string | null
  /** ISO 8601 形式の日付 (YYYY-MM-DD) */
  updatedAt: string
}
