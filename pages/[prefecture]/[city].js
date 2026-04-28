import Link from 'next/link';
import CityClusterMap from '../../components/CityClusterMap';
import Layout from '../../components/Layout';
import ServicePathCards from '../../components/ServicePathCards';
import { comparePages, getSolutionPages } from '../../data/articles';
import {
  getCity,
  getCityCluster,
  getCitiesByPrefecture,
  getPrefecture,
  prefectures
} from '../../data/areas';
import { siteConfig } from '../../data/site';
import {
  formatYen,
  getPrefectureStats,
  nationalAverages
} from '../../data/prefectureStats';

export default function CityPage({ city, prefecture, relatedCities }) {
  if (!city || !prefecture) return null;

  const solutionPages = getSolutionPages(prefecture);
  const cityCluster = getCityCluster(prefecture.slug);
  const stats = getPrefectureStats(prefecture.slug);

  const richDesc = stats
    ? `${city.name}の家じまい・空き家売却を考えるときの県レベルのデータ(住宅地公示地価 ${formatYen(stats.landPriceAvg)}/㎡、空き家率 ${stats.vacantHouseRate}%、65歳以上比率 ${stats.agingRate}%)と、判断に必要なポイントをまとめた地域ページです。`
    : city.summary;

  return (
    <Layout
      title={`${city.headline} | 家じまいガイド`}
      description={richDesc}
      canonical={`${siteConfig.domain}/${prefecture.slug}/${city.slug}`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">City page</p>
          <h1>{city.headline}</h1>
          <p>{city.summary}</p>
        </div>
      </section>

      {stats && (
        <section className="container section-block">
          <div className="section-heading">
            <p className="eyebrow">Data ({prefecture.shortName}全体の参考値)</p>
            <h2>{prefecture.shortName}の公的データから見た売却環境</h2>
            <p style={{ color: '#6b5648', fontSize: '0.85rem' }}>
              以下は{prefecture.shortName}全体の値です。{city.name}固有の地価は国土交通省「不動産情報ライブラリ」で地番レベルで確認できます。
              出典: 国土交通省地価公示 2026年 / 総務省住宅・土地統計調査 2023年 / 内閣府高齢社会白書 2024年値
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">{prefecture.shortName}住宅地公示地価 平均</p>
              <p className="stat-value">{formatYen(stats.landPriceAvg)}<span className="stat-unit">/㎡</span></p>
              <p className="stat-note">全国平均 {formatYen(nationalAverages.landPriceAvg)}/㎡</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">{prefecture.shortName}の空き家率</p>
              <p className="stat-value">{stats.vacantHouseRate}<span className="stat-unit">%</span></p>
              <p className="stat-note">全国平均 {nationalAverages.vacantHouseRate}%（居住目的のない空き家）</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">{prefecture.shortName}の高齢化率</p>
              <p className="stat-value">{stats.agingRate}<span className="stat-unit">%</span></p>
              <p className="stat-note">全国平均 {nationalAverages.agingRate}%</p>
            </div>
          </div>
        </section>
      )}

      <section className="container section-block">
        <div className="card-grid two-up">
          <article className="soft-card">
            <h2>この地域で起きやすい悩み</h2>
            <ul className="plain-list">
              {city.painPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="soft-card">
            <h2>この地域で見ておきたいポイント</h2>
            <ul className="plain-list">
              {city.signals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="container section-block">
        <article className="editorial-panel">
          <h2>{city.name}でまず詰まりやすいポイント</h2>
          <p>
            いきなり査定に進むより、名義、相続人、残置物、売却の優先度を先に固めたほうが、価格も手間も崩れにくくなります。
            特に {city.name} のように地域差が出やすいエリアは、仲介と買取の比較を雑にしないことが重要です。
          </p>
          <h2>今日やること</h2>
          <ul className="plain-list">
            <li>固定資産税の通知と登記事項を確認する</li>
            <li>住まない前提か、貸す可能性があるか家族で決める</li>
            <li>仲介・買取・解体後売却の3択だけ先に比較する</li>
          </ul>
          <h2>このページの見方</h2>
          <p>
            地域の特徴を見るときは、印象だけで決めず、地図、統計、取引価格を一緒に確認するのが基本です。
            {city.name} のページでは、総務省統計局の市区町村統計、国土交通省の不動産情報ライブラリ、
            国土地理院の地図を前提に、売り方の違いを整理しやすい形にしています。
          </p>
          <ul className="plain-list">
            {siteConfig.publicDataSources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <ServicePathCards
        title={`${city.name}の家じまいで先に比較したいサービス`}
        lead={`${city.name}で売るか残すかを決める前に、片付け・解体・不用品処分の費用感を押さえると、仲介と買取の判断がしやすくなります。`}
        variant="city"
      />

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">City solutions</p>
          <h2>{city.name}の悩み別ページ</h2>
        </div>
        <div className="card-grid three-up">
          {[
            { slug: 'souzoku-jikka', label: '相続した実家', heading: `${city.name}で相続した実家を売る流れ` },
            { slug: 'akiya-baikyaku', label: '空き家', heading: `${city.name}で空き家を売るには` },
            { slug: 'hayaku-uritai', label: '早く売る', heading: `${city.name}で家を早く売りたいときの進め方` },
            { slug: 'ikkatsu-satei', label: '一括査定比較', heading: `${city.name}の家を売るときの一括査定サービス比較` },
            { slug: 'kaitori-hikaku', label: '買取比較', heading: `${city.name}で買取業者を比較する方法` },
            { slug: 'houchi-risk', label: '放置コスト', heading: `${city.name}で空き家を放置した場合のコストとリスク` },
            { slug: 'zanchiutsu-katazuke', label: '残置物整理', heading: `${city.name}で残置物が多い実家を片付けて売る流れ` },
            { slug: 'kaitai-sarachi', label: '解体して売る', heading: `${city.name}で古い家を解体して土地として売る判断` }
          ].map((entry) => (
            <Link
              key={entry.slug}
              href={`/${prefecture.slug}/${city.slug}/solution/${entry.slug}`}
              className="guide-card"
            >
              <h3>{entry.heading}</h3>
              <p>{city.name}の{entry.label}のページを見る</p>
              <span>悩み別ページを見る</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Prefecture solutions</p>
          <h2>{prefecture.shortName}全体での悩み別ページ</h2>
        </div>
        <div className="card-grid three-up">
          {solutionPages.slice(0, 6).map((page) => (
            <Link key={page.slug} href={`/${prefecture.slug}/solution/${page.slug}`} className="guide-card">
              <h3>{page.h1}</h3>
              <p>{page.description}</p>
              <span>{prefecture.shortName}全体で見る</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="card-grid two-up">
          {comparePages.map((page) => (
            <Link key={page.slug} href={`/compare/${page.slug}`} className="guide-card">
              <h3>{page.h1}</h3>
              <p>{page.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <CityClusterMap
          prefecture={prefecture}
          cities={cityCluster}
          currentCitySlug={city.slug}
          title={`${prefecture.shortName}の中で ${city.name} はこの辺り`}
        />
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Nearby cluster</p>
          <h2>{prefecture.shortName}の他の重点市区町村</h2>
        </div>
        <div className="city-grid">
          {relatedCities.map((item) => (
            <Link key={item.slug} href={`/${prefecture.slug}/${item.slug}`} className="city-card">
              <span className="city-badge">{prefecture.shortName}</span>
              <strong>{item.name}</strong>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: prefectures.flatMap((prefecture) =>
      getCitiesByPrefecture(prefecture.slug).map((city) => ({
        params: { prefecture: prefecture.slug, city: city.slug }
      }))
    ),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const prefecture = getPrefecture(params.prefecture);
  if (!prefecture) return { notFound: true };

  const city = getCity(prefecture.slug, params.city);
  if (!city) return { notFound: true };

  return {
    props: {
      prefecture,
      city,
      relatedCities: getCitiesByPrefecture(prefecture.slug).filter((entry) => entry.slug !== city.slug).slice(0, 8)
    }
  };
}
