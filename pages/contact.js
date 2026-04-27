import { useState } from 'react';
import Layout from '../components/Layout';
import { siteConfig } from '../data/site';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      type: fd.get('type'),
      message: fd.get('message'),
      website: fd.get('website'),
    };
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || '送信に失敗しました');
      }
      e.target.reset();
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message || '送信に失敗しました');
    }
  };

  return (
    <Layout
      title="お問い合わせ | 家じまいガイド"
      description="家じまいガイドへのご相談、サイト売却・媒体掲載・提携に関するお問い合わせフォーム。通常2営業日以内に返信します。"
      canonical={`${siteConfig.domain}/contact`}
    >
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">CONTACT</p>
          <h1>お問い合わせ</h1>
          <p>
            記事内容のご質問、不動産売却サービスの媒体掲載・提携、
            <strong>サイトごとの売却・買収のご相談</strong>まで承ります。
            下記フォームからお送りください。通常2営業日以内に、ご記入いただいたメールアドレス宛に返信します。
          </p>
        </div>
      </section>

      <section className="container section-block">
        {status === 'sent' && (
          <div className="contact-thanks">
            <strong>送信ありがとうございました。</strong>
            <p>内容を確認のうえ、ご記入いただいたメールアドレスから返信します。</p>
          </div>
        )}
        <div className="contact-grid">
          <article className="contact-form-card">
            <h2>お問い合わせフォーム</h2>
            <form onSubmit={onSubmit} className="contact-form" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
              <label className="form-label">
                <span>お名前 / 会社名 <em>必須</em></span>
                <input type="text" name="name" required placeholder="例: 山田 太郎 / 株式会社○○" />
              </label>
              <label className="form-label">
                <span>メールアドレス <em>必須</em></span>
                <input type="email" name="email" required placeholder="返信先のメールアドレス" />
              </label>
              <label className="form-label">
                <span>ご相談の種類 <em>必須</em></span>
                <select name="type" required defaultValue="">
                  <option value="" disabled>選択してください</option>
                  <option>記事内容について</option>
                  <option>媒体掲載・タイアップ提携</option>
                  <option>サイトの売却・買収相談</option>
                  <option>取材・メディア連携</option>
                  <option>その他</option>
                </select>
              </label>
              <label className="form-label">
                <span>ご相談内容 <em>必須</em></span>
                <textarea
                  name="message"
                  required
                  rows={8}
                  placeholder="ご相談内容を具体的にお書きください。&#10;媒体掲載の場合: 商材、希望する掲載位置、報酬形態 など&#10;サイト売却の場合: 想定金額、取引方法 など"
                />
              </label>
              <button type="submit" className="primary-button form-submit" disabled={status === 'sending'}>
                {status === 'sending' ? '送信中…' : '送信する'}
              </button>
              {status === 'error' && (
                <p className="form-note" style={{ color: '#b03a2e' }}>
                  送信に失敗しました: {error}。少し時間を置いて再度お試しください。
                </p>
              )}
              <p className="form-note">
                * ご記入いただいたメールアドレス宛に、通常2営業日以内に返信します。
              </p>
            </form>
          </article>

          <aside className="contact-side">
            <div className="contact-info-card">
              <h3>サイト売却・買収のご相談</h3>
              <p>
                家じまいガイドは <strong>5,000ページ以上の地域別コンテンツ</strong> + 47都道府県の地価・空き家データを抱える独立メディアです。
                M&A・サイトM&A・編集権のみの譲渡など、目的に応じた条件をお伺いします。
              </p>
            </div>

            <div className="contact-info-card">
              <h3>媒体掲載・提携</h3>
              <p>
                不動産売却・相続・解体・遺品整理・空き家管理など、家じまい文脈にフィットするサービスは積極的に掲載・タイアップ可能です。
                掲載位置・導線・報酬形態を相談できます。
              </p>
            </div>

            <div className="contact-info-card">
              <h3>記事内容のご質問</h3>
              <p>
                個別の不動産売却に関する判断は税理士・司法書士・宅建業者へのご相談を推奨しています。
                記事の事実関係や追加情報のご指摘は歓迎します。
              </p>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
