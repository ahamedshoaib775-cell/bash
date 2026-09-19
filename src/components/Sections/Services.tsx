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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={resetCursor}
      className="relative bg-[#FAFAF8] border border-[#DCDCD7] hover:border-[#111111] p-8 rounded-lg transition-all duration-300 group overflow-hidden flex flex-col justify-between hover:-translate-y-2 hover:shadow-lg"
    >
      {/* Subtle cursor-following radial highlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(17, 17, 17, 0.04), transparent 80%)`,
        }}
      />

      {/* Top Header Row */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#DCDCD7] pb-4">
          <span className="font-mono text-xs text-[#666666] tracking-widest font-semibold">
            {service.number}
          </span>
          <div className="w-10 h-10 rounded-md bg-[#F5F5F2] border border-[#DCDCD7] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-[#F5F5F2] transition-colors duration-300">
            <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold font-display text-[#111111] group-hover:text-black">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#666666] leading-relaxed">
          {service.description}
        </p>

        {/* Features Checklist */}
        <ul className="space-y-2 pt-2">
          {service.features.map((feat) => (
            <li key={feat} className="text-xs text-[#666666] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom CTA Arrow Row */}
      <div className="pt-8 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn More
        </span>
        <div className="w-8 h-8 rounded-full border border-[#DCDCD7] group-hover:border-[#111111] flex items-center justify-center transition-all duration-300 group-hover:bg-[#111111] group-hover:text-white">
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#DCDCD7]/80">
      <SectionHeader
        eyebrow="OUR SERVICES"
        title="Everything You Need Under One Roof."
        description="We offer a complete range of digital solutions to help your business build, automate and grow."
      />

      {/* Grid of 6 Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {SERVICES_DATA.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};
