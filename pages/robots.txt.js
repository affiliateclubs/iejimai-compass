export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.write('User-agent: *\nAllow: /\nSitemap: https://iejimaiguide.com/sitemap.xml\n');
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
