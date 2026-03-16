import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { portfolioData } from '../mock';

const FORMSPREE = 'https://formspree.io/f/xbdyerqo';
const HCAPTCHA_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || '860a4082-9bc0-43fc-8456-bf88da424c0a';

const Contact = () => {
  const captchaRef = useRef(null);
  const captchaWidgetIdRef = useRef(null);
  const scriptRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!scriptRef.current) {
        scriptRef.current = new Promise((resolve, reject) => {
          const existing = document.querySelector('script[data-hcaptcha-script="explicit"]');
          if (existing) {
            if (window.hcaptcha?.render) { resolve(window.hcaptcha); return; }
            existing.addEventListener('load', () => resolve(window.hcaptcha), { once: true });
            existing.addEventListener('error', () => reject(new Error('CAPTCHA load failed')), { once: true });
            return;
          }
          const s = document.createElement('script');
          s.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
          s.async = true; s.defer = true; s.dataset.hcaptchaScript = 'explicit';
          s.onload = () => resolve(window.hcaptcha);
          s.onerror = () => reject(new Error('CAPTCHA load failed'));
          document.head.appendChild(s);
        });
      }
      await scriptRef.current;
      if (cancelled || !captchaRef.current || !window.hcaptcha?.render) return;
      if (captchaWidgetIdRef.current === null) {
        captchaWidgetIdRef.current = window.hcaptcha.render(captchaRef.current, { sitekey: HCAPTCHA_KEY });
      }
    };
    load().catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSubmitted(false); setSubmitting(true);
    const fd = new FormData(e.target); fd.set('_replyto', String(fd.get('email') || ''));
    try {
      if (!String(fd.get('h-captcha-response') || '')) throw new Error('Please complete the CAPTCHA.');
      const res = await fetch(FORMSPREE, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.errors?.map((x) => x.message).join(' ') || 'Transmission failed.');
      setSubmitted(true); e.target.reset(); window.hcaptcha?.reset?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transmission failed.');
    } finally { setSubmitting(false); }
  };

  return (
    <section id="contact" className="nx-section ct-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="ct-chapter" aria-hidden="true">06</div>

      <div className="content-wrap">
        <div className="ct-header" data-reveal>
          <span className="section-label">CONTACT</span>
          <h2 className="ct-title">Open<br /><em>Channel</em></h2>
          <p className="ct-sub">Available for Cloud · DevOps · SRE roles and engineering collaborations.</p>
        </div>

        <div className="ct-layout">
          {/* Info */}
          <aside className="ct-info" data-reveal data-reveal-delay="2">
            <div className="ct-info-group">
              <p className="ct-group-label">// direct</p>
              <a href={`mailto:${portfolioData.personal.email}`} className="ct-info-line">
                <Mail size={14} /><span>{portfolioData.personal.email}</span>
              </a>
              <a href={`tel:${portfolioData.personal.phone}`} className="ct-info-line">
                <Phone size={14} /><span>{portfolioData.personal.phone}</span>
              </a>
              <div className="ct-info-line">
                <MapPin size={14} /><span>{portfolioData.personal.location}</span>
              </div>
            </div>
            <div className="ct-info-group">
              <p className="ct-group-label">// profiles</p>
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="ct-social">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="ct-social">
                <Github size={14} /> GitHub
              </a>
            </div>
            <div className="ct-avail">
              <span className="ct-avail-dot" /><span>Open to opportunities</span>
            </div>
          </aside>

          {/* Form */}
          <div className="ct-form-shell" data-reveal data-reveal-delay="3">
            <div className="ct-form-top">
              <span className="ct-form-label">new_message.sh</span>
            </div>
            <form onSubmit={handleSubmit} className="ct-form">
              <input type="hidden" name="_subject" value="Portfolio Contact" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {submitted && <div className="ct-ok">✓ Message sent — I'll reply within 24h.</div>}
              {error && <div className="ct-err">⚠ {error}</div>}

              {[
                { name: 'name', type: 'text', label: 'name', ph: 'your full name' },
                { name: 'email', type: 'email', label: 'email', ph: 'you@company.com' },
                { name: 'subject', type: 'text', label: 'subject', ph: 'role / collaboration / inquiry' },
              ].map((f) => (
                <div key={f.name} className="ct-field">
                  <label htmlFor={`ct-${f.name}`}>
                    <span className="ct-prompt">$</span><span className="ct-field-name">{f.label}</span>
                  </label>
                  <input id={`ct-${f.name}`} type={f.type} name={f.name} placeholder={f.ph} required />
                </div>
              ))}

              <div className="ct-field">
                <label htmlFor="ct-msg">
                  <span className="ct-prompt">$</span><span className="ct-field-name">message</span>
                </label>
                <textarea id="ct-msg" name="message" rows={5} placeholder="describe the role or project…" required />
              </div>

              <div ref={captchaRef} />

              <button type="submit" disabled={submitting} className="ct-submit">
                {submitting ? <><Loader2 size={14} className="spin" /> Sending…</> : <><Send size={14} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
