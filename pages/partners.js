import Link from 'next/link';
import Layout from '../components/Layout';
import { referralPrograms } from '../data/articles';
import { siteConfig } from '../data/site';

const FAQ_DATA = [
  { q: '実家じまいで一番先にやることは？', a: 'まず「相続登記」と「相続人の確認」です。これが終わらないと売却・賃貸・解体すべての手続きが進みません。次に「片付け or 遺品整理」、その後に査定・比較が現実的な順番。' },
  { q: 'リフォームしてから売るのとそのまま売るのでは、どちらが得？', a: 'ケースバイケース。築40年超で水回り老朽化なら「解体して土地で売る」の方が高値、状態が良ければ最低限の屋根・外壁塗装で印象を整えるのが王道。リフォーム比較プロやハウジングバザールで2-3社見積もりを取ってから判断を。' },
  { q: '空き家を貸す or 売る、どちらがいい？', a: '長期保有で家賃収益を取りたいならクロスハウスのような空室対策で貸す、現金化を急ぐなら売却。Oh!Ya のような不動産投資面談で両軸で比較すると判断が早いです。' },
  { q: '遺品整理は自分でやるのと業者で頼むのとどちらがいい？', a: '物量と感情の両面で業者がおすすめ。3LDK 戸建てを家族だけで片付けると2-3週間+腰を痛めるリスク。遺品整理110番・ライフリセット等は数日で完了し、貴重品の発見・形見分け・遺品供養まで一括で頼めます。' },
  { q: '解体費用はどのくらいかかる？', a: '木造30坪で100-200万円が目安。建物の構造・延床面積・アスベストの有無で大きく変動。解体工事110番のような比較サイトで3社見積もりを取ると相場感がつかめます。古家付き土地のまま売るより解体してから売る方が高値で売れるケースも多い。' },
  { q: '費用の相場が分からないままサイトを見ても参考にならない？', a: 'むしろ各サービスは「無料見積もり」が前提。実家じまいの方は1度のフォーム送信で複数社見積もりを比較するのが当たり前です。費用感は見積もり段階で把握できます。' },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '家じまいガイド 厳選サービス比較',
  itemListElement: referralPrograms.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: p.name,
      description: p.summary,
      url: p.href,
      category: p.category,
    },
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

// Group programs by category for cleaner UI
const CATEGORY_ORDER = ['リフォーム', '屋根・外壁', '解体', '遺品整理', '不用品回収', '引越し', '実家活用'];

function groupByCategory(programs) {
  const groups = {};
  for (const p of programs) {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  }
  return CATEGORY_ORDER.map(cat => ({ cat, items: groups[cat] || [] })).filter(g => g.items.length > 0);
}

export default function PartnersPage() {
  const grouped = groupByCategory(referralPrograms);

  return (
    <Layout
      title={`実家じまいで頼れる ${referralPrograms.length} サービス比較 | 家じまいガイド`}
      description="実家じまいの全工程をカバーする厳選パートナー比較。リフォーム・解体・遺品整理・不用品回収・引越し・実家活用までA8厳選プログラムで統一。"
      canonical={`${siteConfig.domain}/partners`}
      structuredData={[itemListSchema, faqSchema]}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Service compass</p>
          <h1>実家じまいで頼れる<br/>{referralPrograms.length}サービス徹底比較</h1>
          <p>
            相続した実家を「整える → 動かす」までの全工程を、編集部が選んだ {referralPrograms.length} のサービスでカバー。
            <strong>リフォーム・解体・遺品整理・不用品回収・引越し・実家活用</strong>のすべてのレイヤーで、
            無料見積もりが取れる信頼できる業者だけを並べています。
          </p>
          <div className="hero-actions">
            <a href="#category-list" className="primary-button">カテゴリから選ぶ</a>
            <Link href="/diagnosis" className="ghost-button">3分診断で絞り込む</Link>
          </div>
        </div>
      </section>

      <section id="category-list" className="container section-block">
        {grouped.map(({ cat, items }) => (
          <div key={cat} className="cat-section">
            <div className="section-heading">
              <p className="eyebrow">{cat}</p>
              <h2>{cat}の厳選サービス {items.length}本</h2>
            </div>
            <div className="card-grid two-up">
              {items.map(program => (
                <article key={program.slug} className="soft-card">
                  <p className="eyebrow">{program.category}</p>
                  <h3>{program.name}</h3>
                  <p>{program.summary}</p>
                  {program.bestFor && (
                    <ul className="plain-list">
                      {program.bestFor.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  <a
                    href={program.href}
                    className="primary-button"
                    target="_blank"
                    rel="sponsored nofollow noopener"
                  >
                    無料で見積もりを取る →
                  </a>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>実家じまいでよくある質問</h2>
        </div>
        <div className="faq-list">
          {FAQ_DATA.map((item, i) => (
            <details key={i} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="consultation-box">
          <div>
            <p className="eyebrow">Next step</p>
            <h2>迷ったら、診断ツールで現状を整理</h2>
            <p>
              「何から手をつけるべきか分からない」段階の方は、3分の診断で次の一歩を整理できます。
              名義・残置物・売却方針・地域相場までを順に並べて見るのが最短です。
            </p>
          </div>
          <div className="section-actions">
            <Link className="primary-button" href="/diagnosis">3分診断を試す</Link>
            <Link className="ghost-button" href="/contact">相談したい</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .cat-section { margin-bottom: 64px; }
        .cat-section:last-child { margin-bottom: 0; }
        .faq-list { display: grid; gap: 12px; max-width: 820px; }
        .faq-item { padding: 0; background: #ffffff; border: 1px solid var(--line, rgba(0,0,0,0.08)); border-radius: 8px; overflow: hidden; }
        .faq-item summary { padding: 18px 22px; cursor: pointer; font-weight: 600; font-size: 0.98rem; line-height: 1.5; list-style: none; padding-right: 50px; position: relative; }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary::after { content: '+'; position: absolute; right: 22px; top: 50%; transform: translateY(-50%); font-size: 1.4rem; font-weight: 700; transition: transform 0.25s; opacity: 0.6; }
        .faq-item[open] summary::after { transform: translateY(-50%) rotate(45deg); }
        .faq-item p { padding: 0 22px 22px; line-height: 2; font-size: 0.92rem; opacity: 0.88; }
      `}</style>
    </Layout>
  );
}
