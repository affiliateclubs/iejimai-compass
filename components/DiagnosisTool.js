import Link from 'next/link';
import { useMemo, useState } from 'react';

const initialDiagnosis = {
  urgency: 'soon',
  condition: 'occupied',
  ownership: 'single',
  distance: 'far',
  priority: 'balance',
  region: 'kanto'
};

const questionGroups = [
  {
    key: 'urgency',
    label: 'どれくらい急いでいますか？',
    options: [
      { value: 'urgent', label: 'できるだけ早く売りたい' },
      { value: 'soon', label: '早めに進めたい' },
      { value: 'later', label: 'まず整理したい' }
    ]
  },
  {
    key: 'condition',
    label: '家の状態はどうですか？',
    options: [
      { value: 'vacant', label: '空き家で管理が負担' },
      { value: 'occupied', label: 'まだ人が住んでいるか、片付け前' },
      { value: 'belongings', label: '家財や残置物が多い' },
      { value: 'needs_repair', label: '築古で傷みが気になる' }
    ]
  },
  {
    key: 'ownership',
    label: '名義や相続人の状況は？',
    options: [
      { value: 'single', label: 'ほぼ整理できている' },
      { value: 'shared', label: '共有名義で不安がある' },
      { value: 'unresolved', label: '相続人の整理がまだ' }
    ]
  },
  {
    key: 'distance',
    label: '現地との距離感は？',
    options: [
      { value: 'near', label: '近くて見に行きやすい' },
      { value: 'far', label: '遠方で往復が負担' },
      { value: 'cannot_visit', label: '頻繁には行けない' }
    ]
  },
  {
    key: 'priority',
    label: '何を一番優先したいですか？',
    options: [
      { value: 'price', label: '少しでも高く売りたい' },
      { value: 'speed', label: 'とにかく早く手放したい' },
      { value: 'balance', label: '手間と手残りの両立' }
    ]
  },
  {
    key: 'region',
    label: '今のエリアに近いのは？',
    options: [
      { value: 'kanto', label: '関東' },
      { value: 'kansai', label: '関西' },
      { value: 'other', label: 'それ以外の地域' }
    ]
  }
];

const routeDefinitions = {
  legal: {
    label: 'Route 1',
    title: '名義整理から先に進めるルート',
    summary:
      '共有名義や相続人未整理があるなら、査定より前に相続登記と家族整理を固めたほうが止まりにくくなります。',
    reason: '名義が先に詰まると、売り方を比べる前に話が止まりやすいからです。',
    primary: { href: '/guide/souzoku-touki-2026', label: '相続登記の要点を見る' },
    secondary: [
      { href: '/guide/souzoku-jikka-first-step', label: '最初にやることを見る' },
      { href: '/compare/chukai-vs-kaitori', label: '仲介と買取を比較する' }
    ],
    steps: [
      '登記事項と相続人を確認する',
      '共有や未整理があるなら司法書士系を先に見る',
      'その後で売却ルートを選ぶ'
    ],
    badges: ['共有・未整理', '登記先行']
  },
  cleanup: {
    label: 'Route 2',
    title: '片付け・残置物を先にほどくルート',
    summary:
      '家財が多い、築古で傷みがある、写真映えが悪いなら、片付けの深さを決めてから売り方を比べるほうが進みます。',
    reason: '残置物や老朽化が重いほど、見せ方より先に整理の順番が効くからです。',
    primary: { href: '/guide/zanchiutsu-sell', label: '残置物の整理記事を見る' },
    secondary: [
      { href: '/checklist', label: '売却前チェックリストを見る' },
      { href: '/guide/house-full-of-belongings-sell', label: '荷物だらけの家の記事を見る' }
    ],
    steps: [
      '残す物と処分する物をざっくり分ける',
      '買取か仲介かで片付けの必要量を変える',
      '必要なら遺品整理や解体も比較する'
    ],
    badges: ['残置物多め', '片付け優先']
  },
  speed: {
    label: 'Route 3',
    title: '早期売却・買取比較ルート',
    summary:
      '急いで手放したい、空き家の管理が重い、遠方で動けないなら、仲介だけでなく買取も先に並べて見るのが近道です。',
    reason: 'スピード優先のときは、最高値よりも決まりやすさが結果的に強いからです。',
    primary: { href: '/compare/chukai-vs-kaitori', label: '仲介と買取を比較する' },
    secondary: [
      { href: '/guide/akiya-sell-four-routes', label: '売り方4つを比較する' },
      { href: '/flow', label: '売却の流れを見る' }
    ],
    steps: [
      '売却スピードの上限を決める',
      '買取と仲介を同時に見る',
      '片付けや現地対応の負担を下げる'
    ],
    badges: ['急ぎ', '買取比較']
  },
  region: {
    label: 'Route 4',
    title: '地域の相場と特徴を先に押さえるルート',
    summary:
      '売却の方向を決める前に、都道府県ページと市区町村ページで地域差を押さえると、相場感と動き方をつかみやすくなります。',
    reason: '地域差が大きい場所では、売り方より先に地域条件を見たほうが精度が上がるからです。',
    primary: null,
    secondary: [
      { href: '/regions', label: '都道府県マップを見る' },
      { href: '/problems', label: '困りごと別の記事を見る' }
    ],
    steps: [
      '地域ハブで都道府県ごとの差を見る',
      '市区町村ページで細かい違いを確認する',
      'その地域に合う売却ルートを選ぶ'
    ],
    badges: ['地域比較', '相場確認']
  }
};

function getRegionPrimary(region) {
  if (region === 'kanto') return { href: '/tokyo', label: '首都圏の都道府県ページから見る' };
  if (region === 'kansai') return { href: '/osaka', label: '関西の都道府県ページから見る' };
  return { href: '/regions', label: '都道府県マップを見る' };
}

function scoreDiagnosis(state) {
  const scores = {
    legal: 0,
    cleanup: 0,
    speed: 0,
    region: 0
  };

  if (state.ownership === 'shared') scores.legal += 5;
  if (state.ownership === 'unresolved') scores.legal += 6;

  if (state.condition === 'belongings') scores.cleanup += 5;
  if (state.condition === 'needs_repair') {
    scores.cleanup += 3;
    scores.speed += 1;
  }
  if (state.condition === 'vacant') scores.speed += 2;

  if (state.urgency === 'urgent') scores.speed += 5;
  if (state.urgency === 'soon') scores.speed += 3;

  if (state.priority === 'speed') scores.speed += 4;
  if (state.priority === 'price') scores.region += 4;
  if (state.priority === 'balance') scores.region += 2;

  if (state.distance === 'far') {
    scores.speed += 1;
    scores.region += 1;
  }
  if (state.distance === 'cannot_visit') scores.speed += 2;

  if (state.region === 'kanto' || state.region === 'kansai') scores.region += 3;
  if (state.region === 'other') scores.region += 1;

  const routeKey = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const route = routeDefinitions[routeKey];
  const primary = routeKey === 'region' ? getRegionPrimary(state.region) : route.primary;

  const signalTags = [
    state.ownership === 'shared' ? '共有名義' : null,
    state.ownership === 'unresolved' ? '相続人未整理' : null,
    state.condition === 'vacant' ? '空き家' : null,
    state.condition === 'belongings' ? '残置物多め' : null,
    state.condition === 'needs_repair' ? '築古・傷み' : null,
    state.urgency === 'urgent' ? '急ぎ' : null,
    state.distance === 'far' ? '遠方管理' : null
  ].filter(Boolean);

  return {
    ...route,
    primary,
    signalTags
  };
}

export default function DiagnosisTool() {
  const [diagnosis, setDiagnosis] = useState(initialDiagnosis);

  const recommendation = useMemo(() => scoreDiagnosis(diagnosis), [diagnosis]);

  return (
    <div className="diagnosis-shell">
      <div className="diagnosis-form">
        {questionGroups.map((group) => (
          <fieldset key={group.key} className="diagnosis-group">
            <legend>{group.label}</legend>
            <div className="diagnosis-options">
              {group.options.map((option) => (
                <label key={option.value} className={`diagnosis-option${diagnosis[group.key] === option.value ? ' is-active' : ''}`}>
                  <input
                    type="radio"
                    name={group.key}
                    checked={diagnosis[group.key] === option.value}
                    onChange={() => setDiagnosis((current) => ({ ...current, [group.key]: option.value }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <aside className="diagnosis-result">
        <p className="eyebrow">あなたの診断結果</p>
        <div className="diagnosis-route-badge">
          <span>{recommendation.label}</span>
        </div>
        <h3>{recommendation.title}</h3>
        <p>{recommendation.summary}</p>
        <p className="diagnosis-reason">{recommendation.reason}</p>

        <div className="diagnosis-chips">
          {recommendation.badges.map((tag) => (
            <span key={tag} className="diagnosis-chip">
              {tag}
            </span>
          ))}
          {recommendation.signalTags.map((tag) => (
            <span key={tag} className="diagnosis-chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="diagnosis-nextsteps">
          <strong>次にやること</strong>
          <ol>
            {recommendation.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="diagnosis-cta-row">
          {recommendation.primary ? (
            <Link href={recommendation.primary.href} className="primary-button">
              {recommendation.primary.label}
            </Link>
          ) : null}
          {recommendation.secondary.map((item) => (
            <Link key={item.href} href={item.href} className="result-link">
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}

export { initialDiagnosis, scoreDiagnosis };
