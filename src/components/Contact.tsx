import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/resumeData';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#2563eb',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:+919840188163`,
    color: '#059669',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personalInfo.location,
    href: null,
    color: '#7c3aed',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'shubh-2601s',
    href: personalInfo.github,
    color: '#0f172a',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'shubham-s-14ba6a283',
    href: personalInfo.linkedin,
    color: '#0077b5',
  },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    // Simulate form submission (replace with EmailJS when configured)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormState('idle'), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent)', transform: 'translate(30%, 30%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">✉️ Contact</div>
          <h2 className="section-title mt-2">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Whether it's a project collaboration, an internship opportunity, or just a chat about technology — I'd love to connect!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Hero card */}
            <div
              className="p-8 rounded-2xl text-white mb-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6)' }}
            >
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative z-10">
                <div className="text-4xl mb-4">👋</div>
                <h3 className="text-2xl font-black mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Open to Opportunities!
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  I'm actively looking for internships, full-time roles, and project collaborations in Software Engineering, Full Stack Development, and AI/ML.
                  Feel free to reach out — let's create something extraordinary together.
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ background: `${color}15`, color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors truncate block"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-slate-800">{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
              <h3 className="font-black text-slate-900 text-xl mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Send a Message
              </h3>

              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 mb-6"
                >
                  <CheckCircle size={20} className="text-green-600 shrink-0" />
                  <span className="text-sm font-medium">Message sent! I'll get back to you shortly.</span>
                </motion.div>
              )}

              {formState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 mb-6"
                >
                  <AlertCircle size={20} className="text-red-600 shrink-0" />
                  <span className="text-sm font-medium">Failed to send. Please email me directly.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1.5">Subject *</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g., Internship Opportunity / Project Collaboration"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the opportunity or what you'd like to collaborate on..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formState === 'loading'}
                  whileHover={{ scale: formState !== 'loading' ? 1.02 : 1 }}
                  whileTap={{ scale: formState !== 'loading' ? 0.98 : 1 }}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
