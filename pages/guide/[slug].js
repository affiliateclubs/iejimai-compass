import Layout from '../../components/Layout';
import { guides } from '../../data/articles';
import { siteConfig } from '../../data/site';
import { imageForSlug } from '../../lib/postImages';

export default function GuidePage({ guide }) {
  if (!guide) return null;
  const heroImg = imageForSlug(guide.slug);
  return (
    <Layout
      title={`${guide.title} | 家じまいガイド`}
      description={guide.description}
      canonical={`${siteConfig.domain}/guide/${guide.slug}`}
    >
      <section className="guide-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(13,27,44,0.55), rgba(13,27,44,0.85)), url(${heroImg})` }}>
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
      <style jsx>{`
        .guide-hero {
          padding: 96px 0 72px;
          background-size: cover;
          background-position: center;
          color: #fff;
          margin-bottom: 32px;
        }
        .guide-hero :global(.eyebrow) { color: var(--gold-light); }
        .guide-hero :global(h1) { color: #fff; }
        .guide-hero :global(p) { color: rgba(255,255,255,0.85); line-height: 1.95; }
      `}</style>
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
