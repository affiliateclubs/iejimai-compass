import Layout from '../components/Layout';
import { siteConfig } from '../data/site';

export default function ContactPage() {
  const readerSubject = encodeURIComponent('家じまいガイドへのお問い合わせ');
  const readerBody = encodeURIComponent(
    [
      'お問い合わせ種別：',
      'お名前：',
      'ご連絡先：',
      'ご相談内容：',
      '',
      '媒体掲載・提携のご相談の場合は、会社名とご希望内容もご記入ください。'
    ].join('\n')
  );
  const partnerSubject = encodeURIComponent('家じまいガイド 媒体掲載・提携相談');
  const partnerBody = encodeURIComponent(
    [
      '会社名：',
      'ご担当者名：',
      'ご相談種別：媒体掲載 / 提携 / 取材 / その他',
      'ご希望の掲載先：',
      '想定商材・サービス：',
      '報酬形態：',
      'ご希望開始時期：',
      '補足：'
    ].join('\n')
  );

  return (
    <Layout
      title="お問い合わせ | 家じまいガイド"
      description="家じまいガイドへのご相談、媒体掲載、提携に関するお問い合わせページです。"
      canonical={`${siteConfig.domain}/contact`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Contact</p>
          <h1>お問い合わせ</h1>
          <p>
            記事内容に関するご連絡、媒体掲載、提携のご相談は下記からお送りください。
            相談内容に応じて確認のうえ返信します。提携相談は、掲載位置や導線の希望が分かると早いです。
          </p>
        </div>
      </section>

      <section className="container section-block">
        <div className="card-grid two-up">
          <article className="soft-card">
            <h2>読者向けのご相談</h2>
            <p>
              相続した実家、空き家、親名義の家、共有名義、売却前の片付けなど、
              記事内容に関するご連絡はこちらからお送りください。
            </p>
            <div className="inline-cta">
              <strong>連絡先</strong>
              <p>
                <a href={`mailto:${siteConfig.contactEmail}?subject=${readerSubject}&body=${readerBody}`}>
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
          </article>

          <article className="soft-card">
            <h2>媒体掲載・提携のご相談</h2>
            <p>
              不動産売却、相続、司法書士、解体、遺品整理、空き家管理など、
              関連サービスの媒体掲載や提携のご相談も受け付けています。
            </p>
            <ul className="plain-list">
              <li>独自ドメインで継続運営している媒体です</li>
              <li>地域別ページ、比較ページ、診断ページを持っています</li>
              <li>検索意図に合わせて掲載位置や文脈を分けて調整します</li>
            </ul>
            <div className="section-actions">
              <a className="primary-button" href={`mailto:${siteConfig.contactEmail}?subject=${partnerSubject}&body=${partnerBody}`}>
                提携相談を送る
              </a>
              <a className="ghost-button" href={`mailto:${siteConfig.contactEmail}?subject=${readerSubject}&body=${readerBody}`}>
                一般問い合わせを送る
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="container section-block">
        <article className="editorial-panel">
          <h2>提携相談で書いてもらえると早いこと</h2>
          <ul className="plain-list">
            <li>どのページに置きたいか</li>
            <li>資料請求、相談予約、比較表、診断結果などの希望導線</li>
            <li>想定している商材や訴求したい読者層</li>
            <li>報酬形態、審査状況、開始希望時期</li>
          </ul>
        </article>
      </section>
    </Layout>
  );
}
