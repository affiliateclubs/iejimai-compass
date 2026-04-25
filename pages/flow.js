import Layout from '../components/Layout';
import { siteConfig } from '../data/site';

const steps = [
  {
    title: '状況を整理する',
    text: '住まない家かどうか、名義、相続人、残置物の状況を確認します。'
  },
  {
    title: '売り方を比較する',
    text: '仲介、買取、解体後売却の3ルートを比べて、手残りとスピードの優先順位を決めます。'
  },
  {
    title: '必要な周辺サービスを決める',
    text: '司法書士、遺品整理、解体、空き家管理が必要かを見極めます。'
  },
  {
    title: '地域条件を確認する',
    text: '都道府県や市区町村ごとの立地差、需要差、放置リスクを見て方針を固めます。'
  },
  {
    title: '相談・査定へ進む',
    text: '整理した条件をもとに、相談先や査定先を比較しながら進めます。'
  }
];

export default function FlowPage() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '相続した実家や空き家を売る流れ',
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.text
    }))
  };

  return (
    <Layout
      title="相続した実家や空き家を売る流れ | 家じまいガイド"
      description="相続した実家や空き家を売るときに、どの順番で進めると詰まりにくいかを整理したページです。"
      canonical={`${siteConfig.domain}/flow`}
      structuredData={howToSchema}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Flow</p>
          <h1>相続した実家や空き家を売る流れ</h1>
          <p>
            家じまいは、気持ちより順番で詰まりやすいテーマです。最初に流れをつかんでおくと、
            後から余計なやり直しを減らしやすくなります。
          </p>
        </div>
      </section>

      <section className="container section-block">
        <div className="flow-stack">
          {steps.map((step, index) => (
            <article key={step.title} className="flow-card">
              <span className="flow-step">STEP {index + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
