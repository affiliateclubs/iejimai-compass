// 47都道府県の実データセット (2023-2026年時点の公的統計)
//
// 出典:
//   - landPriceAvg:   公示地価 2026年 (令和8年) 都道府県別住宅地平均価格 (tochidai.info, 国土交通省地価公示に準拠)
//   - vacantHouseRate: 2023年住宅・土地統計調査 (令和5年) 居住目的のない空き家率 (賃貸・売却用および二次的住宅を除く)
//                      出典: 総務省統計局「住宅・土地統計調査」 2023年10月1日時点
//                      注: 総務省が発表している「空き家率」(全国13.8%) は賃貸空き家等を含む広義。
//                           家じまい文脈では「放置されている空き家」を示す狭義の値のほうが意味を持つ。
//   - agingRate:      2024年10月1日現在の65歳以上人口割合 (内閣府「高齢社会白書」令和6年版準拠)
//
// 注意: すべて公表値の転記であり、実地調査ではない。
//       地価は㎡あたり円。空き家率・高齢化率は%。

export const prefectureStats = {
  // code順 (areas.js の prefectureMeta と同じ順序)
  hokkaido:  { landPriceAvg: 98783,   vacantHouseRate: 5.6,  agingRate: 33.3 },
  aomori:    { landPriceAvg: 30736,   vacantHouseRate: 9.3,  agingRate: 35.7 },
  iwate:     { landPriceAvg: 44918,   vacantHouseRate: 9.3,  agingRate: 35.4 },
  miyagi:    { landPriceAvg: 192069,  vacantHouseRate: 4.6,  agingRate: 29.6 },
  akita:     { landPriceAvg: 27070,   vacantHouseRate: 10.0, agingRate: 39.5 },
  yamagata:  { landPriceAvg: 33952,   vacantHouseRate: 7.9,  agingRate: 35.6 },
  fukushima: { landPriceAvg: 44264,   vacantHouseRate: 7.3,  agingRate: 33.7 },
  ibaraki:   { landPriceAvg: 39887,   vacantHouseRate: 6.7,  agingRate: 30.9 },
  tochigi:   { landPriceAvg: 43793,   vacantHouseRate: 6.6,  agingRate: 30.5 },
  gunma:     { landPriceAvg: 46031,   vacantHouseRate: 7.6,  agingRate: 31.1 },
  saitama:   { landPriceAvg: 191121,  vacantHouseRate: 3.9,  agingRate: 27.5 },
  chiba:     { landPriceAvg: 171211,  vacantHouseRate: 5.0,  agingRate: 28.1 },
  tokyo:     { landPriceAvg: 1484765, vacantHouseRate: 2.6,  agingRate: 22.7 },
  kanagawa:  { landPriceAvg: 322476,  vacantHouseRate: 3.2,  agingRate: 26.0 },
  niigata:   { landPriceAvg: 45657,   vacantHouseRate: 7.6,  agingRate: 34.2 },
  toyama:    { landPriceAvg: 51014,   vacantHouseRate: 8.4,  agingRate: 33.2 },
  ishikawa:  { landPriceAvg: 88057,   vacantHouseRate: 7.4,  agingRate: 30.7 },
  fukui:     { landPriceAvg: 54965,   vacantHouseRate: 8.4,  agingRate: 31.8 },
  yamanashi: { landPriceAvg: 42505,   vacantHouseRate: 8.7,  agingRate: 32.0 },
  nagano:    { landPriceAvg: 46741,   vacantHouseRate: 8.9,  agingRate: 32.9 },
  gifu:      { landPriceAvg: 57067,   vacantHouseRate: 8.0,  agingRate: 31.4 },
  shizuoka:  { landPriceAvg: 90674,   vacantHouseRate: 5.9,  agingRate: 31.2 },
  aichi:     { landPriceAvg: 254010,  vacantHouseRate: 4.3,  agingRate: 25.8 },
  mie:       { landPriceAvg: 46237,   vacantHouseRate: 9.5,  agingRate: 30.9 },
  shiga:     { landPriceAvg: 70262,   vacantHouseRate: 7.2,  agingRate: 27.3 },
  kyoto:     { landPriceAvg: 362311,  vacantHouseRate: 6.2,  agingRate: 29.8 },
  osaka:     { landPriceAvg: 412022,  vacantHouseRate: 4.6,  agingRate: 27.6 },
  hyogo:     { landPriceAvg: 192478,  vacantHouseRate: 6.2,  agingRate: 30.2 },
  nara:      { landPriceAvg: 85933,   vacantHouseRate: 7.7,  agingRate: 32.9 },
  wakayama:  { landPriceAvg: 56173,   vacantHouseRate: 12.0, agingRate: 34.5 },
  tottori:   { landPriceAvg: 33592,   vacantHouseRate: 9.7,  agingRate: 33.7 },
  shimane:   { landPriceAvg: 40120,   vacantHouseRate: 11.4, agingRate: 35.2 },
  okayama:   { landPriceAvg: 72711,   vacantHouseRate: 8.6,  agingRate: 31.2 },
  hiroshima: { landPriceAvg: 178065,  vacantHouseRate: 7.8,  agingRate: 30.4 },
  yamaguchi: { landPriceAvg: 43435,   vacantHouseRate: 11.1, agingRate: 35.5 },
  tokushima: { landPriceAvg: 59662,   vacantHouseRate: 12.2, agingRate: 35.7 },
  kagawa:    { landPriceAvg: 59501,   vacantHouseRate: 9.7,  agingRate: 32.8 },
  ehime:     { landPriceAvg: 72587,   vacantHouseRate: 12.2, agingRate: 34.5 },
  kochi:     { landPriceAvg: 62590,   vacantHouseRate: 12.9, agingRate: 36.6 },
  fukuoka:   { landPriceAvg: 263636,  vacantHouseRate: 4.6,  agingRate: 28.6 },
  saga:      { landPriceAvg: 49894,   vacantHouseRate: 7.7,  agingRate: 32.0 },
  nagasaki:  { landPriceAvg: 79605,   vacantHouseRate: 9.9,  agingRate: 34.7 },
  kumamoto:  { landPriceAvg: 112848,  vacantHouseRate: 7.7,  agingRate: 32.6 },
  oita:      { landPriceAvg: 68380,   vacantHouseRate: 9.3,  agingRate: 34.4 },
  miyazaki:  { landPriceAvg: 41392,   vacantHouseRate: 9.9,  agingRate: 33.9 },
  kagoshima: { landPriceAvg: 73410,   vacantHouseRate: 13.6, agingRate: 34.2 },
  okinawa:   { landPriceAvg: 172134,  vacantHouseRate: 4.0,  agingRate: 24.2 }
};

// ---- 派生ヘルパー ----

// 全国平均 (公開値 or 上記値の単純平均)
export const nationalAverages = {
  // 国土交通省 2026年地価公示 住宅地全国平均
  landPriceAvg: 116300,
  // 総務省 2023年住宅土地統計 居住目的のない空き家率 全国
  vacantHouseRate: 5.9,
  // 内閣府 2024年10月時点 全国高齢化率
  agingRate: 29.3
};

export function getPrefectureStats(slug) {
  return prefectureStats[slug] || null;
}

export function formatYen(value) {
  if (value == null) return '';
  return `¥${value.toLocaleString('ja-JP')}`;
}

// 売却戦略アドバイス生成 — 数値から判断ロジック
// 公的データをもとに、その県の家じまい文脈でどこが注意点かを自動で返す
export function strategyForPrefecture(slug) {
  const s = prefectureStats[slug];
  if (!s) return null;
  const notes = [];

  // 地価水準の評価
  if (s.landPriceAvg >= 300000) {
    notes.push({
      type: 'price_strong',
      heading: '地価水準が高い',
      body: `住宅地平均 ${formatYen(s.landPriceAvg)}/㎡。全国平均の${Math.round(s.landPriceAvg / nationalAverages.landPriceAvg * 10) / 10}倍で、仲介で時間をかけても手残りを伸ばしやすい相場帯です。`
    });
  } else if (s.landPriceAvg >= 100000) {
    notes.push({
      type: 'price_mid',
      heading: '地価は中位帯',
      body: `住宅地平均 ${formatYen(s.landPriceAvg)}/㎡。中位圏の相場で、立地差とタイミングで手残りが動きやすい地域です。`
    });
  } else {
    notes.push({
      type: 'price_low',
      heading: '地価は低位帯',
      body: `住宅地平均 ${formatYen(s.landPriceAvg)}/㎡。全国平均の${Math.round(s.landPriceAvg / nationalAverages.landPriceAvg * 100) / 100}倍。高値売却より放置コスト削減と買取も含めた比較のほうが実利が出やすい水準です。`
    });
  }

  // 空き家率の評価
  if (s.vacantHouseRate >= 10.0) {
    notes.push({
      type: 'vacant_high',
      heading: '放置空き家が多い',
      body: `居住目的のない空き家率 ${s.vacantHouseRate}% (2023年調査)。全国平均5.9%を大きく上回り、買い手を探す難度が上がるエリアです。管理コストや近隣影響を早めに数字にするのが有効です。`
    });
  } else if (s.vacantHouseRate >= 6.0) {
    notes.push({
      type: 'vacant_mid',
      heading: '空き家は中位水準',
      body: `居住目的のない空き家率 ${s.vacantHouseRate}%。全国平均と同水準で、仲介と買取のどちらも現実的な選択肢になります。`
    });
  } else {
    notes.push({
      type: 'vacant_low',
      heading: '空き家は少ない',
      body: `居住目的のない空き家率 ${s.vacantHouseRate}%。全国平均より低く、需要側の厚みがあります。仲介で買主を探す期間が相対的に短く済みやすい地域です。`
    });
  }

  // 高齢化率の評価
  if (s.agingRate >= 34.0) {
    notes.push({
      type: 'aging_high',
      heading: '高齢化が進行',
      body: `65歳以上比率 ${s.agingRate}% (2024年10月時点)。相続・住み替えの相談が集中しやすく、実家売却の場面で競合物件も増えるため、早めに動いたほうが有利です。`
    });
  } else if (s.agingRate >= 28.0) {
    notes.push({
      type: 'aging_mid',
      heading: '高齢化は全国並み',
      body: `65歳以上比率 ${s.agingRate}%。相続絡みの売却相談は常態的に発生する層で、売却タイミングの選択肢は広めです。`
    });
  } else {
    notes.push({
      type: 'aging_low',
      heading: '高齢化は比較的緩やか',
      body: `65歳以上比率 ${s.agingRate}%で、全国平均29.3%より低い水準です。相続案件は相対的に少なく、住み替え需要側の厚みを活かしやすい地域です。`
    });
  }

  return notes;
}
