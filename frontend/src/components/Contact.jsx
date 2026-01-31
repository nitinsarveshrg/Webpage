import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Linkedin, Github, MapPin, Phone, Send, Terminal, Lock } from 'lucide-react';
import { portfolioData } from '../mock';
import { toast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✓ Message transmitted!",
      description: "Encrypted message received. Will respond via secure channel."
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 font-mono">
            <Terminal className="inline mr-3" size={40} />
            &gt; ./establish_connection.sh
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 ml-16 mb-4"></div>
          <p className="text-zinc-400 text-lg font-mono ml-16">
            [ SECURE_CHANNEL // ENCRYPTED_COMMS ]
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="text-green-400 font-mono text-sm mb-6">
              <span className="text-cyan-400">root@devops:~$</span> cat contact_info.dat
            </div>
            
            <Card className="bg-black/50 border-cyan-500/30 p-6">
              <div className="space-y-4">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center">
                    <Mail className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-mono">&gt; EMAIL:</p>
                    <p className="font-semibold group-hover:text-cyan-400 font-mono text-sm">{portfolioData.personal.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center">
                    <Phone className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-mono">&gt; PHONE:</p>
                    <p className="font-semibold group-hover:text-cyan-400 font-mono text-sm">{portfolioData.personal.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center">
                    <MapPin className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-mono">&gt; LOCATION:</p>
                    <p className="font-semibold font-mono text-sm">{portfolioData.personal.location}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-black/50 border border-cyan-500/30 hover:border-cyan-500 rounded p-4 text-zinc-300 hover:text-cyan-400 transition-all font-mono text-sm"
              >
                <Linkedin size={20} />
                <span>LINKEDIN</span>
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-black/50 border border-cyan-500/30 hover:border-cyan-500 rounded p-4 text-zinc-300 hover:text-cyan-400 transition-all font-mono text-sm"
              >
                <Github size={20} />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-black/50 border-cyan-500/30 p-6">
            <div className="flex items-center gap-2 mb-6 text-green-400 font-mono text-sm">
              <Lock size={16} />
              <span>&gt; ENCRYPTED_MESSAGE_FORM</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-cyan-400 mb-2 block font-mono">&gt; NAME:</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="bg-zinc-900 border-cyan-500/30 text-white placeholder:text-zinc-600 focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-cyan-400 mb-2 block font-mono">&gt; EMAIL:</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-zinc-900 border-cyan-500/30 text-white placeholder:text-zinc-600 focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-cyan-400 mb-2 block font-mono">&gt; SUBJECT:</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Message subject"
                  required
                  className="bg-zinc-900 border-cyan-500/30 text-white placeholder:text-zinc-600 focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-cyan-400 mb-2 block font-mono">&gt; MESSAGE:</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your encrypted message..."
                  required
                  rows={5}
                  className="bg-zinc-900 border-cyan-500/30 text-white placeholder:text-zinc-600 focus:border-cyan-500 resize-none font-mono"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold border-2 border-cyan-400 font-mono"
              >
                <Send className="mr-2" size={20} />
                &gt; TRANSMIT_MESSAGE
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
