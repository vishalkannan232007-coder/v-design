import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerReveal } from '../components/AnimationComponents';
import { ArrowUpRight, MessageCircle, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby3kZXjZ1pXjb45FNy0u1FlQJIvlYEvNOkj69PUfFi1geUiIZKykqXuO05J6vz0cqYB/exec';

const EMAIL = 'vishalkannan232007@gmail.com';
const WHATSAPP = '+91 9585057340';
const WHATSAPP_URL = `https://wa.me/919585057340?text=Hi%20V%20DESIGN%2C%20I%20have%20a%20project%20in%20mind.`;

const serviceOptions = [
  'Brand Identity',
  'Logo Design',
  'Web Design & UI/UX',
  'Video Editing & Motion Design',
  'Other',
];

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const params = new URLSearchParams({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
      });

      const url = SCRIPT_URL + '?' + params.toString();

      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });

      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      setErrors({});
      setStatus('success');
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(
        'Submission failed. Please check your internet connection or reach out via WhatsApp/Email.'
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear individual field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status === 'error' || status === 'success') {
      setStatus('idle');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-40 px-6 md:px-10 lg:px-14 border-t border-ink-border"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Dramatic CTA heading */}
        <div className="mb-20">
          <FadeIn>
            <p className="label-xs mb-6">07 — Let's Work Together</p>
          </FadeIn>
          <StaggerReveal staggerDelay={0.09}>
            <h2 className="display-xl text-cream">HAVE AN IDEA?</h2>
            <h2 className="display-xl text-gold">LET'S MAKE IT</h2>
            <h2 className="display-xl text-cream">VISIBLE.</h2>
          </StaggerReveal>
          <FadeIn delay={0.4} direction="up" className="mt-8">
            <p className="text-ash text-base md:text-lg max-w-md leading-relaxed">
              Reach out via the form, email or WhatsApp — let's talk about your project.
            </p>
          </FadeIn>
        </div>

        {/* Quick contact CTAs */}
        <FadeIn delay={0.3} direction="up" className="flex flex-wrap gap-4 mb-20">
          <a
            href={`mailto:${EMAIL}`}
            className="btn-primary"
            data-cursor="open"
          >
            <span>Email Directly</span>
            <ArrowUpRight size={14} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2"
            data-cursor="open"
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </a>
        </FadeIn>

        {/* Grid: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Enquiry form */}
          <FadeIn delay={0.4} direction="up" className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Project enquiry form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="label-xs block mb-1 text-ash/60">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`form-input ${errors.name ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 tracking-wide">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="label-xs block mb-1 text-ash/60">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`form-input ${errors.email ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 tracking-wide">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="label-xs block mb-1 text-ash/60">
                    Phone *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`form-input ${errors.phone ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 tracking-wide">{errors.phone}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="contact-service" className="label-xs block mb-1 text-ash/60">
                    Service *
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`form-input ${errors.service ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  >
                    <option value="" disabled>Select service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1 tracking-wide">{errors.service}</p>
                  )}
                </div>

                {/* Message — full width */}
                <div className="md:col-span-2">
                  <label htmlFor="contact-message" className="label-xs block mb-1 text-ash/60">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals and timeline..."
                    className={`form-input resize-none ${errors.message ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 tracking-wide">{errors.message}</p>
                  )}
                </div>
              </div>

              {/* Status feedback alerts */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 border border-gold/40 bg-gold/5 flex items-center gap-3 text-cream"
                  >
                    <CheckCircle2 size={18} className="text-gold flex-shrink-0" />
                    <p className="text-sm font-medium tracking-wide">
                      Thank you. Your enquiry has been received.
                    </p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 border border-red-500/40 bg-red-500/5 flex items-center gap-3 text-red-200"
                  >
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                    <p className="text-sm font-medium tracking-wide">
                      {errorMessage || 'Submission failed. Please try again or reach out via WhatsApp.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <div className="mt-8">
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  className={`btn-primary w-full md:w-auto ${
                    status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  data-cursor="open"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={14} className="animate-spin text-ink" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </FadeIn>

          {/* Contact info */}
          <FadeIn delay={0.5} direction="up" className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-8">
              <div>
                <p className="label-xs text-ash/40 mb-3">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-2 group"
                  data-cursor="open"
                >
                  <Mail size={12} className="text-ash/40 mt-0.5 flex-shrink-0 group-hover:text-gold transition-colors" />
                  <span className="text-cream text-sm hover:text-gold transition-colors duration-300 break-all">
                    {EMAIL}
                  </span>
                </a>
              </div>

              <div>
                <p className="label-xs text-ash/40 mb-3">WhatsApp</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group"
                  data-cursor="open"
                >
                  <MessageCircle size={12} className="text-ash/40 group-hover:text-gold transition-colors" />
                  <span className="text-cream text-sm hover:text-gold transition-colors duration-300">
                    {WHATSAPP}
                  </span>
                </a>
              </div>

              <div className="pt-8 border-t border-ink-border">
                <p className="label-xs text-ash/40 mb-3">Studio</p>
                <p className="text-cream text-sm font-semibold">V DESIGN</p>
                <p className="text-ash text-xs mt-1">Creative Design Studio</p>
                <p className="label-xs text-ash/35 mt-2">BRANDING / DIGITAL / MOTION</p>
              </div>

              <div>
                <p className="label-xs text-ash/40 mb-4">Available for</p>
                {[
                  'Logo & Brand Identity Projects',
                  'Web Design Projects',
                  'Video & Motion Projects',
                  'Long-term Brand Partnerships',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2.5 border-b border-ink-border/50">
                    <div className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-ash text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
