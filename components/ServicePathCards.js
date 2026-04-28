import { referralPrograms } from '../data/articles';

const variantSlugs = {
  default: ['ihinseiri-110', 'kaitaikoji-110', 'reform-hikaku-pro'],
  city: ['ihinseiri-110', 'fuyouhin-saiansho', 'kaitaikoji-110'],
  'souzoku-jikka': ['ihinseiri-110', 'life-reset', 'kaitaikoji-110'],
  'akiya-baikyaku': ['kaitaikoji-110', 'ihinseiri-110', 'fuyouhin-saiansho'],
  'hayaku-uritai': ['ihinseiri-110', 'fuyouhin-saiansho', 'kaitaikoji-110'],
  'ikkatsu-satei': ['reform-hikaku-pro', 'yaneya-san', 'tosouya-san'],
  'kaitori-hikaku': ['ihinseiri-110', 'kaitaikoji-110', 'fuyouhin-saiansho'],
  'houchi-risk': ['kaitaikoji-110', 'ihinseiri-110', 'eco-clean'],
  'souzoku-touki': ['ihinseiri-110', 'life-reset', 'kaitaikoji-110'],
  'zanchiutsu-katazuke': ['ihinseiri-110', 'life-reset', 'fuyouhin-saiansho'],
  'kaitai-sarachi': ['kaitaikoji-110', 'yaneya-san', 'reform-hikaku-pro'],
  'reform-before-sale': ['reform-hikaku-pro', 'yaneya-san', 'tosouya-san'],
  'zeikin-3000man': ['kaitaikoji-110', 'ihinseiri-110', 'reform-hikaku-pro'],
  'akiya-kanri': ['eco-clean', 'fuyouhin-saiansho', 'kaitaikoji-110']
};

function pickPrograms(variant) {
  const slugs = variantSlugs[variant] || variantSlugs.default;
  return slugs
    .map((slug) => referralPrograms.find((program) => program.slug === slug))
    .filter(Boolean);
}

export default function ServicePathCards({
  title = '次に比較したいサービス',
  lead = '売却前の片付け、解体、修繕は早めに見積もりを取ると、売り方の判断がしやすくなります。',
  variant = 'default'
}) {
  const programs = pickPrograms(variant);
  if (programs.length === 0) return null;

  return (
    <section className="container section-block">
      <div className="section-heading">
        <p className="eyebrow">Next action</p>
        <h2>{title}</h2>
        <p className="section-copy">{lead}</p>
      </div>
      <div className="card-grid three-up">
        {programs.map((program) => (
          <a
            key={program.slug}
            href={program.href}
            className="guide-card"
            target="_blank"
            rel="sponsored nofollow noopener"
          >
            <span className="city-badge">{program.category}</span>
            <h3>{program.name}</h3>
            <p>{program.summary}</p>
            <span>公式サイトで確認する</span>
          </a>
        ))}
      </div>
      <p className="pr-note">
        ※ PRを含みます。掲載サービスの条件や対応エリアは各公式サイトで確認してください。
      </p>
    </section>
  );
}
