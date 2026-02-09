import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Linkedin, Github, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdyerqo';
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '';

const Contact = () => {
  const recaptchaLoaderRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [frameExpanded, setFrameExpanded] = useState(false);

  const loadRecaptcha = () => {
    if (!RECAPTCHA_SITE_KEY) return Promise.resolve(null);
    if (window.grecaptcha && window.grecaptcha.execute) return Promise.resolve(window.grecaptcha);

    if (!recaptchaLoaderRef.current) {
      recaptchaLoaderRef.current = new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[data-recaptcha-key="${RECAPTCHA_SITE_KEY}"]`);
        if (existingScript) {
          if (window.grecaptcha && window.grecaptcha.execute) {
            resolve(window.grecaptcha);
            return;
          }
          existingScript.addEventListener('load', () => resolve(window.grecaptcha), { once: true });
          existingScript.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA script.')), { once: true });
          return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        script.dataset.recaptchaKey = RECAPTCHA_SITE_KEY;
        script.onload = () => resolve(window.grecaptcha);
        script.onerror = () => reject(new Error('Failed to load reCAPTCHA script.'));
        document.head.appendChild(script);
      });
    }

    return recaptchaLoaderRef.current;
  };

  const getRecaptchaToken = async () => {
    if (!RECAPTCHA_SITE_KEY) return null;
    const grecaptcha = await loadRecaptcha();
    if (!grecaptcha) return null;

    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
          .then(resolve)
          .catch(() => reject(new Error('Unable to verify reCAPTCHA. Please try again.')));
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    formData.set('_replyto', String(formData.get('email') || ''));

    try {
      const recaptchaToken = await getRecaptchaToken();
      if (recaptchaToken) {
        formData.set('g-recaptcha-response', String(recaptchaToken));
      }

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        const detailedError = payload?.errors?.map((item) => item.message).filter(Boolean).join(' ');
        if (detailedError?.includes('submit via AJAX')) {
          throw new Error(
            'Formspree default CAPTCHA cannot run inline with AJAX. To keep submission on this page, either add custom reCAPTCHA keys in Formspree, or disable CAPTCHA for this form.'
          );
        }
        throw new Error(detailedError || payload?.error || 'Message transmission failed. Please try again.');
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Message transmission failed. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="portfolio-section bg-black">
      <div className={`section-shell max-w-7xl w-full mx-auto px-6 relative z-10 ${frameExpanded ? 'section-frame-grow' : 'section-frame-preroll'}`}>
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 text-sm ml-4">root@cloud-devops: ~/contact</span>
          </div>
        </div>

        <div className="terminal-body terminal-overlay">
          <div className="text-green-400 mb-6">
            <TerminalCommand
              className="mb-1"
              prompt="root@cloud-devops:~$"
              command="./init_secure_channel.sh"
              onRunStart={() => setFrameExpanded(true)}
              onCompleteChange={() => setShowContent(true)}
              outputClassName="ml-4 text-zinc-400 text-sm"
              outputLines={[
                'Establishing encrypted communication...',
                '[✓] Secure channel ready',
              ]}
            />
          </div>

          {showContent && (
            <div className="section-elongate-load">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="terminal-stagger-reveal" style={{ '--reveal-delay': '120ms' }}>
                  <ScrollTypingLine className="text-green-400 text-sm mb-4" prompt="$" text="cat contact_info.dat" speed={24} />

                  <div className="terminal-panel space-y-4">
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="flex items-center gap-3 text-zinc-300 hover:text-[#EA4335] transition-colors group terminal-stagger-reveal"
                      style={{ '--reveal-delay': '220ms' }}
                    >
                      <Mail className="text-cyan-400 group-hover:text-[#EA4335] transition-colors" size={16} />
                      <div className="text-xs"><div className="text-zinc-500">EMAIL:</div><div className="group-hover:text-[#EA4335] transition-colors">{portfolioData.personal.email}</div></div>
                    </a>

                    <a
                      href={`tel:${portfolioData.personal.phone}`}
                      className="flex items-center gap-3 text-zinc-300 hover:text-cyan-400 transition-colors group terminal-stagger-reveal"
                      style={{ '--reveal-delay': '320ms' }}
                    >
                      <Phone className="text-cyan-400" size={16} />
                      <div className="text-xs"><div className="text-zinc-500">PHONE:</div><div className="group-hover:text-cyan-400">{portfolioData.personal.phone}</div></div>
                    </a>

                    <div className="flex items-center gap-3 text-zinc-300 terminal-stagger-reveal" style={{ '--reveal-delay': '420ms' }}>
                      <MapPin className="text-cyan-400" size={16} />
                      <div className="text-xs"><div className="text-zinc-500">LOCATION:</div><div>{portfolioData.personal.location}</div></div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-green-400 text-sm mb-2"><span className="text-cyan-400">$</span> ls -la socials/</div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={portfolioData.personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 terminal-panel hover:border-[#0A66C2]/80 text-zinc-300 hover:text-[#0A66C2] text-xs terminal-stagger-reveal transition-colors"
                        style={{ '--reveal-delay': '520ms' }}
                      >
                        <Linkedin size={14} />
                        <span>LINKEDIN</span>
                      </a>
                      <a
                        href={portfolioData.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 terminal-panel hover:border-white/70 text-zinc-300 hover:text-white text-xs terminal-stagger-reveal transition-colors"
                        style={{ '--reveal-delay': '620ms' }}
                      >
                        <Github size={14} />
                        <span>GITHUB</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="terminal-stagger-reveal" style={{ '--reveal-delay': '260ms' }}>
                  <ScrollTypingLine className="text-green-400 text-sm mb-4" prompt="$" text="nano message.txt" speed={24} />
                  <div className="terminal-panel">
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
                      <input type="hidden" name="_template" value="table" />
                      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                      {submitted && <div className="text-green-400 text-xs mb-2">✓ Message transmitted successfully</div>}
                      {submitError && (
                        <div className="text-red-400 text-xs mb-2" role="alert">
                          {submitError}
                        </div>
                      )}

                      <div>
                        <label className="text-xs text-cyan-400 mb-1 block">&gt; NAME:</label>
                        <Input type="text" name="name" required className="bg-black border-cyan-500/30 text-white text-xs h-8 font-mono" />
                      </div>
                      <div>
                        <label className="text-xs text-cyan-400 mb-1 block">&gt; EMAIL:</label>
                        <Input type="email" name="email" required className="bg-black border-cyan-500/30 text-white text-xs h-8 font-mono" />
                      </div>
                      <div>
                        <label className="text-xs text-cyan-400 mb-1 block">&gt; SUBJECT:</label>
                        <Input type="text" name="subject" required className="bg-black border-cyan-500/30 text-white text-xs h-8 font-mono" />
                      </div>
                      <div>
                        <label className="text-xs text-cyan-400 mb-1 block">&gt; MESSAGE:</label>
                        <Textarea name="message" required rows={4} className="bg-black border-cyan-500/30 text-white text-xs resize-none font-mono" />
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold border-2 border-cyan-400 text-xs h-9 disabled:opacity-50">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 animate-spin" size={14} />
                            &gt; TRANSMITTING...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2" size={14} />
                            &gt; TRANSMIT_MESSAGE
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-green-400 text-sm terminal-stagger-reveal" style={{ '--reveal-delay': '760ms' }}>
                <ScrollTypingLine prompt="$" text={`echo "Awaiting secure transmission..."`} speed={24} />
                <div className="ml-4">Awaiting secure transmission...</div>
                <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
