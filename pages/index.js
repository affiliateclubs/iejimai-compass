import Link from 'next/link';
import Layout from '../components/Layout';
import DiagnosisTool from '../components/DiagnosisTool';
import PrefectureMap from '../components/PrefectureMap';
import { comparePages, guides, partnerLayers, problemGuides, referralPrograms, siteFaq } from '../data/articles';
import {
  getPrefecture,
  getPriorityCityObjects,
  prefectures
} from '../data/areas';
import { siteConfig } from '../data/site';

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const featuredPrefectures = ['kanagawa', 'tokyo', 'saitama', 'chiba', 'osaka', 'kyoto', 'hyogo']
    .map((slug) => getPrefecture(slug))
    .filter(Boolean);
  const featuredCities = ['kanagawa', 'tokyo', 'osaka', 'hyogo']
    .flatMap((slug) => getPriorityCityObjects(slug).slice(0, 3));

  return (
    <Layout structuredData={faqSchema}>
      <section className="hero-band">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">47都道府県から探せる家じまい総合ガイド</p>
            <h1>相続した実家や空き家を、どこから整理して売るかを迷わないための総合ガイド</h1>
            <p className="hero-copy">
              一括査定の前に、相続登記、残置物、売却方法、地域相場の見方まで整理します。
              家じまいガイドは、47都道府県と主要自治体の地域特徴、公的データ、困りごと別の記事を使って、損しにくい順番を案内するサイトです。
            </p>
            <div className="hero-actions">
              <a href={siteConfig.primaryCta.href} className="primary-button">
                {siteConfig.primaryCta.label}
              </a>
              <Link href="/regions" className="ghost-button">
                都道府県マップを見る
              </Link>
              <Link href="/checklist" className="ghost-button">
                売却前チェックリストを見る
              </Link>
            </div>
            <p className="pr-note">※ PRを含みます。売却査定、地域相談、周辺サービスへの導線があります。</p>
          </div>
          <aside className="hero-panel">
            <h2>このサイトでわかること</h2>
            <ul>
              <li>相続した家を売る前に何を確認するか</li>
              <li>空き家を仲介・買取・解体後売却のどれで進めるか</li>
              <li>都道府県や市区町村ごとの売却の考え方</li>
              <li>司法書士、解体、遺品整理まで含めた動き方</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Situation navigation</p>
          <h2>いまの状況から近い入口を選ぶ</h2>
        </div>
        <div className="situation-grid">
          <Link href="/diagnosis" className="situation-card highlight-card">
            <span className="situation-icon">🧭</span>
            <span className="situation-label">3分で進め方を診断する</span>
          </Link>
          <Link href="/guide/souzoku-jikka-first-step" className="situation-card">
            <span className="situation-icon">🏠</span>
            <span className="situation-label">相続した実家をどうするか迷っている</span>
          </Link>
          <Link href="/guide/akiya-sell-four-routes" className="situation-card">
            <span className="situation-icon">📦</span>
            <span className="situation-label">空き家の放置が気になっている</span>
          </Link>
          <Link href="/compare/chukai-vs-kaitori" className="situation-card">
            <span className="situation-icon">⏳</span>
            <span className="situation-label">なるべく早く売りたい</span>
          </Link>
          <Link href="/compare/chukai-vs-kaitori" className="situation-card">
            <span className="situation-icon">⚖️</span>
            <span className="situation-label">仲介か買取かで迷っている</span>
          </Link>
          <Link href="/guide/zanchiutsu-sell" className="situation-card">
            <span className="situation-icon">🧳</span>
            <span className="situation-label">家財が多くて動けない</span>
          </Link>
          <Link href="/guide/souzoku-touki-2026" className="situation-card">
            <span className="situation-icon">📝</span>
            <span className="situation-label">相続登記や名義で止まっている</span>
          </Link>
        </div>
      </section>

      <section className="container section-block">
        <PrefectureMap prefectures={prefectures} title="47都道府県の地域ガイドを地図から探す" />
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Prefecture navigation</p>
          <h2>都道府県一覧から直接探す</h2>
        </div>
        <div className="map-search-results">
          {prefectures.map((prefecture) => (
            <Link key={prefecture.slug} href={`/${prefecture.slug}`} className="map-search-chip">
              {prefecture.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Why this site can win</p>
          <h2>全国系は広い、地場ページは薄い。その隙間を埋める設計です。</h2>
        </div>
        <div className="card-grid three-up">
          <article className="soft-card">
            <h3>全国系より深く</h3>
            <p>相続、空き家、実家じまいの悩みを分けて解説し、単なる査定比較で終わらせません。</p>
          </article>
          <article className="soft-card">
            <h3>地場ページより厚く</h3>
            <p>相場、税金、登記、片付け、売却ルートまでひとつの流れで整理します。</p>
          </article>
          <article className="soft-card">
            <h3>一括査定依存にしない</h3>
            <p>査定、売却相談、司法書士、解体、空き家管理など複数の出口を持たせます。</p>
          </article>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Quick diagnosis</p>
          <h2>6つの質問で、いま先に見るべきルートを出す</h2>
        </div>
        <p className="section-copy">結果は名義整理、片付け、早期売却、地域確認の4ルートに分かれます。先に見る順番がわかるだけで、売却のムダ打ちをかなり減らせます。</p>
        <DiagnosisTool />
        <div className="section-actions">
          <Link href="/diagnosis" className="ghost-button">
            もっと詳しく診断する
          </Link>
        </div>
      </section>

      <section className="container section-block">
        <div className="consultation-box">
          <div>
            <p className="eyebrow">Fast track</p>
            <h2>もう動くと決めているなら、比較先を先に開いた方が早いです</h2>
            <p>
              まず査定を急ぐのか、紹介制度を見たいのかで入口を分けると、同じ説明を何社にもするムダを減らしやすくなります。
            </p>
          </div>
          <div className="card-grid two-up compact">
            {referralPrograms.slice(0, 2).map((program) => (
              <article key={program.slug} className="soft-card">
                <p className="eyebrow">{program.category}</p>
                <h3>{program.name}</h3>
                <p>{program.summary}</p>
                <a
                  href={program.href}
                  className="primary-button"
                  target="_blank"
                  rel="sponsored nofollow noopener"
                >
                  先に {program.name} を見る
                </a>
              </article>
            ))}
          </div>
          <div className="section-actions">
            <Link href="/partners" className="ghost-button">
              相談先の考え方を見る
            </Link>
            <Link href="/compare/chukai-vs-kaitori" className="ghost-button">
              仲介と買取の比較を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Featured prefectures</p>
          <h2>最初に厚く作り込む都道府県</h2>
        </div>
        <div className="card-grid three-up">
          {featuredPrefectures.map((prefecture) => (
            <Link key={prefecture.slug} href={`/${prefecture.slug}`} className="guide-card">
              <h3>{prefecture.name}の地域ガイド</h3>
              <p>{prefecture.intro}</p>
              <span>都道府県ページを見る</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">What this site offers</p>
          <h2>家じまいガイドでできること</h2>
        </div>
        <div className="service-hub-grid">
          <Link href="/checklist" className="service-hub-card">
            <div className="service-hub-icon">📋</div>
            <h3>売却前チェックリストを見る</h3>
            <p>名義、書類、片付け、売り方の確認ポイントを1ページで見られます。</p>
            <span className="service-hub-btn">チェックする</span>
          </Link>
          <Link href="/compare/chukai-vs-kaitori" className="service-hub-card">
            <div className="service-hub-icon">🔍</div>
            <h3>仲介と買取を比較する</h3>
            <p>高く売るか、早く手放すかで何が変わるかをざっくり比較できます。</p>
            <span className="service-hub-btn">比較を見る</span>
          </Link>
          <Link href="/flow" className="service-hub-card">
            <div className="service-hub-icon">🧭</div>
            <h3>売却の流れを確認する</h3>
            <p>相続した実家を売るときに、どの順番で進めると詰まりにくいかを整理します。</p>
            <span className="service-hub-btn">流れを見る</span>
          </Link>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Priority cities</p>
          <h2>検索されやすい主要自治体から先に見る</h2>
        </div>
        <div className="city-grid">
          {featuredCities.map((city) => (
            <Link key={`${city.prefecture}-${city.slug}`} href={`/${city.prefecture}/${city.slug}`} className="city-card">
              <span className="city-badge">{getPrefecture(city.prefecture)?.shortName}</span>
              <strong>{city.name}</strong>
              <p>{city.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Guide stack</p>
          <h2>基幹記事から地域ページへ自然につなぐ</h2>
        </div>
        <div className="card-grid two-up">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guide/${guide.slug}`} className="guide-card">
              <h3>{guide.h1}</h3>
              <p>{guide.description}</p>
              <span>続きを読む</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Problem guides</p>
          <h2>家を売りたいときの困りごとから探す</h2>
        </div>
        <div className="card-grid three-up">
          {problemGuides.slice(0, 6).map((guide) => (
            <Link key={guide.slug} href={`/guide/${guide.slug}`} className="guide-card">
              <h3>{guide.h1}</h3>
              <p>{guide.description}</p>
              <span>困りごと記事を見る</span>
            </Link>
          ))}
        </div>
        <div className="section-actions">
          <Link href="/problems" className="ghost-button">困りごと一覧を見る</Link>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Featured prefectures</p>
          <h2>よく比較されやすい都道府県を先に見る</h2>
        </div>
        <div className="card-grid two-up">
          <article className="soft-card">
            <h3>首都圏の注目エリア</h3>
            <ul className="plain-list">
              {featuredPrefectures.slice(0, 4).map((prefecture) => (
                <li key={prefecture.slug}>
                  <Link href={`/${prefecture.slug}`}>{prefecture.name}</Link>
                </li>
              ))}
            </ul>
          </article>
          <article className="soft-card">
            <h3>関西と周辺の注目エリア</h3>
            <ul className="plain-list">
              {featuredPrefectures.slice(4).map((prefecture) => (
                <li key={prefecture.slug}>
                  <Link href={`/${prefecture.slug}`}>{prefecture.name}</Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Comparison stack</p>
          <h2>売り方の比較で迷いを減らす</h2>
        </div>
        <div className="card-grid two-up">
          {comparePages.map((page) => (
            <Link key={page.slug} href={`/compare/${page.slug}`} className="guide-card">
              <h3>{page.h1}</h3>
              <p>{page.description}</p>
              <span>比較を見る</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="consultation" className="container section-block">
        <div className="consultation-box">
          <div>
            <p className="eyebrow">Monetization stack</p>
            <h2>収益導線は1本に寄せすぎない</h2>
            <p>
              高単価の売却査定や紹介制度が落ちても、司法書士、遺品整理、解体、空き家管理で先に収益化できる構成にします。
            </p>
          </div>
          <div className="card-grid two-up compact">
            {partnerLayers.map((layer) => (
              <article key={layer.title} className="soft-card">
                <h3>{layer.title}</h3>
                <ul className="plain-list">
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="section-actions">
            <Link href="/partners" className="primary-button">
              媒体方針を見る
            </Link>
            <Link href="/contact" className="ghost-button">
              提携相談を送る
            </Link>
            <Link href="/editorial-policy" className="ghost-button">
              編集方針を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Referral programs</p>
          <h2>いま案内している売却・相談サービス</h2>
        </div>
        <p className="section-copy">
          査定を急ぐ人、複数社を比較したい人、紹介制度を使いたい人では向く先が変わります。状況に近いサービスから先に見ると、ムダな問い合わせを減らしやすくなります。
        </p>
        <div className="card-grid two-up">
          {referralPrograms.map((program) => (
            <article key={program.slug} className="guide-card">
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
                className="primary-button"
                target="_blank"
                rel="sponsored nofollow noopener"
              >
                {program.name}を確認する
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Media quality</p>
          <h2>広告主に見せやすい媒体づくりも進めています</h2>
        </div>
        <div className="card-grid two-up">
          <article className="soft-card">
            <h3>地域網羅</h3>
            <p>47都道府県と主要自治体をカバーし、地域差を踏まえた導線を持つ構成です。</p>
          </article>
          <article className="soft-card">
            <h3>悩み起点の流入</h3>
            <p>「売りたい」だけでなく、相続、空き家、共有名義、片付け、税金などの困りごとから集客できる形にしています。</p>
          </article>
        </div>
        <div className="section-actions">
          <Link href="/partners" className="ghost-button">媒体方針を見る</Link>
          <Link href="/contact" className="primary-button">提携相談を送る</Link>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>よくある質問</h2>
        </div>
        <div className="faq-stack">
          {siteFaq.map((item) => (
            <article key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
