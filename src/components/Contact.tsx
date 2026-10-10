import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/resumeData';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#06d6a0',
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
    href: null as string | null,
    color: '#7c3aed',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'shubh-2601s',
    href: personalInfo.github,
    color: '#e8e8f0',
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

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.75rem',
  background: 'var(--bg-elevated)',
  color: 'var(--text-primary)',
  fontSize: '0.875rem',
  border: '1px solid var(--border-subtle)',
  outline: 'none',
  transition: 'border-color 0.2s ease',
} as const;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_p9aop1g';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_h8pl7dm';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '7qcrvW5TN2VGgT9NB';

    const templateParams = {
      name: form.name,
      from_name: form.name,
      email: form.email,
      from_email: form.email,
      reply_to: form.email,
      subject: form.subject,
      message: form.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setFormState('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setErrorMessage(
        err && typeof err === 'object' && 'text' in err && typeof (err as { text: unknown }).text === 'string'
          ? (err as { text: string }).text
          : 'Failed to send message. Please email me directly.'
      );
      setFormState('error');
      setTimeout(() => setFormState('idle'), 6000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.05), transparent)', transform: 'translate(30%, 30%)', filter: 'blur(60px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
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
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center">
            Whether it's a project collaboration, an internship opportunity, or just a chat about technology — I'd love to connect!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          >
            {/* Hero card */}
            <div
              className="p-8 rounded-2xl mb-8 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-card))',
                border: '1px solid var(--border-accent)',
              }}
            >
              {/* Electric Laser Top Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, transparent, #06d6a0, #38bdf8, #ffffff, #06d6a0, transparent)',
                  boxShadow: '0 0 14px rgba(6, 214, 160, 0.9)',
                }}
              />
              <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-4xl mb-4">👋</div>
                <h3 className="text-2xl font-black mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                  Open to Opportunities!
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative"
                    style={{
                      background: `${color}15`,
                      color,
                      border: `1px solid ${color}35`,
                      boxShadow: `0 0 12px ${color}20`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full absolute -top-1 -right-1 animate-ping pointer-events-none" style={{ background: color }} />
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-semibold truncate block transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = color)}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="electric-card-glow relative overflow-hidden p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              {/* Form Electric Laser Top Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, transparent, #06d6a0, #38bdf8, #ffffff, #06d6a0, transparent)',
                  boxShadow: '0 0 14px rgba(6, 214, 160, 0.9)',
                }}
              />
              <h3 className="font-black text-xl mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                Send a Message
              </h3>

              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{ background: 'rgba(6,214,160,0.08)', border: '1px solid rgba(6,214,160,0.2)', color: 'var(--accent-primary)' }}
                >
                  <CheckCircle size={20} className="shrink-0" />
                  <span className="text-sm font-medium">Message sent! I'll get back to you shortly.</span>
                </motion.div>
              )}

              {formState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
                >
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="text-sm font-medium">{errorMessage || 'Failed to send. Please email me directly.'}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      style={{ ...inputStyle, caretColor: 'var(--accent-primary)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(6,214,160,0.4)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={{ ...inputStyle, caretColor: 'var(--accent-primary)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(6,214,160,0.4)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Subject *</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g., Internship Opportunity / Project Collaboration"
                    style={{ ...inputStyle, caretColor: 'var(--accent-primary)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(6,214,160,0.4)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the opportunity or what you'd like to collaborate on..."
                    style={{ ...inputStyle, resize: 'none', caretColor: 'var(--accent-primary)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(6,214,160,0.4)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
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
                      <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
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
