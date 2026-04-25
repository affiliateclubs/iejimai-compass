import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

const MAP_ASSET_PATH = '/maps/japan-prefectures.svg';

export default function PrefectureMap({ prefectures, title = '地図から探す' }) {
  const [query, setQuery] = useState('');
  const [svgMarkup, setSvgMarkup] = useState('');
  const [activeSlug, setActiveSlug] = useState(prefectures[0]?.slug || '');
  const mapRef = useRef(null);
  const filteredPrefectures = useMemo(() => {
    const term = query.trim();
    if (!term) return prefectures;
    return prefectures.filter((prefecture) =>
      prefecture.name.includes(term) || prefecture.shortName.includes(term)
    );
  }, [prefectures, query]);
  const filteredSlugSet = useMemo(
    () => new Set(filteredPrefectures.map((prefecture) => prefecture.slug)),
    [filteredPrefectures]
  );
  const prefectureByCode = useMemo(
    () => new Map(prefectures.map((prefecture, index) => [prefecture.code || String(index + 1).padStart(2, '0'), prefecture])),
    [prefectures]
  );
  const activePrefecture =
    prefectures.find((prefecture) => prefecture.slug === activeSlug) ||
    filteredPrefectures[0] ||
    prefectures[0] ||
    null;

  useEffect(() => {
    let isMounted = true;

    async function loadMap() {
      try {
        const response = await fetch(MAP_ASSET_PATH);
        if (!response.ok) return;
        const svg = await response.text();
        if (isMounted) setSvgMarkup(svg);
      } catch {
        // Keep the chip list usable if the SVG fails to load.
      }
    }

    loadMap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!filteredPrefectures.length) {
      setActiveSlug('');
      return;
    }

    if (!activeSlug || !filteredSlugSet.has(activeSlug)) {
      setActiveSlug(filteredPrefectures[0].slug);
    }
  }, [activeSlug, filteredPrefectures, filteredSlugSet]);

  useEffect(() => {
    if (!svgMarkup || !mapRef.current) return;

    mapRef.current.innerHTML = svgMarkup;
    const svg = mapRef.current.querySelector('svg');
    if (!svg) return;

    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', title);

    const prefectureNodes = Array.from(svg.querySelectorAll('.prefecture'));
    prefectureNodes.forEach((node) => {
      const code = String(node.getAttribute('data-code') || '').padStart(2, '0');
      const prefecture = prefectureByCode.get(code);
      if (!prefecture) return;

      node.setAttribute('data-slug', prefecture.slug);
      node.setAttribute('data-prefecture-name', prefecture.name);
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'link');
      node.setAttribute('aria-label', `${prefecture.name}の地域ガイドを見る`);
      node.style.setProperty('--prefecture-fill', prefecture.color);

      const label = node.querySelector('title');
      if (label) label.textContent = `${prefecture.name}の地域ガイドを見る`;
    });

    const findPrefectureNode = (target) => {
      if (!(target instanceof Element)) return null;
      return target.closest('.prefecture');
    };

    const moveToPrefecture = (slug) => {
      if (!slug) return;
      window.location.href = `/${slug}`;
    };

    const handleClick = (event) => {
      const node = findPrefectureNode(event.target);
      const slug = node?.getAttribute('data-slug');
      if (!slug) return;
      moveToPrefecture(slug);
    };

    const handlePointer = (event) => {
      const node = findPrefectureNode(event.target);
      const slug = node?.getAttribute('data-slug');
      if (slug) setActiveSlug(slug);
    };

    const handleKeyDown = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const node = findPrefectureNode(event.target);
      const slug = node?.getAttribute('data-slug');
      if (!slug) return;
      event.preventDefault();
      moveToPrefecture(slug);
    };

    svg.addEventListener('click', handleClick);
    svg.addEventListener('mouseover', handlePointer);
    svg.addEventListener('focusin', handlePointer);
    svg.addEventListener('keydown', handleKeyDown);

    return () => {
      svg.removeEventListener('click', handleClick);
      svg.removeEventListener('mouseover', handlePointer);
      svg.removeEventListener('focusin', handlePointer);
      svg.removeEventListener('keydown', handleKeyDown);
    };
  }, [prefectureByCode, svgMarkup, title]);

  useEffect(() => {
    if (!mapRef.current) return;

    const prefectureNodes = mapRef.current.querySelectorAll('.prefecture');
    prefectureNodes.forEach((node) => {
      const slug = node.getAttribute('data-slug');
      const isMatch = !query.trim() || filteredSlugSet.has(slug);
      const isActive = activePrefecture?.slug === slug;

      node.classList.toggle('is-dimmed', !isMatch);
      node.classList.toggle('is-active', Boolean(isActive));
    });
  }, [activePrefecture, filteredSlugSet, query]);

  return (
    <section className="map-panel">
      <div className="map-panel-header">
        <p className="eyebrow">Map navigation</p>
        <h2>{title}</h2>
        <p className="section-copy">都道府県の形そのものをクリックして地域ページへ移動できます。検索とあわせて、まず場所の感覚から探せるようにしています。</p>
      </div>
      <div className="map-search">
        <label className="map-search-label" htmlFor="prefecture-map-search">
          都道府県名で探す
        </label>
        <input
          id="prefecture-map-search"
          className="map-search-input"
          type="search"
          placeholder="神奈川 / 大阪 / 北海道 など"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="japan-map">
        <div className="japan-map-stage">
          <div ref={mapRef} className="japan-map-svg" />
        </div>
        <aside className="map-active-card">
          <p className="eyebrow">Selected area</p>
          <h3>{activePrefecture?.name || '都道府県を選ぶ'}</h3>
          <p>
            {activePrefecture?.intro ||
              '地図から都道府県を選ぶと、その地域で実家じまいや空き家売却を考えるときの特徴が見られます。'}
          </p>
          {activePrefecture ? (
            <>
              <ul className="plain-list">
                {activePrefecture.traits.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="section-actions">
                <Link href={`/${activePrefecture.slug}`} className="primary-button">
                  {activePrefecture.name}の地域ガイドを見る
                </Link>
              </div>
            </>
          ) : null}
          <p className="map-attribution">
            地図データは
            {' '}
            <a href="https://github.com/geolonia/japanese-prefectures" target="_blank" rel="noreferrer">
              Geolonia の日本地図SVG
            </a>
            {' '}
            を使っています。
          </p>
        </aside>
      </div>
      <div className="map-search-results">
        {filteredPrefectures.map((prefecture) => (
          <Link key={prefecture.slug} href={`/${prefecture.slug}`} className="map-search-chip">
            {prefecture.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
