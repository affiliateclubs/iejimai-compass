const TO = 'affiliateclubs@gmail.com';
const FROM = 'お問い合わせ <onboarding@resend.dev>';
const SITE = '家じまいガイド';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, type, message, website } = req.body || {};

  if (website) return res.status(200).json({ ok: true });

  if (!name || !email || !type || !message) {
    return res.status(400).json({ error: 'required fields missing' });
  }
  if (typeof message !== 'string' || message.length > 5000) {
    return res.status(400).json({ error: 'message too long' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'invalid email' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'mail backend not configured' });
  }

  const safe = (s) => String(s).replace(/[<>]/g, '');
  const html = `
    <h2>${SITE} お問い合わせ</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">
      <tr><td><b>お名前</b></td><td>${safe(name)}</td></tr>
      <tr><td><b>Email</b></td><td>${safe(email)}</td></tr>
      <tr><td><b>種類</b></td><td>${safe(type)}</td></tr>
      <tr><td valign="top"><b>内容</b></td><td><pre style="font-family:inherit;white-space:pre-wrap;margin:0">${safe(message)}</pre></td></tr>
    </table>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: email,
        subject: `【${SITE}】${safe(type)} - ${safe(name)}`,
        html,
      }),
    });
    if (!r.ok) {
      const txt = await r.text();
      console.error('resend error', r.status, txt);
      return res.status(502).json({ error: 'send failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('resend exception', e);
    return res.status(500).json({ error: 'send error' });
  }
}
