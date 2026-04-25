import Link from 'next/link';
import Layout from '../components/Layout';
import { problemGuides } from '../data/articles';
import { siteConfig } from '../data/site';

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
            <Link key={guide.slug} href={`/guide/${guide.slug}`} className="guide-card">
              <h2>{guide.h1}</h2>
              <p>{guide.description}</p>
              <span>続きを読む</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

