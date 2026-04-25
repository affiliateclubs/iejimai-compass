import Layout from '../../../components/Layout';
import { getPrefecture, prefectures } from '../../../data/areas';
import { siteConfig } from '../../../data/site';

export default function LandPricePage({ prefecture }) {
  if (!prefecture) return null;

  return (
    <Layout
      title={`${prefecture.name}の地価と売却相場の見方 | 家じまいガイド`}
      description={`${prefecture.name}で相続した家や空き家を売るときに、地価や取引価格データをどう読むかの基本を整理します。`}
      canonical={`${siteConfig.domain}/data/${prefecture.slug}/land-price`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Data layer</p>
          <h1>{prefecture.name}の地価と売却相場の見方</h1>
          <p>
            データページは、見た目だけの相場表示ではなく、売り方の判断につなげるために使います。
            {prefecture.shortName}の取引価格、地価、公的データの読み方をざっくり整理します。
          </p>
        </div>
      </section>
      <section className="container section-block">
        <div className="card-grid three-up">
          <article className="soft-card">
            <h2>取引価格</h2>
            <p>過去の成約事例を見て、近い条件の売れ方を把握します。</p>
          </article>
          <article className="soft-card">
            <h2>地価</h2>
            <p>土地の評価感をつかみ、築古戸建てを土地として見るかの判断材料にします。</p>
          </article>
          <article className="soft-card">
            <h2>ハザード</h2>
            <p>価格の話だけでなく、売れにくさや買い手が気にする条件も先に見ます。</p>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: prefectures.map((prefecture) => ({
      params: { prefecture: prefecture.slug }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const prefecture = getPrefecture(params.prefecture);
  if (!prefecture) return { notFound: true };
  return { props: { prefecture } };
}
