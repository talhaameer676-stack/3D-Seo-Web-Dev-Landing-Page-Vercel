import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Cpu, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';

export const CapabilitiesChess: React.FC = () => {
  const [ctr, setCtr] = useState<number>(2.4);
  const [activeTab, setActiveTab] = useState<'meta' | 'tiktok' | 'google'>('meta');

  useEffect(() => {
    const timer = setInterval(() => {
      setCtr(prev => {
        if (prev >= 4.8) return 2.4;
        return Number((prev + 0.1).toFixed(2));
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Row 1: Text Left, Visual Right */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2 font-body">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs mb-6">
            <Cpu className="w-3.5 h-3.5 text-white/50" />
            <span>Web Dev & SEO Integration</span>
          </div>
          
          <h3 className="font-heading italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[0.9] mb-6">
            High-Performance Code. Ranked to scale.
          </h3>
          
          <p className="font-body font-light text-white/60 text-base leading-relaxed mb-8 max-w-lg">
            We build blazing-fast headless web architectures integrated with enterprise-grade SEO frameworks. By optimizing page speeds, semantic tags, and site architecture, we ensure your site ranks on page 1 of Google and turns organic traffic into customers.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div>
              <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1">Average Speed Index</span>
              <span className="text-2xl font-semibold text-white">99+ performance</span>
            </div>
            <div>
              <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1">Organic Leads Lift</span>
              <span className="text-2xl font-semibold text-white">+240% increase</span>
            </div>
          </div>
        </div>

        {/* Visual 1: CTR Dashboard Mockup */}
        <div className="w-full lg:w-1/2">
          <div className="liquid-glass rounded-3xl p-6 border border-white/10 relative overflow-hidden aspect-video flex flex-col justify-between group">
            {/* Background premium asset image */}
            <img 
              src="/images/capabilities_row1.jpg" 
              alt="Dynamic website layout audit" 
              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-white/60" />
                <span className="text-xs font-mono text-white/60">Creative CTR Performance</span>
              </div>
              <div className="flex gap-1.5">
                {['meta', 'tiktok', 'google'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono border transition-colors cursor-pointer ${
                      activeTab === tab ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-white/40 border-transparent hover:text-white/60'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-3 gap-4 grow items-center relative">
              {/* SVG Line Graph */}
              <div className="col-span-2 relative h-36 bg-white/[0.01] border border-white/5 rounded-xl p-4 overflow-hidden flex items-end">
                <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="border-b border-white/[0.03] w-full" />
                  ))}
                </div>
                
                {/* Visual Chart Curve */}
                <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area */}
                  <path
                    d="M 0 90 Q 40 70 80 50 T 160 30 L 200 10 L 200 100 L 0 100 Z"
                    fill="url(#chartGlow)"
                  />
                  
                  {/* Curve Line */}
                  <motion.path
                    d="M 0 90 Q 40 70 80 50 T 160 30 L 200 10"
                    fill="none"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
                  />
                  
                  {/* Floating pulse point */}
                  <circle cx="200" cy="10" r="3" fill="#ffffff" />
                  <circle cx="200" cy="10" r="8" fill="none" stroke="#ffffff" strokeWidth="1" className="animate-ping" />
                </svg>
                
                <span className="text-[10px] text-white/40 absolute bottom-2 left-3 font-mono">Hook variant deployment</span>
                <span className="text-[10px] text-emerald-400 absolute top-2 right-3 font-mono flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> Optimizing
                </span>
              </div>

              {/* CTR Dial Gauge */}
              <div className="col-span-1 flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/5 rounded-xl h-36">
                <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-2 font-mono">Dynamic CTR</span>
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Circle SVG */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#ffffff"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - ctr / 6)}
                      className="transition-all duration-100 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-lg font-mono font-medium text-white">{ctr}%</span>
                    <span className="text-[9px] text-white/40 leading-none">Auto-Opt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Visual Left, Text Right (lg:flex-row-reverse) */}
      <div className="flex flex-col lg:flex-row lg:flex-row-reverse items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2 font-body">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs mb-6">
            <BarChart2 className="w-3.5 h-3.5 text-white/50" />
            <span>Omnichannel Paid Acquisition</span>
          </div>

          
          <h3 className="font-heading italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[0.9] mb-6">
            Conversion Funnels. No wasted ad spend.
          </h3>
          
          <p className="font-body font-light text-white/60 text-base leading-relaxed mb-8 max-w-lg">
            We engineer premium digital marketing funnels and high-converting paid ad campaigns across Meta, Google, and TikTok. Backed by automated budget allocation and rigorous ad-hook testing, we maximize your ROAS while cutting customer acquisition costs (CAC).
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5 font-body">
            <div>
              <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1">Attribution Accuracy</span>
              <span className="text-2xl font-semibold text-white">100% CAPI Tracking</span>
            </div>
            <div>
              <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1">Average Client ROAS</span>
              <span className="text-2xl font-semibold text-white">3.4x average</span>
            </div>
          </div>
        </div>

        {/* Visual 2: Real-time optimization visual */}
        <div className="w-full lg:w-1/2">
          <div className="liquid-glass rounded-3xl border border-white/10 overflow-hidden aspect-video relative group">
            <img 
              src="/images/section7img.jpeg" 
              alt="Real-time optimization dashboard" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
