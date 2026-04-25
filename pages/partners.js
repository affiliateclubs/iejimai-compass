import Link from 'next/link';
import Layout from '../components/Layout';
import { referralPrograms } from '../data/articles';
import { siteConfig } from '../data/site';

export default function PartnersPage() {
  const partnerSubject = encodeURIComponent('家じまいガイド 媒体掲載・提携相談');
  const partnerBody = encodeURIComponent(
    [
      '会社名：',
      'ご担当者名：',
      'ご希望の掲載先または提携先：',
      'ご希望の導線（査定 / 資料請求 / 相談 / 比較 / その他）：',
      '想定商材・サービス：',
      '希望開始時期：',
      '予算感：',
      '備考：'
    ].join('\n')
  );

  return (
    <Layout
      title="媒体方針・広告掲載について | 家じまいガイド"
      description="家じまいガイドの媒体方針、カバー領域、高単価の不動産査定・相続・片付け系サービスの広告掲載時の考え方をまとめたページです。"
      canonical={`${siteConfig.domain}/partners`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Media quality</p>
          <h1>媒体方針・広告掲載について</h1>
          <p>家じまいガイドは、相続した実家や空き家の整理・売却に関する検索意図を、地域別と困りごと別の両面からカバーする媒体として育てています。提携先には、診断、比較、地域、困りごと導線のどこに置くのが自然かまで含めて提案できます。</p>
          <div className="hero-actions">
            <a className="primary-button" href={`mailto:${siteConfig.contactEmail}?subject=${partnerSubject}&body=${partnerBody}`}>
              提携相談を送る
            </a>
            <a className="ghost-button" href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent('家じまいガイド 掲載位置の相談')}`}>
              掲載位置を相談する
            </a>
          </div>
        </div>
      </section>
      <section className="container section-block">
        <div className="card-grid three-up">
          <article className="soft-card">
            <h2>地域カバー</h2>
            <p>47都道府県ページと主要自治体ページを持ち、地域差を踏まえた導線を整えています。</p>
          </article>
          <article className="soft-card">
            <h2>検索意図カバー</h2>
            <p>相続、空き家、親名義、共有名義、片付け、税金、買取比較など、売却前に止まりやすい意図を広く拾います。</p>
          </article>
          <article className="soft-card">
            <h2>広告運用方針</h2>
            <p>単一導線に寄せすぎず、売却比較、司法書士、遺品整理、解体、空き家管理など複数レイヤーで連携できます。</p>
          </article>
        </div>
      </section>
      <section className="container section-block">
        <article className="editorial-panel">
          <h2>媒体として重視していること</h2>
          <ul className="plain-list">
            <li>検索流入だけでなく、地域と悩みの両方から回遊しやすい設計にすること</li>
            <li>相続や空き家の初動で止まりやすい読者に、比較前の判断材料を渡すこと</li>
            <li>広告リンクだけでなく、媒体全体の信頼性と継続性を担保すること</li>
          </ul>

          <h2>提携先に見せやすい掲載場所</h2>
          <ul className="plain-list">
            <li>家じまい進め方診断の結果ページ</li>
            <li>仲介と買取、解体後売却の比較ページ</li>
            <li>都道府県ページと市区町村ページの地域導線</li>
            <li>困りごと別ページの直後CTA</li>
          </ul>

          <h2>提携先に見せやすい状態</h2>
          <ul className="plain-list">
            <li>独自ドメイン、運営者情報、プライバシーポリシー、免責事項、編集方針を公開していること</li>
            <li>診断、比較、困りごと別、都道府県別など複数の導線を持っていること</li>
            <li>売却だけでなく、司法書士や片付けなど周辺ニーズまで自然につなげられること</li>
          </ul>

          <h2>提携相談時にあると早い情報</h2>
          <ul className="plain-list">
            <li>希望する掲載先のURL</li>
            <li>商材のターゲットと想定CV地点</li>
            <li>報酬形態と重視する訴求ポイント</li>
            <li>掲載開始時期と必要な審査情報</li>
          </ul>
        </article>
      </section>
      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Current referral stack</p>
          <h2>現在の売却・相談導線</h2>
        </div>
        <div className="card-grid two-up">
          {referralPrograms.map((program) => (
            <article key={program.slug} className="soft-card">
              <p className="eyebrow">{program.category}</p>
              <h3>{program.name}</h3>
              <p>{program.summary}</p>
              <ul className="plain-list">
                {program.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href={program.href}
                className="ghost-button"
                target="_blank"
                rel="sponsored nofollow noopener"
              >
                外部サービスを見る
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="container section-block">
        <div className="consultation-box">
          <div>
            <p className="eyebrow">Next step</p>
            <h2>掲載相談は、導線と商材を先に決めると早いです</h2>
            <p>
              売却比較、資料請求、相談予約、比較表、診断結果など、どこでCVを取りたいかが分かると、
              置き場所と文脈を合わせやすくなります。
            </p>
          </div>
          <div className="section-actions">
            <a className="primary-button" href={`mailto:${siteConfig.contactEmail}?subject=${partnerSubject}&body=${partnerBody}`}>
              そのまま提携相談を送る
            </a>
            <Link href="/contact" className="ghost-button">
              お問い合わせページを見る
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
