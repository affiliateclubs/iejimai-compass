import Link from 'next/link';
import CityClusterMap from '../components/CityClusterMap';
import Layout from '../components/Layout';
import PrefectureMap from '../components/PrefectureMap';
import { comparePages, getSolutionPages } from '../data/articles';
import {
  getCityCluster,
  getCitiesByPrefecture,
  getPrefecture,
  prefectures
} from '../data/areas';
import { siteConfig } from '../data/site';
import {
  formatYen,
  getPrefectureStats,
  nationalAverages,
  strategyForPrefecture
} from '../data/prefectureStats';

const regionCharacteristicMap = {
  hokkaido: '市街地と郊外・地方部の距離感が大きく、遠方から管理するケースを意識したい地域です。',
  tohoku: '実家じまい、空き家管理、遠方相続の相談が出やすく、順番整理が大切になりやすい地域です。',
  kanto: '都市部、住宅地、郊外で家の動き方がかなり変わるため、同じ県でも生活圏ごとの差を見たい地域です。',
  chubu: '都市部と地方部の差が大きく、立地や生活圏ごとに売り方を分けて考えたい地域です。',
  kansai: '大都市近郊と郊外・地方部の違いが出やすく、比較と実家じまいの両方を見たい地域です。',
  chugoku: '中心市街地と地方部の差が出やすく、戸建て相続や空き家管理の負担も見落としにくい地域です。',
  shikoku: '遠方からの相続や空き家管理の相談が出やすく、まず順番整理から入りやすい地域です。',
  kyushu: '県庁所在地と地方部の差が出やすく、比較と実家じまいの両方を整理して見たい地域です。'
};

function buildPrefectureCharacteristics(prefecture, cities) {
  const names = cities.slice(0, 4).map((city) => city.name);
  const leadCities = names.join(' / ');
  return [
    `主な自治体は ${leadCities} で、同じ県の中でも生活圏や住宅の動き方に差があります。`,
    regionCharacteristicMap[prefecture.region] || '地域ごとの差を見ながら売り方を整理したい県です。',
    '県ページだけで決めず、市区町村ページまで見てから仲介・買取・現状売却を比べるのが安全です。'
  ];
}

function compareToNational(value, national) {
  if (value == null || national == null) return null;
  const ratio = value / national;
  if (ratio >= 1.1) return { label: '全国平均を上回る', kind: 'above' };
  if (ratio <= 0.9) return { label: '全国平均を下回る', kind: 'below' };
  return { label: '全国平均と同水準', kind: 'same' };
}

export default function PrefecturePage({ prefecture, cities }) {
  if (!prefecture) return null;

  const solutionPages = getSolutionPages(prefecture);
  const cityCluster = getCityCluster(prefecture.slug);
  const characteristics = buildPrefectureCharacteristics(prefecture, cities);
  const stats = getPrefectureStats(prefecture.slug);
  const strategies = strategyForPrefecture(prefecture.slug);

  const structuredDescription = stats
    ? `${prefecture.name}の住宅地公示地価は${formatYen(stats.landPriceAvg)}/㎡、居住目的のない空き家率は${stats.vacantHouseRate}%、65歳以上人口割合は${stats.agingRate}%（2023〜2026年公表値）。相続・実家じまい・空き家売却の判断材料をまとめた地域ガイドです。`
    : `${prefecture.name}で相続した実家や空き家をどう売るかを、地域特徴・市区町村別に整理した地域ガイドです。`;

  return (
    <Layout
      title={`${prefecture.name}の実家・空き家売却ガイド｜地価・空き家率・高齢化率のデータ付き`}
      description={structuredDescription}
      canonical={`${siteConfig.domain}/${prefecture.slug}`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Prefecture guide</p>
          <h1>{prefecture.name}で相続した実家や空き家を売るための地域ガイド</h1>
          <p>{prefecture.intro}</p>
          <p>{prefecture.lead}</p>
          <p className="pr-note">
            主な自治体: {cities.slice(0, 6).map((city) => city.name).join(' / ')}
          </p>
        </div>
      </section>

      {stats && (
        <section className="container section-block">
          <div className="section-heading">
            <p className="eyebrow">Data</p>
            <h2>{prefecture.shortName}の家じまい・不動産データ</h2>
            <p style={{ color: '#555', fontSize: '0.9rem' }}>
              出典: 国土交通省地価公示 2026年 / 総務省住宅・土地統計調査 2023年 / 内閣府高齢社会白書 2024年値
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">住宅地公示地価 平均</p>
              <p className="stat-value">{formatYen(stats.landPriceAvg)}<span className="stat-unit">/㎡</span></p>
              <p className="stat-note">
                全国平均 {formatYen(nationalAverages.landPriceAvg)}/㎡（
                {compareToNational(stats.landPriceAvg, nationalAverages.landPriceAvg)?.label ?? ''}）
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">居住目的のない空き家率</p>
              <p className="stat-value">{stats.vacantHouseRate}<span className="stat-unit">%</span></p>
              <p className="stat-note">
                全国平均 {nationalAverages.vacantHouseRate}%（
                {compareToNational(stats.vacantHouseRate, nationalAverages.vacantHouseRate)?.label ?? ''}）
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">65歳以上人口割合</p>
              <p className="stat-value">{stats.agingRate}<span className="stat-unit">%</span></p>
              <p className="stat-note">
                全国平均 {nationalAverages.agingRate}%（
                {compareToNational(stats.agingRate, nationalAverages.agingRate)?.label ?? ''}）
              </p>
            </div>
          </div>

          {strategies && strategies.length > 0 && (
            <div className="strategy-block">
              <h3>データから読む {prefecture.shortName} の売却判断ポイント</h3>
              <ul className="strategy-list">
                {strategies.map((note) => (
                  <li key={note.heading}>
                    <strong>{note.heading}</strong>
                    <p>{note.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="container section-block">
        <div className="card-grid three-up">
          {prefecture.traits.map((item) => (
            <article key={item} className="soft-card">
              <h2>{item}</h2>
              <p>{prefecture.name}の売却判断で見落としにくくするための重要ポイントです。</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <article className="editorial-panel">
          <h2>{prefecture.shortName}の地域特徴をつかむポイント</h2>
          <ul className="plain-list">
            {characteristics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Situation paths</p>
          <h2>{prefecture.shortName}で最初に分けるべき悩み</h2>
        </div>
        <div className="card-grid three-up">
          {solutionPages.map((item) => (
            <Link key={item.slug} href={`/${prefecture.slug}/solution/${item.slug}`} className="guide-card">
              <h3>{item.h1}</h3>
              <p>{item.description}</p>
              <span>悩み別ページを見る</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Priority cities</p>
          <h2>{prefecture.shortName}で先に厚く見る市区町村</h2>
        </div>
        <div className="city-grid">
          {cities.map((city) => (
            <Link key={city.slug} href={`/${prefecture.slug}/${city.slug}`} className="city-card">
              <span className="city-badge">{prefecture.shortName}</span>
              <strong>{city.name}</strong>
              <p>{city.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <CityClusterMap
          prefecture={prefecture}
          cities={cityCluster}
          title={`${prefecture.shortName}の主要自治体マップ`}
        />
      </section>

      <section className="container section-block">
        <article className="editorial-panel">
          <h2>{prefecture.shortName}で先に押さえる地域特徴</h2>
          <ul className="plain-list">
            {prefecture.areaNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>地図と統計をどう読むか</h2>
          <p>
            この県ページでは、総務省統計局の都道府県・市区町村統計、国土交通省の不動産情報ライブラリ、
            国土地理院の地図を前提に、地域差を見ながら家の売り方を整理できるようにしています。
            県全体の印象だけで決めず、実際に売る市区町村ページまで見てから判断するのが安全です。
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
          <div className="inline-cta">
            <strong>まず確認したいページ</strong>
            <p>
              <Link href={`/data/${prefecture.slug}/land-price`}>地価と売却相場の見方</Link>
              {' '}と{' '}
              <Link href="/compare/chukai-vs-kaitori">仲介と買取の比較</Link>
              {' '}を先に見ておくと、地域差と売り方のズレを減らしやすくなります。
            </p>
          </div>
        </article>
      </section>

      <section className="container section-block">
        <PrefectureMap prefectures={prefectures} title="全国の都道府県マップに戻る" />
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Compare first</p>
          <h2>{prefecture.shortName}で迷いやすい比較</h2>
        </div>
        <div className="card-grid two-up">
          {comparePages.map((item) => (
            <Link key={item.slug} href={`/compare/${item.slug}`} className="guide-card">
              <h3>{item.h1}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: prefectures.map((prefecture) => ({ params: { prefecture: prefecture.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const prefecture = getPrefecture(params.prefecture);
  if (!prefecture) return { notFound: true };

  return {
    props: {
      prefecture,
      cities: getCitiesByPrefecture(prefecture.slug)
    }
  };
}
