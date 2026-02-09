import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Linkedin, Github, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { portfolioData } from '../mock';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xbdyerqo", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch (err) {
      console.error("Formspree error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Terminal Header */}
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

        {/* Terminal Content */}
        <div className="terminal-body terminal-overlay">
          <div className="text-green-400 mb-6">
            <div className="mb-2"><span className="text-cyan-400">root@cloud-devops:~$</span> ./init_secure_channel.sh</div>
            <div className="ml-4 text-zinc-400 text-sm">Establishing encrypted communication...</div>
            <div className="ml-4 text-green-400 text-sm mb-4">[✓] Secure channel ready</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info Terminal */}
            <div>
              <div className="text-green-400 text-sm mb-4">
                <span className="text-cyan-400">$</span> cat contact_info.dat
              </div>
              
              <div className="terminal-panel space-y-4">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-3 text-zinc-300 hover:text-cyan-400 transition-colors group"
                >
                  <Mail className="text-cyan-400" size={16} />
                  <div className="text-xs">
                    <div className="text-zinc-500">EMAIL:</div>
                    <div className="group-hover:text-cyan-400">{portfolioData.personal.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="flex items-center gap-3 text-zinc-300 hover:text-cyan-400 transition-colors group"
                >
                  <Phone className="text-cyan-400" size={16} />
                  <div className="text-xs">
                    <div className="text-zinc-500">PHONE:</div>
                    <div className="group-hover:text-cyan-400">{portfolioData.personal.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin className="text-cyan-400" size={16} />
                  <div className="text-xs">
                    <div className="text-zinc-500">LOCATION:</div>
                    <div>{portfolioData.personal.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4">
                <div className="text-green-400 text-sm mb-2">
                  <span className="text-cyan-400">$</span> ls -la socials/
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 terminal-panel hover:border-cyan-500 text-zinc-300 hover:text-cyan-400 text-xs"
                  >
                    <Linkedin size={14} />
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 terminal-panel hover:border-cyan-500 text-zinc-300 hover:text-cyan-400 text-xs"
                  >
                    <Github size={14} />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Message Form Terminal */}
            <div>
              <div className="text-green-400 text-sm mb-4">
                <span className="text-cyan-400">$</span> nano message.txt
              </div>
              <div className="terminal-panel">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="hidden" name="_replyto" />
                  <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
                  <input type="hidden" name="_template" value="table" />
                  {submitted && (
                    <div className="text-green-400 text-xs mb-2">
                      ✓ Message transmitted successfully
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-cyan-400 mb-1 block">&gt; NAME:</label>
                    <Input
                      type="text"
                      name="name"
                      required
                      className="bg-black border-cyan-500/30 text-white text-xs h-8 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-cyan-400 mb-1 block">&gt; EMAIL:</label>
                    <Input
                      type="email"
                      name="email"
                      required
                      className="bg-black border-cyan-500/30 text-white text-xs h-8 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-cyan-400 mb-1 block">&gt; SUBJECT:</label>
                    <Input
                      type="text"
                      name="subject"
                      required
                      className="bg-black border-cyan-500/30 text-white text-xs h-8 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-cyan-400 mb-1 block">&gt; MESSAGE:</label>
                    <Textarea
                      name="message"
                      required
                      rows={4}
                      className="bg-black border-cyan-500/30 text-white text-xs resize-none font-mono"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold border-2 border-cyan-400 text-xs h-9 disabled:opacity-50"
                  >
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

          {/* Command output */}
          <div className="mt-6 text-green-400 text-sm">
            <div><span className="text-cyan-400">$</span> echo "Awaiting secure transmission..."</div>
            <div className="ml-4">Awaiting secure transmission...</div>
            <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
