import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MessageCircle, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby3kZXjZ1pXjb45FNy0u1FlQJIvlYEvNOkj69PUfFi1geUiIZKykqXuO05J6vz0cqYB/exec';

const EMAIL = 'vishalkannan232007@gmail.com';
const WHATSAPP = '+91 95850 57340';
const WHATSAPP_URL = `https://wa.me/919585057340?text=Hi%20V%20DESIGN%2C%20I%20have%20a%20project%20in%20mind.`;

const serviceOptions = [
  'BRAND IDENTITY',
  'WEBSITE & UI/UX',
  'CINEMATIC VIDEO',
  'MOTION GRAPHICS',
  'COMPREHENSIVE PARTNERSHIP',
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
      newErrors.name = 'Please provide your name or company.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = 'Please provide a valid phone number (at least 7 digits).';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service category.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief summary of your project goals.';
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

      const url = `${SCRIPT_URL}?${params.toString()}`;

      // Submit to Google Apps Script via GET no-cors
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });

      // Clear form on success
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
        'Submission interrupted. Please reach out directly via WhatsApp or Email below.'
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status === 'error' || status === 'success') {
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-charcoal-950 border-b border-charcoal-800 relative">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Chapter 05 Section Header */}
        <div className="space-y-4 border-b border-charcoal-800 pb-10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-lime shadow-[0_0_8px_rgba(212,255,0,0.8)] animate-pulse" />
            <p className="font-mono text-lime font-bold text-xs tracking-[0.25em] uppercase">
              CHAPTER 05 &mdash; LET'S START
            </p>
          </div>

          {/* Exact Headline Required */}
          <div className="space-y-1">
            <h2 className="display-hero text-warm-white">
              LET'S MAKE
            </h2>
            <div className="display-hero text-warm-white flex items-baseline flex-wrap">
              <span>SOMETHING DISTINCTIVE</span>
              <span className="text-lime text-glow-lime ml-1">.</span>
            </div>
          </div>
        </div>

        {/* Contact Grid: Form & Direct Studio Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Inquiry Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="font-mono text-warm-dim block mb-2 text-[0.62rem] uppercase tracking-widest">
                    YOUR NAME OR COMPANY *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Mercer"
                    className={`form-input-editorial ${errors.name ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="font-mono text-warm-dim block mb-2 text-[0.62rem] uppercase tracking-widest">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@brand.com"
                    className={`form-input-editorial ${errors.email ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="font-mono text-warm-dim block mb-2 text-[0.62rem] uppercase tracking-widest">
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`form-input-editorial ${errors.phone ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 font-mono">{errors.phone}</p>
                  )}
                </div>

                {/* Service Category */}
                <div>
                  <label htmlFor="service" className="font-mono text-warm-dim block mb-2 text-[0.62rem] uppercase tracking-widest">
                    PRIMARY SERVICE *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`form-input-editorial ${errors.service ? 'border-b-red-400' : ''}`}
                    disabled={status === 'loading'}
                  >
                    <option value="" disabled>Select Category</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1 font-mono">{errors.service}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="font-mono text-warm-dim block mb-2 text-[0.62rem] uppercase tracking-widest">
                  PROJECT BRIEF & TIMELINE *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a brief outline of your brand goals, scope, and target launch window..."
                  className={`form-input-editorial resize-none ${errors.message ? 'border-b-red-400' : ''}`}
                  disabled={status === 'loading'}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Status alerts */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 rounded-xl border border-lime/50 bg-lime/10 flex items-center gap-3 text-warm-white"
                  >
                    <CheckCircle2 size={18} className="text-lime flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-lime">
                        COMMISSION BRIEF TRANSMITTED
                      </p>
                      <p className="text-xs text-warm-muted mt-0.5">
                        Thank you. We have received your brief and will respond within 24 business hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 rounded-xl border border-red-500/50 bg-red-500/10 flex items-center gap-3 text-red-200"
                  >
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-400">
                        TRANSMISSION ERROR
                      </p>
                      <p className="text-xs text-warm-muted mt-0.5">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA (Exact: START A PROJECT) */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-lime hover:bg-lime-hover text-charcoal-950 font-space text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,255,0,0.35)] cursor-pointer ${
                    status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  aria-label="Start a Project"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-charcoal-950" />
                      <span>Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>START A PROJECT</span>
                      <ArrowUpRight size={15} className="text-charcoal-950" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Direct Studio Channels */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6 border-t lg:border-t-0 lg:border-l border-charcoal-800 pt-8 lg:pt-0">
            <div>
              <p className="font-mono text-warm-dim text-[0.62rem] tracking-[0.25em] uppercase mb-4">
                DIRECT CONTACT
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="p-5 rounded-2xl border border-charcoal-800 bg-charcoal-900/60 flex items-center justify-between group hover:border-lime transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <Mail size={18} className="text-lime" />
                    <div>
                      <p className="font-mono text-warm-dim text-[0.58rem] tracking-wider uppercase">DIRECT EMAIL</p>
                      <p className="text-warm-white text-sm font-medium group-hover:text-lime transition-colors break-all">
                        {EMAIL}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-warm-dim group-hover:text-lime transition-colors" />
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl border border-charcoal-800 bg-charcoal-900/60 flex items-center justify-between group hover:border-lime transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <MessageCircle size={18} className="text-lime" />
                    <div>
                      <p className="font-mono text-warm-dim text-[0.58rem] tracking-wider uppercase">WHATSAPP DIRECT</p>
                      <p className="text-warm-white text-sm font-medium group-hover:text-lime transition-colors">
                        {WHATSAPP}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-warm-dim group-hover:text-lime transition-colors" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-charcoal-800">
              <p className="font-mono text-warm-dim text-[0.62rem] tracking-[0.25em] uppercase mb-3">
                STUDIO STATUS
              </p>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-lime text-glow-lime animate-pulse" />
                <span className="text-warm-white text-xs font-semibold uppercase tracking-wider font-space">
                  Accepting Select Commissions
                </span>
              </div>
              <p className="text-warm-muted text-xs leading-relaxed mt-2 font-light">
                We accept a strictly limited number of brand and motion commissions each quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
