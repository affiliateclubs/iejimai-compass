import Link from 'next/link';
import Layout from '../../components/Layout';
import PrefectureMap from '../../components/PrefectureMap';
import { getPrefecturesByRegion, getRegion, regions } from '../../data/areas';
import { siteConfig } from '../../data/site';

export default function RegionPage({ region, prefectures }) {
  if (!region) return null;

  return (
    <Layout
      title={`${region.name}の実家じまい・空き家売却ガイド | 家じまいガイド`}
      description={`${region.name}で相続した実家や空き家をどう整理して売るかを、都道府県別にまとめた地域ハブです。`}
      canonical={`${siteConfig.domain}/regions/${region.slug}`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Region hub</p>
          <h1>{region.name}の実家じまい・空き家売却ガイド</h1>
          <p>{region.name}で相続した実家や空き家をどう整理して売るかを、都道府県別にまとめています。</p>
        </div>
      </section>

      <section className="container section-block">
        <PrefectureMap prefectures={prefectures} title={`${region.name}の都道府県から探す`} />
      </section>

      <section className="container section-block">
        <div className="city-grid">
          {prefectures.map((prefecture) => (
            <Link key={prefecture.slug} href={`/${prefecture.slug}`} className="city-card">
              <span className="city-badge">{region.name}</span>
              <strong>{prefecture.name}</strong>
              <p>{prefecture.intro}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: regions.map((region) => ({ params: { region: region.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const region = getRegion(params.region);
  if (!region) return { notFound: true };

  return {
    props: {
      region,
      prefectures: getPrefecturesByRegion(region.slug)
    }
  };
}
