import Link from 'next/link';
import Layout from '../components/Layout';
import { problemGuides } from '../data/articles';
import { siteConfig } from '../data/site';
import { imageForSlug } from '../lib/postImages';

export default function ProblemsPage() {
  return (
    <Layout
      title="家を売りたいときの困りごと一覧 | 家じまいガイド"
      description="相続、空き家、親名義、共有名義、片付け、税金など、家を売りたいときの困りごと別に記事をまとめた一覧です。"
      canonical={`${siteConfig.domain}/problems`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Problem hub</p>
          <h1>家を売りたいときの困りごと一覧</h1>
          <p>相続した実家、空き家、親名義、共有、片付け、税金など、止まりやすい困りごとから先に調べられるようにしています。</p>
        </div>
      </section>
      <section className="container section-block">
        <div className="card-grid three-up">
          {problemGuides.map((guide) => (
            <Link key={guide.slug} href={`/guide/${guide.slug}`} className="guide-card with-img">
              <div className="card-img" style={{ backgroundImage: `url(${imageForSlug(guide.slug)})` }} />
              <div className="card-body">
                <h2>{guide.h1}</h2>
                <p>{guide.description}</p>
                <span>続きを読む →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <style jsx>{`
        .guide-card.with-img { padding: 0 !important; overflow: hidden; }
        .card-img { width: 100%; height: 168px; background-size: cover; background-position: center; background-color: #efebe1; transition: transform 0.4s; }
        .guide-card:hover .card-img { transform: scale(1.04); }
        .card-body { padding: 24px 24px 22px; }
      `}</style>
    </Layout>
  );
}
