import Layout from '../../components/Layout';
import { guides } from '../../data/articles';
import { siteConfig } from '../../data/site';
import { imageForSlug } from '../../lib/postImages';

export default function GuidePage({ guide }) {
  if (!guide) return null;
  const heroImg = imageForSlug(guide.slug);
  const canonical = `${siteConfig.domain}/guide/${guide.slug}`;
  /* SCHEMA_INJECTED */
  const _structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": guide.title,
        "description": guide.description || "",
        "datePublished": guide.date || "2026-01-01",
        "author": { "@type": "Organization", "name": "実家じまいガイド" },
        "publisher": { "@type": "Organization", "name": "実家じまいガイド", "url": siteConfig.domain },
        "mainEntityOfPage": canonical,
        "image": heroImg,
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ホーム", "item": `${siteConfig.domain}/` },
          { "@type": "ListItem", "position": 2, "name": "ガイド", "item": `${siteConfig.domain}/guide` },
          { "@type": "ListItem", "position": 3, "name": guide.title, "item": canonical },
        ],
      },
    ],
  };
  return (
    <Layout
      title={`${guide.title} | 家じまいガイド`}
      description={guide.description}
      canonical={canonical}
      structuredData={_structuredData}
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
