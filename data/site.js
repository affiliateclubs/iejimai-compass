export const siteConfig = {
  name: '家じまいガイド',
  domain: 'https://iejimaiguide.com',
  contactEmail: 'contact@iejimaiguide.com',
  title: '家じまいガイド | 相続した実家・空き家の売却と整理を地域別にわかりやすく',
  description:
    '相続した実家や空き家をどう売るか迷う人向けの地域別売却ガイドです。不動産売却、相続登記、税金、空き家対策、買取と仲介の違いまで整理します。',
  themeColor: '#f3efe6',
  nav: [
    { href: '/', label: 'ホーム' },
    { href: '/diagnosis', label: '診断する' },
    { href: '/regions', label: '都道府県マップ' },
    { href: '/problems', label: '困りごと別' },
    { href: '/checklist', label: 'チェックリスト' },
    { href: '/flow', label: '売却の流れ' },
    { href: '/guide/souzoku-jikka-first-step', label: 'まずやること' },
    { href: '/compare/chukai-vs-kaitori', label: '比較する' },
    { href: '/partners', label: '相談先比較' },
    { href: '/contact', label: 'お問い合わせ' }
  ],
  primaryCta: {
    label: '3分で進め方を診断する',
    href: '/diagnosis'
  },
  publicDataSources: [
    {
      label: '総務省統計局 統計でみる都道府県のすがた 2026',
      href: 'https://www.stat.go.jp/data/k-sugata/'
    },
    {
      label: '総務省統計局 統計でみる市区町村のすがた 2025',
      href: 'https://www.stat.go.jp/data/s-sugata/index.html'
    },
    {
      label: '国土交通省 不動産情報ライブラリ',
      href: 'https://www.reinfolib.mlit.go.jp/'
    },
    {
      label: '国土地理院 地理院地図',
      href: 'https://maps.gsi.go.jp/'
    }
  ]
};
