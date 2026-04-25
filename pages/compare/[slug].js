import Layout from '../../components/Layout';
import { comparePages } from '../../data/articles';
import { siteConfig } from '../../data/site';

export default function ComparePage({ page }) {
  if (!page) return null;

  return (
    <Layout
      title={`${page.title} | 家じまいガイド`}
      description={page.description}
      canonical={`${siteConfig.domain}/compare/${page.slug}`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Comparison</p>
          <h1>{page.h1}</h1>
          <p>{page.intro}</p>
        </div>
      </section>

      <section className="container section-block">
        <article className="editorial-panel">
          <h2>比較表</h2>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>比較項目</th>
                  <th>左</th>
                  <th>右</th>
                </tr>
              </thead>
              <tbody>
                {page.rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.left}</td>
                    <td>{row.right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>迷ったらここを見る</h2>
          <ul className="plain-list">
            {page.takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: comparePages.map((page) => ({ params: { slug: page.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const page = comparePages.find((entry) => entry.slug === params.slug) || null;
  return { props: { page } };
}
