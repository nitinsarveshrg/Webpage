import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { portfolioData } from '../mock';

const FORMSPREE = 'https://formspree.io/f/xbdyerqo';
const HCAPTCHA_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || '860a4082-9bc0-43fc-8456-bf88da424c0a';

const FIELDS = [
  { name: 'name', label: 'name', type: 'text', placeholder: 'your full name' },
  { name: 'email', label: 'email', type: 'email', placeholder: 'you@company.com' },
  { name: 'subject', label: 'subject', type: 'text', placeholder: 'role / collaboration / other' },
];

const Contact = () => {
  const captchaRef = useRef(null);
  const captchaWidgetIdRef = useRef(null);
  const scriptPromiseRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const loadCaptcha = async () => {
      if (!scriptPromiseRef.current) {
        scriptPromiseRef.current = new Promise((resolve, reject) => {
          const existing = document.querySelector('script[data-hcaptcha-script="explicit"]');
          if (existing) {
            if (window.hcaptcha?.render) { resolve(window.hcaptcha); return; }
            existing.addEventListener('load', () => resolve(window.hcaptcha), { once: true });
            existing.addEventListener('error', () => reject(new Error('CAPTCHA load failed')), { once: true });
            return;
          }
          const s = document.createElement('script');
          s.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
          s.async = true; s.defer = true;
          s.dataset.hcaptchaScript = 'explicit';
          s.onload = () => resolve(window.hcaptcha);
          s.onerror = () => reject(new Error('CAPTCHA load failed'));
          document.head.appendChild(s);
        });
      }
      await scriptPromiseRef.current;
      if (cancelled || !captchaRef.current || !window.hcaptcha?.render) return;
      if (captchaWidgetIdRef.current === null) {
        captchaWidgetIdRef.current = window.hcaptcha.render(captchaRef.current, { sitekey: HCAPTCHA_KEY });
      }
    };
    loadCaptcha().catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSubmitted(false); setSubmitting(true);
    const formData = new FormData(e.target);
    formData.set('_replyto', String(formData.get('email') || ''));
    try {
      if (!String(formData.get('h-captcha-response') || '')) {
        throw new Error('Please complete the CAPTCHA.');
      }
      const res = await fetch(FORMSPREE, { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.errors?.map((x) => x.message).join(' ') || 'Transmission failed.');
      setSubmitted(true);
      e.target.reset();
      window.hcaptcha?.reset?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transmission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="nx-section ct-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">

        {/* Header */}
        <div className="ct-header">
          <span className="ct-tag">CONTACT</span>
          <h2>Open Channel</h2>
          <p>Available for Cloud · DevOps · SRE roles and technical collaborations.</p>
        </div>

        <div className="ct-layout">

          {/* Left: connection info */}
          <aside className="ct-info">
            <div className="ct-info-block">
              <p className="ct-info-label">// direct_channel</p>
              <a href={`mailto:${portfolioData.personal.email}`} className="ct-info-row">
                <Mail size={15} /><span>{portfolioData.personal.email}</span>
              </a>
              <a href={`tel:${portfolioData.personal.phone}`} className="ct-info-row">
                <Phone size={15} /><span>{portfolioData.personal.phone}</span>
              </a>
              <div className="ct-info-row">
                <MapPin size={15} /><span>{portfolioData.personal.location}</span>
              </div>
            </div>

            <div className="ct-info-block">
              <p className="ct-info-label">// social_links</p>
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="ct-social-btn">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="ct-social-btn">
                <Github size={14} /> GitHub
              </a>
            </div>

            <div className="ct-availability">
              <span className="ct-avail-dot" />
              <span>Available · Toronto, Canada</span>
            </div>
          </aside>

          {/* Right: form */}
          <div className="ct-form-wrap">
            <div className="ct-form-bar">
              <span className="ct-form-title">new_message.sh</span>
            </div>
            <form onSubmit={handleSubmit} className="ct-form">
              <input type="hidden" name="_subject" value="Portfolio Contact" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {submitted && (
                <div className="ct-ok">
                  <span className="ct-ok-icon">✓</span>
                  Message transmitted. I'll respond within 24h.
                </div>
              )}
              {error && <div className="ct-error">⚠ {error}</div>}

              {FIELDS.map((f) => (
                <div key={f.name} className="ct-field">
                  <label htmlFor={`ct-${f.name}`}>
                    <span className="ct-field-prompt">$</span>
                    <span className="ct-field-label">{f.label}</span>
                  </label>
                  <input
                    id={`ct-${f.name}`}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    required
                  />
                </div>
              ))}

              <div className="ct-field">
                <label htmlFor="ct-message">
                  <span className="ct-field-prompt">$</span>
                  <span className="ct-field-label">message</span>
                </label>
                <textarea id="ct-message" name="message" rows={5} placeholder="describe the opportunity or project…" required />
              </div>

              <div ref={captchaRef} className="ct-captcha" />

              <button type="submit" disabled={submitting} className="ct-submit">
                {submitting ? (
                  <><Loader2 size={14} className="spin" /> Transmitting…</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
