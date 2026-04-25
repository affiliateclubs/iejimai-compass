import Layout from '../components/Layout';
import { siteConfig } from '../data/site';

export default function EditorialPolicyPage() {
  return (
    <Layout
      title="編集方針 | 家じまいガイド"
      description="家じまいガイドの編集方針、情報の更新基準、比較記事の作り方をまとめたページです。"
      canonical={`${siteConfig.domain}/editorial-policy`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Editorial policy</p>
          <h1>編集方針</h1>
          <p>
            家じまいガイドは、相続した実家や空き家の売却を考え始めた人が、
            「何から着手するか」「どの選択肢を比べるべきか」を判断しやすくするための情報整理を目的にしています。
          </p>
        </div>
      </section>

      <section className="container section-block">
        <article className="editorial-panel">
          <h2>編集で優先すること</h2>
          <ul className="plain-list">
            <li>地域差を無視せず、都道府県ごとの事情が分かる構成にすること</li>
            <li>仲介、買取、解体後売却、保有継続など複数の選択肢を比べられること</li>
            <li>制度や手続きは公的情報を優先し、売却導線は比較前提で整理すること</li>
            <li>相続登記、税金、残置物、共有名義など止まりやすい論点を先に説明すること</li>
          </ul>

          <h2>更新と見直しの基準</h2>
          <ul className="plain-list">
            <li>制度変更や公的情報の更新があったとき</li>
            <li>地域ページの情報粒度が不足していると判断したとき</li>
            <li>比較記事で読者の判断に必要な観点が不足しているとき</li>
            <li>Search Console や回遊状況から、読者が途中で止まりやすい箇所が見えたとき</li>
          </ul>

          <h2>広告・提携案件の扱い</h2>
          <p>
            提携案件は、読者の悩みと文脈が合うものを優先し、単価だけで採用しません。
            一括査定、不動産会社比較、司法書士、遺品整理、解体、空き家管理など、
            相談段階に応じて必要な導線を分けて掲載します。
          </p>

          <h2>提携先に見せるときの考え方</h2>
          <ul className="plain-list">
            <li>診断結果のCTAに置くのか、比較ページの前後に置くのかを先に決める</li>
            <li>査定系、相談系、周辺サービス系で役割を分けて見せる</li>
            <li>地域ページは都道府県・市区町村の文脈に合わせて出し分ける</li>
          </ul>
        </article>
      </section>
    </Layout>
  );
}
