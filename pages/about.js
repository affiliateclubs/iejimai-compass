import Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout
      title="運営者情報 | 家じまいガイド"
      description="家じまいガイドの運営方針、対象読者、情報の作り方をまとめたページです。"
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">About</p>
          <h1>運営者情報</h1>
          <p>
            家じまいガイドは、相続した実家、空き家、実家じまいで動けなくなりやすい人に向けて、
            売却の順番と判断材料を整理するための情報サイトです。
          </p>
        </div>
      </section>
      <section className="container section-block">
        <article className="editorial-panel">
          <h2>このサイトが扱うテーマ</h2>
          <ul className="plain-list">
            <li>相続した家や空き家の売却判断</li>
            <li>仲介、買取、解体後売却の比較</li>
            <li>相続登記、税金、残置物整理の基礎</li>
            <li>47都道府県と主要自治体ごとの地域差の整理</li>
          </ul>

          <h2>情報の作り方</h2>
          <p>
            法務、税務、制度まわりは公的情報を優先し、実務判断では売却方法や周辺サービスの比較がしやすい形に整理します。
            高単価案件だけを押しつけるのではなく、保有や賃貸も含めて比較する方針です。
          </p>

          <h2>広告主にとっての見やすさ</h2>
          <ul className="plain-list">
            <li>診断、比較、地域、困りごとで入口が分かれています</li>
            <li>売却比較、司法書士、片付け、解体、空き家管理を役割別に案内できます</li>
            <li>地域ページと導線ページを組み合わせて掲載位置を調整しやすくしています</li>
          </ul>

          <h2>運営体制として見せたいこと</h2>
          <p>
            独自ドメインで継続的に更新し、地域ページ、比較ページ、診断ページ、規約・ポリシー類をそろえたうえで、
            売却比較系のASPや関連サービスと連携できる媒体品質を目指しています。
          </p>
        </article>
      </section>
    </Layout>
  );
}
