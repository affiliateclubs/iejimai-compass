import { comparePages, getSolutionPages, guides } from '../data/articles';
import { getCitiesByPrefecture, prefectures } from '../data/areas';

const baseUrl = 'https://iejimaiguide.com';

function buildUrls() {
  const staticUrls = [
    '',
    '/diagnosis',
    '/regions',
    '/regions/kanto',
    '/regions/kansai',
    '/problems',
    '/checklist',
    '/flow',
    '/privacy',
    '/terms',
    '/about',
    '/editorial-policy',
    '/disclaimer',
    '/partners',
    '/contact'
  ];
  const regionUrls = [
    '/regions/hokkaido',
    '/regions/tohoku',
    '/regions/kanto',
    '/regions/chubu',
    '/regions/kansai',
    '/regions/chugoku',
    '/regions/shikoku',
    '/regions/kyushu'
  ];
  const prefectureUrls = prefectures.map((prefecture) => `/${prefecture.slug}`);
  const cityUrls = prefectures.flatMap((prefecture) =>
    getCitiesByPrefecture(prefecture.slug).map((city) => `/${prefecture.slug}/${city.slug}`)
  );
  const guideUrls = guides.map((guide) => `/guide/${guide.slug}`);
  const compareUrls = comparePages.map((page) => `/compare/${page.slug}`);
  const solutionUrls = prefectures.flatMap((prefecture) =>
    getSolutionPages(prefecture).map((page) => `/${prefecture.slug}/solution/${page.slug}`)
  );
  const citySolutionSlugs = [
    'souzoku-jikka',
    'akiya-baikyaku',
    'hayaku-uritai',
    'ikkatsu-satei',
    'kaitori-hikaku',
    'houchi-risk',
    'souzoku-touki',
    'zanchiutsu-katazuke',
    'kaitai-sarachi',
    'reform-before-sale',
    'zeikin-3000man',
    'akiya-kanri'
  ];
  const citySolutionUrls = prefectures.flatMap((prefecture) =>
    getCitiesByPrefecture(prefecture.slug).flatMap((city) =>
      citySolutionSlugs.map((slug) => `/${prefecture.slug}/${city.slug}/solution/${slug}`)
    )
  );
  const dataUrls = prefectures.map((prefecture) => `/data/${prefecture.slug}/land-price`);
  return [
    ...staticUrls,
    ...regionUrls,
    ...prefectureUrls,
    ...cityUrls,
    ...guideUrls,
    ...compareUrls,
    ...solutionUrls,
    ...citySolutionUrls,
    ...dataUrls
  ];
}

export function getServerSideProps({ res }) {
  const urls = buildUrls();
  const body = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map((url) => `<url><loc>${baseUrl}${url}</loc></url>`).join('') +
    `</urlset>`;
  res.setHeader('Content-Type', 'text/xml');
  res.write(body);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
