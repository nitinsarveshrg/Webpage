import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    formData.set('_replyto', String(formData.get('email') || ''));

    try {
      const captchaResponse = String(formData.get('h-captcha-response') || '');
      if (!captchaResponse) {
        throw new Error('Please complete the CAPTCHA before submitting.');
      }

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        const detailedError = payload?.errors?.map((item) => item.message).filter(Boolean).join(' ');
        throw new Error(detailedError || payload?.error || 'Message transmission failed. Please try again.');
      }

      setSubmitted(true);
      form.reset();
      if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') {
        window.hcaptcha.reset();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Message transmission failed. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="page-section section-band alt">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">contact</span>
          <h2>Open Communication Channel</h2>
          <p>For roles, collaborations, or cloud discussions, send a message directly from here.</p>
        </div>

        <div className="contact-layout-new">
          <aside className="glass-card contact-info-card">
            <h3>Reach Me</h3>
            <a href={`mailto:${portfolioData.personal.email}`}><Mail size={15} /> {portfolioData.personal.email}</a>
            <a href={`tel:${portfolioData.personal.phone}`}><Phone size={15} /> {portfolioData.personal.phone}</a>
            <div><MapPin size={15} /> {portfolioData.personal.location}</div>

            <div className="contact-social-row">
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-link linkedin">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="contact-social-link github">
                <Github size={14} /> GitHub
              </a>
            </div>
          </aside>

          <div className="glass-card contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form-grid">
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {submitted && <div className="form-ok">Message transmitted successfully.</div>}
              {submitError && <div className="form-error">{submitError}</div>}

              <label>
                <span>Name</span>
                <Input type="text" name="name" required />
              </label>
              <label>
                <span>Email</span>
                <Input type="email" name="email" required />
              </label>
              <label>
                <span>Subject</span>
                <Input type="text" name="subject" required />
              </label>
              <label>
                <span>Message</span>
                <Textarea name="message" rows={5} required />
              </label>

              <div ref={captchaRef} />

              <Button type="submit" disabled={isSubmitting} className="contact-submit-btn">
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="spin" /> sending...
                  </>
                ) : (
                  <>
                    <Send size={14} /> transmit message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
