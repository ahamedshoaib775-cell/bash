import React, { useState } from 'react';
import { SectionHeader } from '../UI/SectionHeader';
import { motion } from 'framer-motion';
import { Globe, Code2, Cpu, BarChart3, Target, Sparkles, ArrowUpRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

const SERVICES_DATA = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Beautiful websites, e-commerce platforms, landing pages and custom web experiences built for conversion.',
    features: ['Custom Next.js & React', 'High-Speed Performance', 'E-Commerce Solutions', 'Mobile-First Design'],
    icon: Globe,
  },
  {
    number: '02',
    title: 'Software Development',
    description: 'Custom software, interactive dashboards, CRM systems, internal tools and scalable cloud solutions.',
    features: ['SaaS Architectures', 'Admin Dashboards', 'API Integration', 'Cloud Backend'],
    icon: Code2,
  },
  {
    number: '03',
    title: 'AI & Automation',
    description: 'Smart automation, custom AI models, intelligent chatbots, automated workflows and business logic.',
    features: ['Workflow Automation', 'Custom LLM Agents', 'Chatbots & Assistants', 'Process Optimization'],
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Digital Marketing',
    description: 'Social media management, high-converting content, technical SEO, Meta ads and digital growth strategies.',
    features: ['Technical & On-Page SEO', 'Meta & Google Ads', 'Content Strategy', 'Brand Positioning'],
    icon: BarChart3,
  },
  {
    number: '05',
    title: 'Lead Generation',
    description: 'Find, attract and convert high-value customers with data-driven outreach and optimized sales funnels.',
    features: ['Sales Funnel Optimization', 'B2B Lead Pipelines', 'Targeted Campaigns', 'Conversion Analytics'],
    icon: Target,
  },
  {
    number: '06',
    title: 'Custom Solutions',
    description: 'Your vision. Our technology. Real measurable business results engineered to scale rapidly.',
    features: ['Tailored Tech Stack', 'Dedicated Support', 'Scalable Architecture', 'Continuous Optimization'],
    icon: Sparkles,
  },
];

const ServiceCard: React.FC<{ service: (typeof SERVICES_DATA)[0]; index: number }> = ({ service, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const IconComponent = service.icon;

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={resetCursor}
      onClick={scrollToContact}
      className="relative bg-[#FAFAF8] border border-[#DCDCD7] hover:border-[#111111] p-3.5 sm:p-6 rounded-lg transition-all duration-300 group overflow-hidden flex flex-col justify-between hover:shadow-md min-h-[140px] sm:min-h-[160px] cursor-pointer active:scale-[0.97]"
    >
      {/* Subtle cursor-following radial highlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(17, 17, 17, 0.04), transparent 80%)`,
        }}
      />

      {/* Top Header Row */}
      <div className="space-y-2 sm:space-y-4">
        <div className="flex items-center justify-between border-b border-[#DCDCD7] pb-2 sm:pb-3">
          <span className="font-mono text-[10px] sm:text-xs text-[#666666] tracking-widest font-semibold">
            {service.number}
          </span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-md bg-[#F5F5F2] border border-[#DCDCD7] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-[#F5F5F2] transition-colors duration-300 shrink-0">
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-12" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-lg md:text-2xl font-bold font-display text-[#111111] leading-tight group-hover:text-black">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed line-clamp-2 sm:line-clamp-none">
          {service.description}
        </p>

        {/* Features Checklist */}
        <ul className="space-y-1 pt-1 hidden sm:block">
          {service.features.map((feat) => (
            <li key={feat} className="text-xs text-[#666666] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom CTA Arrow Row */}
      <div className="pt-3 sm:pt-6 flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#111111] opacity-90">
          Explore →
        </span>
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#DCDCD7] group-hover:border-[#111111] flex items-center justify-center transition-all duration-300 group-hover:bg-[#111111] group-hover:text-white">
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-[#DCDCD7]/80 overflow-x-hidden">
      <SectionHeader
        eyebrow="OUR SERVICES"
        title="Everything You Need Under One Roof."
        description="We offer a complete range of digital solutions to help your business build, automate and grow."
      />

      {/* 2-Column Mobile Grid for Services */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-14">
        {SERVICES_DATA.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};
