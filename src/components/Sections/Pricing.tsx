import React from 'react';
import { SectionHeader } from '../UI/SectionHeader';
import { motion } from 'framer-motion';
import { MagneticButton } from '../UI/MagneticButton';
import { Check, ArrowRight, Star } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

const PLANS = [
  {
    name: 'STARTER',
    price: '₹4,999',
    period: '/ project',
    description: 'Perfect for small businesses, local services, and early-stage startups.',
    popular: false,
    features: [
      'Custom Website / Landing Page',
      'Mobile Responsive Layout',
      'Basic Technical SEO Setup',
      'Contact Form Integration',
      '1 Month Dedicated Support',
      'Sub-Second Page Load Optimization',
    ],
    buttonText: 'Get Starter Plan',
  },
  {
    name: 'BUSINESS',
    price: '₹9,999',
    period: '/ project',
    description: 'For growing businesses that need robust web apps and active lead growth.',
    popular: true,
    features: [
      'Custom Website or Web App',
      'Advanced CMS & Admin Dashboard',
      'Social Media & Pixel Integration',
      'AI Chatbot & Workflow Setup',
      '3 Months Dedicated Support',
      'Full SEO & Performance Package',
      'Custom Domain & SSL Config',
    ],
    buttonText: 'Get Business Plan',
  },
  {
    name: 'ENTERPRISE',
    price: '₹19,999+',
    period: '/ project',
    description: 'For established brands requiring custom software, AI models, and marketing.',
    popular: false,
    features: [
      'Full-Stack Custom Architecture',
      'Custom AI Agent & Automation',
      'Omnichannel Digital Marketing',
      'B2B Lead Pipeline Setup',
      'Ongoing 24/7 Support & SLA',
      'Dedicated Tech Lead & Strategy',
      'Custom Analytics & Dashboards',
    ],
    buttonText: 'Talk to Engineering',
  },
];

export const Pricing: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-[#DCDCD7]/80 overflow-x-hidden">
      <SectionHeader
        eyebrow="PRICING"
        title="Transparent Pricing. No Hidden Fees."
        description="Choose the plan that fits your business needs. Simple, predictable pricing tailored to drive measurable growth."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14 items-stretch">
        {PLANS.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={isMobile ? false : { opacity: 0, y: 30 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className={`relative rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? 'bg-[#111111] text-[#F5F5F2] border-2 border-[#111111] shadow-lg md:scale-105 my-2 md:my-0'
                : 'bg-[#FAFAF8] text-[#111111] border border-[#DCDCD7] hover:border-[#111111]'
            }`}
          >
            {/* Most Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F5F5F2] text-[#111111] text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-[#111111] flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 fill-[#111111]" />
                <span>MOST POPULAR</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Header info */}
              <div className="space-y-2 border-b border-current/15 pb-6">
                <span
                  className={`text-xs font-mono font-bold tracking-widest ${
                    plan.popular ? 'text-gray-400' : 'text-[#666666]'
                  }`}
                >
                  {plan.name}
                </span>

                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight">
                    {plan.price}
                  </span>
                  <span className={`text-xs font-mono ${plan.popular ? 'text-gray-400' : 'text-[#666666]'}`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`text-xs pt-1 leading-relaxed ${plan.popular ? 'text-gray-300' : 'text-[#666666]'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-3">
                <span
                  className={`text-[11px] font-mono uppercase tracking-widest block font-semibold ${
                    plan.popular ? 'text-gray-300' : 'text-[#666666]'
                  }`}
                >
                  WHAT'S INCLUDED:
                </span>
                <ul className="space-y-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="text-xs flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.popular ? 'text-[#F5F5F2]' : 'text-[#111111]'
                        }`}
                      />
                      <span className={plan.popular ? 'text-gray-200' : 'text-[#111111]'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 sm:pt-8 mt-6 border-t border-current/15">
              <MagneticButton
                onClick={scrollToContact}
                className={`w-full text-xs font-semibold py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 group min-h-[48px] active:scale-[0.98] ${
                  plan.popular
                    ? 'bg-[#F5F5F2] text-[#111111] hover:bg-white'
                    : 'bg-[#111111] text-[#F5F5F2] hover:bg-black'
                }`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
