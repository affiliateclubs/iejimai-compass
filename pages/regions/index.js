import Link from 'next/link';
import Layout from '../../components/Layout';
import PrefectureMap from '../../components/PrefectureMap';
import { prefectures, regions } from '../../data/areas';
import { siteConfig } from '../../data/site';

export default function RegionsIndexPage() {
  return (
    <Layout
      title="都道府県マップ | 家じまいガイド"
      description="47都道府県の地域ページを地図と一覧から探せるページです。相続した実家や空き家の売却で、まず自分の地域を見つけたい人向けにまとめています。"
      canonical={`${siteConfig.domain}/regions`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Prefecture map</p>
          <h1>都道府県マップから地域ページを探す</h1>
          <p>相続した実家や空き家の売り方は、同じ県内でも生活圏によって変わります。まずは都道府県ページに入り、そこから市区町村ページへ進んでください。</p>
        </div>
      </section>

      <section className="container section-block">
        <PrefectureMap prefectures={prefectures} title="47都道府県を地図から探す" />
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">Quick list</p>
          <h2>一覧から都道府県を探す</h2>
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
          <p className="eyebrow">Regional summaries</p>
          <h2>広域の傾向をまとめて見たい人向け</h2>
        </div>
        <div className="card-grid three-up">
          {regions.map((region) => (
            <Link key={region.slug} href={`/regions/${region.slug}`} className="guide-card">
              <h2>{region.name}</h2>
              <p>{region.name}の都道府県をまとめて見たいときの補助ページです。まず都道府県ページを選びたい人は上の地図から進めます。</p>
              <span>広域まとめを見る</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
