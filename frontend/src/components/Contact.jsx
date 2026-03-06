import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { portfolioData } from '../mock';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdyerqo';
const HCAPTCHA_SITE_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || '860a4082-9bc0-43fc-8456-bf88da424c0a';

const Contact = () => {
  const captchaRef = useRef(null);
  const captchaWidgetIdRef = useRef(null);
  const hcaptchaScriptPromiseRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const renderCaptcha = async () => {
      if (!hcaptchaScriptPromiseRef.current) {
        hcaptchaScriptPromiseRef.current = new Promise((resolve, reject) => {
          const existingScript = document.querySelector('script[data-hcaptcha-script="explicit"]');
          if (existingScript) {
            if (window.hcaptcha && window.hcaptcha.render) {
              resolve(window.hcaptcha);
              return;
            }
            existingScript.addEventListener('load', () => resolve(window.hcaptcha), { once: true });
            existingScript.addEventListener('error', () => reject(new Error('Failed to load CAPTCHA script.')), { once: true });
            return;
          }

          const script = document.createElement('script');
          script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
          script.async = true;
          script.defer = true;
          script.dataset.hcaptchaScript = 'explicit';
          script.onload = () => resolve(window.hcaptcha);
          script.onerror = () => reject(new Error('Failed to load CAPTCHA script.'));
          document.head.appendChild(script);
        });
      }

      await hcaptchaScriptPromiseRef.current;
      if (cancelled || !captchaRef.current || !window.hcaptcha || !window.hcaptcha.render) return;

      if (captchaWidgetIdRef.current === null) {
        captchaWidgetIdRef.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITE_KEY,
        });
      }
    };

    renderCaptcha().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    setIsSubmitting(true);

    const form = event.target;
    const formData = new FormData(form);
    formData.set('_replyto', String(formData.get('email') || ''));

    try {
      const captchaResponse = String(formData.get('h-captcha-response') || '');
      if (!captchaResponse) {
        throw new Error('Please complete the CAPTCHA before submitting.');
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const detailedError = payload?.errors?.map((item) => item.message).filter(Boolean).join(' ');
        throw new Error(detailedError || payload?.error || 'Message transmission failed. Please try again.');
      }

      setSubmitted(true);
      form.reset();
      if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') {
        window.hcaptcha.reset();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Message transmission failed. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="nx-section nx-block nx-block-alt">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="nx-head">
          <span>Contact</span>
          <h2>Let&apos;s Build Something Reliable</h2>
          <p>Open to Cloud / DevOps / SRE roles and delivery-focused engineering collaborations.</p>
        </header>

        <div className="nx-contact-shell">
          <aside className="nx-panel nx-contact-card">
            <h3>Direct Channel</h3>
            <a href={`mailto:${portfolioData.personal.email}`}><Mail size={15} /> {portfolioData.personal.email}</a>
            <a href={`tel:${portfolioData.personal.phone}`}><Phone size={15} /> {portfolioData.personal.phone}</a>
            <div><MapPin size={15} /> {portfolioData.personal.location}</div>

            <div className="nx-contact-social">
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer">
                <Github size={14} /> GitHub
              </a>
            </div>
          </aside>

          <div className="nx-panel nx-contact-form-card">
            <form onSubmit={handleSubmit} className="nx-contact-form">
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {submitted && <div className="nx-ok">Message sent successfully.</div>}
              {submitError && <div className="nx-error">{submitError}</div>}

              <label>
                <span>Name</span>
                <input type="text" name="name" required />
              </label>

              <label>
                <span>Email</span>
                <input type="email" name="email" required />
              </label>

              <label>
                <span>Subject</span>
                <input type="text" name="subject" required />
              </label>

              <label>
                <span>Message</span>
                <textarea name="message" rows={5} required />
              </label>

              <div ref={captchaRef} />

              <button type="submit" disabled={isSubmitting} className="nx-btn-primary nx-submit-btn">
                {isSubmitting ? (
                  <><Loader2 size={14} className="spin" /> Sending...</>
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
