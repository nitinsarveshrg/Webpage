import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { portfolioData } from '../mock';

const FORMSPREE = 'https://formspree.io/f/xbdyerqo';
const HCAPTCHA_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || '860a4082-9bc0-43fc-8456-bf88da424c0a';

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.9, ease: [0.16, 0.86, 0.24, 1], delay },
});

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
    <section id="contact" className="nx-section contact-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">

        <motion.div {...inView(0)}>
          <div className="section-label">Contact</div>
          <h2 className="section-heading">
            Infrastructure is invisible<br />when it <em>works perfectly.</em>
          </h2>
        </motion.div>

        <div className="contact-inner">

          {/* Left: statement + social */}
          <motion.div {...inView(0.12)}>
            <p className="contact-statement">
              Available for <span>Cloud · DevOps · SRE</span> roles<br />
              and engineering collaborations.
            </p>

            <div className="contact-social">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="contact-social-link"
              >
                <Mail size={16} />
                <div>
                  <div className="contact-social-name">Email</div>
                  <div className="contact-social-handle">{portfolioData.personal.email}</div>
                </div>
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="contact-social-link"
              >
                <Linkedin size={16} />
                <div>
                  <div className="contact-social-name">LinkedIn</div>
                  <div className="contact-social-handle">nitin-sarvesh-raajagopal</div>
                </div>
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank" rel="noopener noreferrer"
                className="contact-social-link"
              >
                <Github size={16} />
                <div>
                  <div className="contact-social-name">GitHub</div>
                  <div className="contact-social-handle">nitinsarveshrg</div>
                </div>
              </a>
              <div className="contact-social-link" style={{ cursor: 'default' }}>
                <MapPin size={16} />
                <div>
                  <div className="contact-social-name">Location</div>
                  <div className="contact-social-handle">{portfolioData.personal.location}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div {...inView(0.22)}>
            <form onSubmit={handleSubmit} className="contact-form">
              <input type="hidden" name="_subject" value="Portfolio Contact" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {submitted && (
                <div style={{ padding: '0.875rem 1rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.20)', borderRadius: '8px', color: '#22c55e', fontSize: '0.875rem' }}>
                  ✓ Message sent — I'll reply within 24h.
                </div>
              )}
              {error && (
                <div style={{ padding: '0.875rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)', borderRadius: '8px', color: '#ef4444', fontSize: '0.875rem' }}>
                  ⚠ {error}
                </div>
              )}

              {[
                { name: 'name', type: 'text', label: 'Your name', ph: 'Full name' },
                { name: 'email', type: 'email', label: 'Email address', ph: 'you@company.com' },
                { name: 'subject', type: 'text', label: 'Subject', ph: 'Role / collaboration / inquiry' },
              ].map((f) => (
                <div key={f.name} className="form-field">
                  <label htmlFor={`ct-${f.name}`} className="form-label">{f.label}</label>
                  <input
                    id={`ct-${f.name}`} type={f.type} name={f.name}
                    placeholder={f.ph} required className="form-input"
                  />
                </div>
              ))}

              <div className="form-field">
                <label htmlFor="ct-msg" className="form-label">Message</label>
                <textarea
                  id="ct-msg" name="message" rows={5}
                  placeholder="Describe the role or project…"
                  required className="form-textarea"
                />
              </div>

              <div ref={captchaRef} />

              <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {submitting
                  ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                  : <><Send size={14} /> Send Message</>
                }
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
