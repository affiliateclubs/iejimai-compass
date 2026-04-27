// 家じまい・空き家・相続テーマのストック画像 (Unsplash 商用利用可)
const IEJIMAI_IMAGES = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80', // 家
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', // empty house
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80', // 玄関
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80', // 古い家
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80', // 部屋
  'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=80', // 田舎の家
  'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=80', // 階段
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80', // 内装
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80', // 廃屋
  'https://images.unsplash.com/photo-1559644981-b04ea3f1a99d?w=1200&q=80', // garden
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1200&q=80', // 街並み
  'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80', // モダン家
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80', // 鍵
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80', // リビング
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', // 洋風家
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80', // 家
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80', // 古道具
  'https://images.unsplash.com/photo-1604014438239-b1ee75bd61c9?w=1200&q=80', // 整理
  'https://images.unsplash.com/photo-1617104551722-3b2d51366400?w=1200&q=80', // 書類
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80', // 計算機
];

export function imageForSlug(slug) {
  if (!slug) return IEJIMAI_IMAGES[0];
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return IEJIMAI_IMAGES[h % IEJIMAI_IMAGES.length];
}

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2000&q=80';
