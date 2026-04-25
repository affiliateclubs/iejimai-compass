import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { comparePages, getSolutionPages } from '../../../../data/articles';
import {
  getCity,
  getCitiesByPrefecture,
  getPrefecture,
  prefectures
} from '../../../../data/areas';
import { siteConfig } from '../../../../data/site';
import {
  formatYen,
  getPrefectureStats,
  nationalAverages
} from '../../../../data/prefectureStats';

const citySolutionTemplates = {
  'souzoku-jikka': (prefecture, city) => ({
    slug: 'souzoku-jikka',
    title: `${city.name}で相続した実家を売る流れ`,
    description: `${prefecture.name}${city.name}で相続した実家の名義整理、相続人調整、売却ルートの組み立て方をまとめた案内ページです。`,
    h1: `${city.name}で相続した実家を売る流れ`,
    intro: `${city.name}で相続した実家は、査定より先に名義と残置物の整理で止まりやすいテーマです。${prefecture.shortName}の中でも${city.name}は地域特性があるため、売却ルートを並べて比較するほうが判断しやすくなります。`,
    bullets: [
      `${city.name}の相場を一括査定で把握する`,
      '相続登記と相続人の意向を整理する',
      '仲介・買取・古家付き土地の3択で比較する'
    ],
    angle: '相続した実家'
  }),
  'akiya-baikyaku': (prefecture, city) => ({
    slug: 'akiya-baikyaku',
    title: `${city.name}で空き家を売るには`,
    description: `${prefecture.name}${city.name}で空き家を売るときの放置コスト、売却ルート、片付けの順番を整理する案内ページです。`,
    h1: `${city.name}で空き家を売るには`,
    intro: `${city.name}の空き家は、放置期間が長くなるほど管理コストと近隣リスクが積み上がります。${prefecture.shortName}のなかでも${city.name}は仲介と買取の見極めが大切です。`,
    bullets: [
      '固定資産税と管理費の年間合計を出す',
      '買取と仲介を両方見積もりに出す',
      '残置物の量で片付けの深さを決める'
    ],
    angle: '空き家'
  }),
  'hayaku-uritai': (prefecture, city) => ({
    slug: 'hayaku-uritai',
    title: `${city.name}で家を早く売りたいときの進め方`,
    description: `${prefecture.name}${city.name}で家を急いで手放したい人向けに、買取の使い方と査定の比較ポイントを整理します。`,
    h1: `${city.name}で家を早く売りたいときの進め方`,
    intro: `${city.name}で早く売りたいなら、高値を追うより売却までの総時間を短くする設計が必要です。買取と仲介のスピード差を先に把握するのが近道です。`,
    bullets: [
      '買取の提示額を複数社並べる',
      '仲介でも早く動ける業者を1社混ぜる',
      '残置物・片付けを買取側に寄せられるか確認する'
    ],
    angle: '早く手放す'
  }),
  'ikkatsu-satei': (prefecture, city) => ({
    slug: 'ikkatsu-satei',
    title: `${city.name}の家を売るときの一括査定サービス比較`,
    description: `${prefecture.name}${city.name}の家売却で使える一括査定サービスと、使い分けのポイントを整理する案内ページです。`,
    h1: `${city.name}の家を売るときの一括査定サービス比較`,
    intro: `${city.name}のように業者の得意エリアに差がある地域では、1社で決めずに一括査定で分布を見るのが安全です。目的別にHOME4U・イエウール・リビンマッチを使い分けると整理しやすくなります。`,
    bullets: [
      '大手比較は相場のブレを把握するために使う',
      '買取寄りのサービスは早さ重視のときに入れる',
      '地域密着サービスは最後の詰めで併用する'
    ],
    angle: '一括査定'
  }),
  'kaitori-hikaku': (prefecture, city) => ({
    slug: 'kaitori-hikaku',
    title: `${city.name}で買取業者を比較する方法`,
    description: `${prefecture.name}${city.name}で空き家や古い実家を買取で手放すときの、買取業者比較の手順をまとめます。`,
    h1: `${city.name}で買取業者を比較する方法`,
    intro: `${city.name}で買取を検討するなら、買取専門と仲介兼業の両方から見積もりを取るのが基本です。価格だけでなく残置物対応や現地対応の重さまで並べて比べると失敗しにくくなります。`,
    bullets: [
      '買取専門・仲介兼業の両方に当てる',
      '残置物対応と解体費の扱いを聞く',
      '買取価格と仲介の想定手残りを並べる'
    ],
    angle: '買取比較'
  }),
  'houchi-risk': (prefecture, city) => ({
    slug: 'houchi-risk',
    title: `${city.name}で空き家を放置した場合のコストとリスク`,
    description: `${prefecture.name}${city.name}で空き家や住まない実家を放置したときに発生する固定費・管理負担・近隣リスクを整理する案内ページです。`,
    h1: `${city.name}で空き家を放置した場合のコストとリスク`,
    intro: `${city.name}で住まない家をそのままにしておくと、固定資産税・管理費・近隣トラブルが1年単位で積み上がります。放置続行と売却の損益を並べて見るほうが判断しやすくなります。`,
    bullets: [
      '固定資産税と管理費の年間合計を先に計算する',
      '特定空家指定のリスクを確認する',
      '放置1年と売却時の手残りを並べて比較する'
    ],
    angle: '放置コスト'
  })
};

const citySolutionSlugs = Object.keys(citySolutionTemplates);

export default function CitySolutionPage({ page, prefecture, city, relatedCities }) {
  if (!page || !prefecture || !city) return null;
  const stats = getPrefectureStats(prefecture.slug);

  const pageDesc = stats
    ? `${page.description} ${prefecture.shortName}全体の住宅地公示地価は${formatYen(stats.landPriceAvg)}/㎡、空き家率${stats.vacantHouseRate}%、65歳以上比率${stats.agingRate}%(2023-2026年公表値)。`
    : page.description;

  return (
    <Layout
      title={`${page.title} | 家じまいガイド`}
      description={pageDesc}
      canonical={`${siteConfig.domain}/${prefecture.slug}/${city.slug}/solution/${page.slug}`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">{prefecture.shortName} / {city.name} / {page.angle}</p>
          <h1>{page.h1}</h1>
          <p>{page.intro}</p>
        </div>
      </section>

      {stats && (
        <section className="container section-block">
          <div className="section-heading">
            <p className="eyebrow">Data ({prefecture.shortName}全体の参考値)</p>
            <h2>{prefecture.shortName}の売却環境を数字で確認</h2>
            <p style={{ color: '#6b5648', fontSize: '0.85rem' }}>
              出典: 国土交通省地価公示 2026年 / 総務省住宅・土地統計調査 2023年 / 内閣府高齢社会白書 2024年値
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">住宅地公示地価 平均</p>
              <p className="stat-value">{formatYen(stats.landPriceAvg)}<span className="stat-unit">/㎡</span></p>
              <p className="stat-note">全国平均 {formatYen(nationalAverages.landPriceAvg)}/㎡</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">空き家率</p>
              <p className="stat-value">{stats.vacantHouseRate}<span className="stat-unit">%</span></p>
              <p className="stat-note">全国平均 {nationalAverages.vacantHouseRate}%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">高齢化率</p>
              <p className="stat-value">{stats.agingRate}<span className="stat-unit">%</span></p>
              <p className="stat-note">全国平均 {nationalAverages.agingRate}%</p>
            </div>
          </div>
        </section>
      )}

      <section className="container section-block">
        <article className="editorial-panel">
          <h2>{city.name}で先に整理すること</h2>
          <ul className="plain-list">
            {page.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{city.name}の特徴を踏まえたポイント</h2>
          <ul className="plain-list">
            {city.signals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="inline-cta">
            <strong>今日やること</strong>
            <p>
              {city.name}の相場を一括査定でざっくり掴み、名義・残置物・売り方の優先順位を家族で決めます。
              急ぎ度合いと手残り重視のどちらを選ぶかで、仲介と買取の使い分けが変わります。
            </p>
          </div>
        </article>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">City shortcuts</p>
          <h2>{city.name}の他の悩み別ページ</h2>
        </div>
        <div className="card-grid three-up">
          {citySolutionSlugs
            .filter((slug) => slug !== page.slug)
            .map((slug) => {
              const other = citySolutionTemplates[slug](prefecture, city);
              return (
                <Link
                  key={slug}
                  href={`/${prefecture.slug}/${city.slug}/solution/${slug}`}
                  className="guide-card"
                >
                  <h3>{other.h1}</h3>
                  <p>{other.description}</p>
                  <span>{city.name}の{other.angle}ページを見る</span>
                </Link>
              );
            })}
        </div>
      </section>

      <section className="container section-block">
        <div className="card-grid two-up">
          {comparePages.map((entry) => (
            <Link key={entry.slug} href={`/compare/${entry.slug}`} className="guide-card">
              <h3>{entry.h1}</h3>
              <p>{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Prefecture shortcuts</p>
          <h2>{prefecture.shortName}全体での{page.angle}の考え方</h2>
        </div>
        <div className="card-grid three-up">
          {getSolutionPages(prefecture).slice(0, 6).map((entry) => (
            <Link
              key={entry.slug}
              href={`/${prefecture.slug}/solution/${entry.slug}`}
              className="guide-card"
            >
              <h3>{entry.h1}</h3>
              <p>{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Nearby cities</p>
          <h2>{prefecture.shortName}の近隣エリア</h2>
        </div>
        <div className="city-grid">
          {relatedCities.map((item) => (
            <Link
              key={item.slug}
              href={`/${prefecture.slug}/${item.slug}/solution/${page.slug}`}
              className="city-card"
            >
              <span className="city-badge">{prefecture.shortName}</span>
              <strong>{item.name}</strong>
              <p>{item.name}で{page.angle}のページを見る</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = [];
  prefectures.forEach((prefecture) => {
    getCitiesByPrefecture(prefecture.slug).forEach((city) => {
      citySolutionSlugs.forEach((slug) => {
        paths.push({ params: { prefecture: prefecture.slug, city: city.slug, slug } });
      });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const prefecture = getPrefecture(params.prefecture);
  if (!prefecture) return { notFound: true };
  const city = getCity(prefecture.slug, params.city);
  if (!city) return { notFound: true };
  const template = citySolutionTemplates[params.slug];
  if (!template) return { notFound: true };

  return {
    props: {
      prefecture,
      city,
      page: template(prefecture, city),
      relatedCities: getCitiesByPrefecture(prefecture.slug)
        .filter((entry) => entry.slug !== city.slug)
        .slice(0, 6)
    }
  };
}
