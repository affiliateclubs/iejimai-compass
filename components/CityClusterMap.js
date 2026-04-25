import Link from 'next/link';

export default function CityClusterMap({
  prefecture,
  cities,
  title,
  currentCitySlug
}) {
  return (
    <section className="map-panel city-map-panel">
      <div className="map-panel-header">
        <p className="eyebrow">Municipality map</p>
        <h2>{title}</h2>
      </div>
      <div className="city-cluster-map">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${prefecture.slug}/${city.slug}`}
            className={`city-cluster-dot${currentCitySlug === city.slug ? ' current' : ''}`}
            style={{ left: `${city.position.x}%`, top: `${city.position.y}%` }}
          >
            <strong>{city.name}</strong>
            <span>{city.headline}</span>
          </Link>
        ))}
      </div>
      <div className="city-cluster-notes">
        {cities.map((city) => (
          <article key={city.slug} className="soft-card compact-card">
            <h3>{city.name}はこんな感じ</h3>
            <p>{city.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
