import Layout from '../../components/Layout';
import { guides } from '../../data/articles';
import { siteConfig } from '../../data/site';

export default function GuidePage({ guide }) {
  if (!guide) return null;

  return (
    <Layout
      title={`${guide.title} | 家じまいガイド`}
      description={guide.description}
      canonical={`${siteConfig.domain}/guide/${guide.slug}`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Guide</p>
          <h1>{guide.h1}</h1>
          <p>{guide.intro}</p>
        </div>
      </section>
      <section className="container section-block">
        <article className="editorial-panel">
          {guide.sections.map((section) => (
            <div key={section.heading} className="guide-section">
              <h2>{section.heading}</h2>
              <ul className="plain-list">
                {section.body.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: guides.map((guide) => ({ params: { slug: guide.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const guide = guides.find((entry) => entry.slug === params.slug) || null;
  return { props: { guide } };
}
