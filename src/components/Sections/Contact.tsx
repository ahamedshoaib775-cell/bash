import React, { useState } from 'react';
import { SectionHeader } from '../UI/SectionHeader';
import { motion } from 'framer-motion';
import { MagneticButton } from '../UI/MagneticButton';
import { BashLogo } from '../UI/BashLogo';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCursor } from '../../context/CursorContext';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#111111', '#6B6B6B', '#DDDDD8'],
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-[#DDDDD8] overflow-x-hidden">
      <SectionHeader
        eyebrow="CONTACT"
        title="Let's Build Something Great Together."
        description="Have a project in mind? Fill out the form or reach out directly. We'd love to hear from you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-10 sm:mt-14">
        {/* Left Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 bg-[#FAFAF8] border border-[#DDDDD8] p-5 sm:p-8 md:p-10 rounded-lg space-y-6 sm:space-y-8 w-full"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#111111] text-[#FFFFFF] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-[#111111]">Message Sent Successfully!</h3>
              <p className="text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#111111]">{formData.name}</span>. The BASH engineering team will review your project details and respond within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="text-xs uppercase font-mono tracking-wider text-[#111111] underline cursor-pointer pt-4 active:scale-95 transition-transform"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-[#DDDDD8] focus:border-[#111111] min-h-[52px] py-3.5 text-base text-[#111111] outline-none transition-colors"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-3.5 text-sm text-[#6B6B6B] transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#111111] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#111111]"
                >
                  Your Name *
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-[#DDDDD8] focus:border-[#111111] min-h-[52px] py-3.5 text-base text-[#111111] outline-none transition-colors"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3.5 text-sm text-[#6B6B6B] transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#111111] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#111111]"
                >
                  Your Email *
                </label>
              </div>

              {/* Message Input */}
              <div className="relative pt-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-[#DDDDD8] focus:border-[#111111] py-3.5 text-base text-[#111111] outline-none transition-colors resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-5 text-sm text-[#6B6B6B] transition-all duration-200 pointer-events-none peer-focus:-top-1.5 peer-focus:text-xs peer-focus:text-[#111111] peer-[&:not(:placeholder-shown)]:-top-1.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#111111]"
                >
                  Tell us about your project *
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <MagneticButton
                  onClick={() => {}}
                  className="w-full bg-[#111111] text-[#FFFFFF] font-semibold text-sm min-h-[52px] py-3.5 rounded-full hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </MagneticButton>
              </div>
            </form>
          )}
        </motion.div>

        {/* Right Column: Contact Details + BASH Official Logo Presentation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 space-y-8 flex flex-col justify-between w-full"
        >
          {/* Direct Details */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl font-bold font-display text-[#111111]">
              Direct Contact
            </h3>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              <a
                href="mailto:hello@bash.com"
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm text-[#6B6B6B] hover:text-[#111111] transition-colors group p-3 sm:p-3.5 rounded-lg border border-[#DDDDD8] bg-[#FAFAF8] active:scale-[0.98]"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#111111] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-mono text-[#6B6B6B] uppercase">EMAIL US</p>
                  <p className="font-bold text-xs sm:text-sm text-[#111111] group-hover:underline truncate">hello@bash.com</p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm text-[#6B6B6B] hover:text-[#111111] transition-colors group p-3 sm:p-3.5 rounded-lg border border-[#DDDDD8] bg-[#FAFAF8] active:scale-[0.98]"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#111111] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-mono text-[#6B6B6B] uppercase">CALL US</p>
                  <p className="font-bold text-xs sm:text-sm text-[#111111] group-hover:underline truncate">+91 XXXXX</p>
                </div>
              </a>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm text-[#6B6B6B] p-3 sm:p-3.5 rounded-lg border border-[#DDDDD8] bg-[#FAFAF8]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#111111] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-mono text-[#6B6B6B] uppercase">LOCATION</p>
                  <p className="font-bold text-xs sm:text-sm text-[#111111] truncate">Chennai, IN</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm text-[#6B6B6B] p-3 sm:p-3.5 rounded-lg border border-[#DDDDD8] bg-[#FAFAF8]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#111111] text-white flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-mono text-[#6B6B6B] uppercase">RESPONSE</p>
                  <p className="font-bold text-xs sm:text-sm text-[#111111] truncate">&lt; 24 Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* BASH Logo Presentation */}
          <div className="p-6 sm:p-8 rounded-xl border border-[#DDDDD8] bg-[#FAFAF8] text-center flex flex-col items-center justify-center space-y-3">
            <BashLogo size="lg" showWordmark={true} />
            <p className="text-[11px] font-mono text-[#6B6B6B] uppercase tracking-widest pt-1">
              WE BUILD • WE AUTOMATE • WE GROW
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
