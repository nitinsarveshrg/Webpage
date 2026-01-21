import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Linkedin, Github, MapPin, Phone, Send } from 'lucide-react';
import { portfolioData } from '../mock';
import { toast } from '../hooks/use-toast';
import AnimatedBackground from './AnimatedBackground';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // This will be connected to backend later
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon."
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
      <AnimatedBackground opacity={0.08} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-400 text-lg">Let's discuss your next project or opportunity</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <div className="space-y-4">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Email</p>
                    <p className="font-semibold group-hover:text-cyan-400">{portfolioData.personal.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Phone</p>
                    <p className="font-semibold group-hover:text-cyan-400">{portfolioData.personal.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Location</p>
                    <p className="font-semibold">{portfolioData.personal.location}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-cyan-500 rounded-lg p-4 text-zinc-300 hover:text-cyan-400 transition-all"
              >
                <Linkedin size={20} />
                <span className="font-semibold">LinkedIn</span>
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-cyan-500 rounded-lg p-4 text-zinc-300 hover:text-cyan-400 transition-all"
              >
                <Github size={20} />
                <span className="font-semibold">GitHub</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-zinc-300 mb-2 block">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-300 mb-2 block">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-300 mb-2 block">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-300 mb-2 block">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  rows={5}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-cyan-500 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                <Send className="mr-2" size={20} />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
