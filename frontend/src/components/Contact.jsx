import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Linkedin, Github, MapPin, Phone, Send, MessageSquare } from 'lucide-react';
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
      title: "Message sent successfully!",
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
    <section id="contact" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="text-blue-400" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Get In Touch
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          <p className="text-slate-400 text-lg mt-4">Let's discuss your next cloud infrastructure project</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <Card className="bg-slate-900/50 border-2 border-blue-500/30 p-6 backdrop-blur-sm">
              <div className="space-y-4">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-blue-400 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold">Email</p>
                    <p className="font-semibold group-hover:text-blue-400 text-sm">{portfolioData.personal.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-blue-400 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold">Phone</p>
                    <p className="font-semibold group-hover:text-blue-400 text-sm">{portfolioData.personal.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-semibold">Location</p>
                    <p className="font-semibold text-sm">{portfolioData.personal.location}</p>
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
                className="flex items-center justify-center gap-2 bg-slate-900/50 border-2 border-blue-500/30 hover:border-blue-500/60 rounded-lg p-4 text-slate-300 hover:text-blue-400 transition-all backdrop-blur-sm"
              >
                <Linkedin size={20} />
                <span className="font-semibold">LinkedIn</span>
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-900/50 border-2 border-blue-500/30 hover:border-blue-500/60 rounded-lg p-4 text-slate-300 hover:text-blue-400 transition-all backdrop-blur-sm"
              >
                <Github size={20} />
                <span className="font-semibold">GitHub</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-slate-900/50 border-2 border-blue-500/30 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  rows={5}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/50"
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
