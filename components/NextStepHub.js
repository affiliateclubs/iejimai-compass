import Link from 'next/link';

export default function NextStepHub({
  title = '迷ったらこの順で進める',
  lead = '地域情報を読んだあとに、診断、売り方比較、相談先比較へ進むと判断が固めやすくなります。'
}) {
  const steps = [
    {
      href: '/diagnosis',
      label: '3分診断',
      title: '状況から進め方を決める',
      text: '相続、空き家、残置物、急ぎ度を整理して、次に見るページを絞ります。'
    },
    {
      href: '/compare/chukai-vs-kaitori',
      label: '売り方比較',
      title: '仲介と買取を比べる',
      text: '高く売るか、早く手放すかで、先に見るべき相談先が変わります。'
    },
    {
      href: '/partners',
      label: '相談先比較',
      title: '費用と相談先を確認する',
      text: '片付け、解体、修繕など、売却前に費用感を押さえたい項目を確認します。'
    },
    {
      href: '#service-path-cards',
      label: '見積もり導線',
      title: 'サービス候補を先に見る',
      text: 'すぐ費用感を確認したい場合は、公式サイトへの導線まで進めます。'
    }
  ];

  return (
    <section className="container section-block">
      <div className="next-step-hub">
        <div className="section-heading">
          <p className="eyebrow">Next step</p>
          <h2>{title}</h2>
          <p className="section-copy">{lead}</p>
        </div>
        <div className="card-grid four-up">
          {steps.map((step) => (
            <Link key={step.href} href={step.href} className="guide-card next-step-card">
              <span className="city-badge">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span>この導線へ進む</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
