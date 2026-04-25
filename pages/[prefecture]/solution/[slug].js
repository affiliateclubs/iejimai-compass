import Layout from '../../../components/Layout';
import { getSolutionPage, solutionSlugs } from '../../../data/articles';
import { getPrefecture, prefectures } from '../../../data/areas';
import { siteConfig } from '../../../data/site';

export default function SolutionPage({ page, prefecture }) {
  if (!page || !prefecture) return null;

  return (
    <Layout
      title={`${page.title} | 家じまいガイド`}
      description={page.description}
      canonical={`${siteConfig.domain}/${prefecture.slug}/solution/${page.slug}`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Prefecture solution</p>
          <h1>{page.h1}</h1>
          <p>{page.intro}</p>
        </div>
      </section>

      <section className="container section-block">
        <article className="editorial-panel">
          <h2>このページで整理すること</h2>
          <ul className="plain-list">
            {page.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="inline-cta">
            <strong>今日やること</strong>
            <p>
              物件の名義、固定資産税の通知、片付けの状況を確認して、
              {prefecture.shortName}で仲介と買取の両方を比較できる状態にします。
            </p>
          </div>
        </article>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: prefectures.flatMap((prefecture) =>
      solutionSlugs.map((slug) => ({
        params: { prefecture: prefecture.slug, slug }
      }))
    ),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const prefecture = getPrefecture(params.prefecture);
  if (!prefecture) return { notFound: true };

  const page = getSolutionPage(prefecture, params.slug);
  if (!page) return { notFound: true };

  return { props: { page, prefecture } };
}
