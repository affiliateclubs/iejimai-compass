import Head from 'next/head';
import Link from 'next/link';
import { siteConfig } from '../data/site';

export default function Layout({
  children,
  title = siteConfig.title,
  description = siteConfig.description,
  canonical = siteConfig.domain,
  structuredData
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={siteConfig.themeColor} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonical} />
        {structuredData ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        ) : null}
      </Head>
      <div className="site-shell">
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand-mark">
              <span className="brand-kicker">相続・空き家・実家じまいの売却ガイド</span>
              <strong>{siteConfig.name}</strong>
            </Link>
            <nav className="main-nav">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link href="/contact" className="header-cta gold-button">
              ご相談はこちら
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-brand">
              <strong>{siteConfig.name}</strong>
              <p>相続した実家・空き家・実家じまいの売却判断を、地域別に整理してお伝えしている専門メディアです。</p>
              <div className="footer-contact">
                <p className="footer-contact-label">お問い合わせ</p>
                <Link href="/contact" className="footer-contact-mail">
                  お問い合わせフォーム →
                </Link>
                <p className="footer-contact-note">
                  サイトの売却・買収・媒体タイアップ・ご質問は、お問い合わせフォームからご連絡ください。
                </p>
              </div>
            </div>
            <div className="footer-links">
              <Link href="/diagnosis">家じまい進め方診断</Link>
              <Link href="/problems">困りごと別ガイド</Link>
              <Link href="/checklist">売却前チェックリスト</Link>
              <Link href="/flow">売却の流れ</Link>
              <Link href="/compare/chukai-vs-kaitori">仲介と買取の比較</Link>
              <Link href="/partners">媒体方針</Link>
              <Link href="/contact">お問い合わせ</Link>
              <Link href="/about">運営者情報</Link>
              <Link href="/disclaimer">免責事項</Link>
              <Link href="/privacy">プライバシーポリシー</Link>
              <Link href="/terms">利用規約</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
