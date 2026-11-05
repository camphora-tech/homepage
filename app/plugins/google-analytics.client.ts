// Google Analytics (GA4)
// 測定 ID（runtimeConfig.public.gaMeasurementId）が設定され、かつ本番ドメインで表示されたときだけタグを読み込む。
// プレビュー（*.pages.dev）やローカル開発では読み込まないので、計測データが汚れない。
// ページ遷移（SPA の画面切り替え）は GA4 の拡張計測「ブラウザの履歴イベントに基づくページの変更」で自動的に計測される。
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const { gaMeasurementId, gaHosts } = useRuntimeConfig().public
  const id = String(gaMeasurementId || '').trim()
  const hosts = String(gaHosts || '').split(',').map(h => h.trim()).filter(Boolean)

  if (!id || !hosts.includes(window.location.hostname)) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag.js は arguments オブジェクトそのものを要求する
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)

  useHead({
    script: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`, async: true }
    ]
  })
})
