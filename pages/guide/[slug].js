import Link from 'next/link';
import Layout from '../../components/Layout';
import { guides } from '../../data/articles';
import { siteConfig } from '../../data/site';
import { imageForSlug } from '../../lib/postImages';

const STOP = new Set(['の','を','が','に','で','と','は','も','や','から','まで','する','ある','とは','する','こと','もの','ため','ます','です']);

function tokenize(s) {
  if (!s) return [];
  const m = (s.match(/[一-龯ぁ-んァ-ヴー0-9A-Za-z]{2,}/g) || []);
  return m.filter((t) => !STOP.has(t));
}

function pickRelated(currentSlug, all, max = 4) {
  const cur = all.find((g) => g.slug === currentSlug);
  if (!cur) return [];
  const baseTokens = new Set(tokenize(`${cur.title} ${cur.description || ''}`));
  const scored = all
    .filter((g) => g.slug !== currentSlug)
    .map((g) => {
      const t = new Set(tokenize(`${g.title} ${g.description || ''}`));
      let score = 0;
      for (const x of t) if (baseTokens.has(x)) score += 1;
      return { g, score };
    })
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((x) => ({ slug: x.g.slug, title: x.g.title, description: x.g.description || '' }));
  return scored;
}

export default function GuidePage({ guide, related }) {
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
      {related && related.length > 0 && (
        <section className="container section-block">
          <div className="related-block">
            <h2>関連ガイド</h2>
            <ul className="related-list">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/guide/${r.slug}/`}>
                    <span className="related-title">{r.title}</span>
                    {r.description && <span className="related-desc">{r.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
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
        .related-block {
          padding: 28px 32px;
          background: #f6f5ef;
          border-radius: 12px;
          border-left: 4px solid var(--gold, #b29555);
        }
        .related-block h2 {
          margin: 0 0 18px 0;
          font-size: 20px;
        }
        .related-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }
        .related-list :global(a) {
          display: block;
          padding: 14px 16px;
          background: #fff;
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          transition: background 0.15s ease;
        }
        .related-list :global(a:hover) { background: #fffaf2; }
        .related-title {
          display: block;
          font-weight: 600;
          color: #0d1b2c;
          margin-bottom: 4px;
        }
        .related-desc {
          display: block;
          font-size: 14px;
          color: #555;
          line-height: 1.55;
        }
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
  const related = guide ? pickRelated(guide.slug, guides, 4) : [];
  return { props: { guide, related } };
}
