import Layout from '../components/Layout';
import DiagnosisTool from '../components/DiagnosisTool';
import { siteConfig } from '../data/site';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '家じまい進め方診断は無料ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。サイト内の診断は無料で、次に見るべき記事や比較ページを案内するためのものです。'
      }
    },
    {
      '@type': 'Question',
      name: '診断結果は何を基準に出していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '急ぎ度、家の状態、名義の整理状況、現地との距離、優先したいこと、地域の傾向をもとに、進め方のルートを出しています。'
      }
    },
    {
      '@type': 'Question',
      name: '診断結果どおりに売らないといけませんか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'いいえ。診断は最初に見る順番の目安です。実際には地域相場や家族の事情に合わせて調整してください。'
      }
    }
  ]
};

export default function DiagnosisPage() {
  return (
    <Layout
      title="家じまい進め方診断 | 家じまいガイド"
      description="相続した実家や空き家をどう進めるべきか、3分でルートを出せる家じまい進め方診断です。名義整理、片付け、早期売却、地域確認の入口を案内します。"
      canonical={`${siteConfig.domain}/diagnosis`}
      structuredData={faqSchema}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Diagnosis</p>
          <h1>家じまい進め方診断</h1>
          <p>
            相続した実家や空き家は、いきなり査定より先に見る順番で結果が変わります。
            いまの状況を答えるだけで、先に見るべきルートを出します。
          </p>
        </div>
      </section>

      <section className="container section-block">
        <div className="diagnosis-intro-grid">
          <article className="soft-card">
            <h2>この診断でわかること</h2>
            <ul className="plain-list">
              <li>名義整理を先にやるべきか</li>
              <li>片付けや残置物整理を先に進めるべきか</li>
              <li>仲介と買取を先に比較すべきか</li>
              <li>地域相場とエリア特徴を先に見るべきか</li>
            </ul>
          </article>
          <article className="soft-card">
            <h2>使い方</h2>
            <ul className="plain-list">
              <li>今の状況に近い選択肢を選ぶ</li>
              <li>結果に出るルートを1つだけ先に開く</li>
              <li>必要なら比較記事や地域ページへ進む</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="container section-block">
        <DiagnosisTool />
      </section>
    </Layout>
  );
}
