import Layout from '../components/Layout';
import { siteConfig } from '../data/site';

const checklist = [
  '登記事項や固定資産税の通知を手元にそろえたか',
  '住まない家なのか、貸す可能性があるのか決めたか',
  '相続人が何人いて、誰の同意が必要か整理したか',
  '家財や遺品をどこまで片付けるか決めたか',
  '仲介、買取、解体後売却の3ルートを比較する前提にしたか',
  '司法書士や遺品整理が必要か見えているか'
];

export default function ChecklistPage() {
  return (
    <Layout
      title="売却前チェックリスト | 家じまいガイド"
      description="相続した実家や空き家を売る前に確認しておきたいポイントをまとめたチェックリストです。"
      canonical={`${siteConfig.domain}/checklist`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Checklist</p>
          <h1>相続した実家や空き家を売る前のチェックリスト</h1>
          <p>
            いきなり査定に出す前に、まず確認しておくと詰まりにくい項目をまとめました。
            地域差が大きいエリアほど、順番のミスを減らしたほうが進みやすくなります。
          </p>
        </div>
      </section>

      <section className="container section-block">
        <article className="editorial-panel">
          <ul className="checklist-grid">
            {checklist.map((item, index) => (
              <li key={item} className="checklist-item">
                <span className="checklist-number">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="inline-cta">
            <strong>全部そろっていなくても動けます</strong>
            <p>名義や共有の不安が強いなら登記系、急ぎなら買取比較、片付けが重いなら残置物対応の記事から先に見ると進めやすいです。</p>
          </div>
        </article>
      </section>
    </Layout>
  );
}
