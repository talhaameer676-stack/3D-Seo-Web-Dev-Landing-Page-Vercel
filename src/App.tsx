import { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Play, 
  Zap, 
  Palette, 
  BarChart3, 
  Shield, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles,
  Layers,
  Search,
  RefreshCw,
  Home
} from 'lucide-react';
import { motion } from 'motion/react';

// Import Custom Subcomponents
import { BlurText } from './components/BlurText';
import { HlsVideo } from './components/HlsVideo';
import { BookingModal } from './components/BookingModal';
import { VideoModal } from './components/VideoModal';
import { RoiCalculator } from './components/RoiCalculator';
import { CapabilitiesChess } from './components/CapabilitiesChess';
import { FAQAccordion } from './components/FAQAccordion';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'open-booking') {
        setIsBookingOpen(true);
      } else if (event.data === 'scroll-services') {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      } else if (event.data === 'scroll-pricing') {
        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Local video paths mapped to the public directory
  const section5VideoSrc = "/videos/section4_how_it_works.mp4";
  const section8VideoSrc = "/videos/section8_calculator.mp4";
  const section11VideoSrc = "/videos/section11_analytics.mp4";
  const section12VideoSrc = "/videos/section12_stats.mp4";

  // Brand Film video modal source (the 6th part)
  const brandFilmSrc = "/videos/part6.mp4";

  const navLinks = [
    { label: "Home", href: "#home", icon: <Home className="w-4 h-4" />, gradientFrom: "#a955ff", gradientTo: "#ea51ff" },
    { label: "Services", href: "#services", icon: <Zap className="w-4 h-4" />, gradientFrom: "#56CCF2", gradientTo: "#2F80ED" },
    { label: "FAQ", href: "#faq", icon: <Sparkles className="w-4 h-4" />, gradientFrom: "#FF9966", gradientTo: "#FF5E62" }
  ];

  // FAQ Items
  const faqItems = [
    {
      question: "Do you require long-term contracts?",
      answer: "We believe in performance-driven partnerships. We operate on flexible monthly rolling terms with clear 30-day notice periods, aligning our incentives directly with your business growth."
    },
    {
      question: "How do you manage ad creatives?",
      answer: "Our AI systems scan your layout and competitor hooks to draft baseline variations. Our creative director and copywriters then refine, code, and polish these into premium assets. We launch, test, and replace creative variants weekly to prevent ad fatigue."
    },
    {
      question: "What platforms do you support?",
      answer: "We support full-funnel scaling across Meta (Facebook & Instagram), TikTok Ads, Google Search & Shopping (PMax), and Retention flows (Klaviyo for Email & SMS). All campaigns run through unified attribution tracking."
    },
    {
      question: "How does the free audit work?",
      answer: "Once you schedule your Meet Scaling Session, our system conducts a pre-call crawl of your page layout, pixel routing health, and active competitor creative hooks. During the 10-minute session, we present these findings as a direct, actionable scaling blueprint."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-body selection:bg-white selection:text-black">
      
      {/* SECTION 1 — NAVBAR (fixed) */}
      <header className="fixed top-4 left-0 right-0 w-full z-50 px-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between py-3 px-6 liquid-glass rounded-full border border-white/10 backdrop-blur-md">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <span className="font-heading italic text-2xl text-white tracking-tight leading-none group-hover:opacity-80 transition-opacity">
              CORACLICK
            </span>
            <span className="text-white/30 text-sm font-light select-none relative -top-[1px]">•</span>
            <div className="w-[320px] h-[26px] overflow-hidden flex items-center justify-start pointer-events-none relative -top-[1.5px]">
              <iframe
                src="/logo-cycle.html?theme=dark&dark=true"
                className="w-full h-full border-none bg-transparent"
                scrolling="no"
                title="Logo Cycle"
              />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  '--gradient-from': link.gradientFrom,
                  '--gradient-to': link.gradientTo,
                } as React.CSSProperties}
                className="relative w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center transition-all duration-500 hover:w-[110px] group cursor-pointer overflow-hidden decoration-none select-none"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] opacity-0 transition-all duration-500 group-hover:opacity-100" />
                {/* Glow effect */}
                <span className="absolute top-[2px] inset-x-0 h-full rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] blur-[8px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-60" />
                {/* Icon */}
                <span className="relative z-10 text-white/50 group-hover:scale-0 transition-all duration-300 ease-in-out flex items-center justify-center">
                  {link.icon}
                </span>
                {/* Label text */}
                <span className="absolute text-white font-body uppercase font-semibold text-[9px] tracking-widest transition-all duration-300 scale-0 group-hover:scale-100 ease-in-out whitespace-nowrap">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-black hover:bg-white/90 text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer border-none font-body"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/70 hover:text-white p-1 hover:bg-white/5 rounded-full border-none bg-transparent cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Nav Capsule Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 max-w-sm mx-auto liquid-glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-4 font-body">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-wider text-white/70 hover:text-white py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full bg-white text-black py-3 rounded-full text-sm font-medium flex items-center justify-center gap-1.5 transition-colors border-none cursor-pointer mt-2"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* SECTION 2 — HERO & BRAND SHOWCASE (VIDEOS STACK) */}
      <section id="home" className="relative w-full pt-20 bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle ambient light glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />


        {/* SECTION 3.0 — COSMIC PLASMA SHOWCASE (Joined in video stack) */}
        <div className="w-full overflow-hidden aspect-video relative shadow-[0_0_50px_rgba(255,255,255,0.02)] border-b border-white/10">
          <iframe
            src="https://cdn.21st.dev/dhileepkumargm/abstract-glassy-shader/default/bundle.1756989308830.html?theme=dark&dark=true"
            className="w-full h-full border-none opacity-80"
            title="Cosmic Plasma Animation"
          />
          {/* Soft overlay gradients for integration */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />

          {/* Floating Copy Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-4 font-mono">
              Section 3.0 • Neural Network
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-3xl sm:text-5xl md:text-6xl max-w-2xl">
              Predictive Scaling Engine
            </h2>
            <p className="font-body font-light text-white/60 text-xs md:text-sm max-w-md mt-4 leading-relaxed">
              Turn marketing data into clear profit. See exactly where your next customer comes from before you spend a single dollar.
            </p>
          </div>
        </div>

        {/* Separated How-it-Works Video Showcase - Edge-to-Edge */}
        <div className="w-full overflow-hidden aspect-video shadow-[0_0_50px_rgba(255,255,255,0.02)] relative border-b border-white/10">
          <HlsVideo 
            src={section5VideoSrc}
            className="w-full h-full object-cover"
          />
          {/* Vignette overlays */}
          <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* SECTION 2b — HERO & PROCESS CONTENT */}
      <section className="relative w-full pb-16 bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center pt-12">
          {/* Badge Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 mb-6"
          >
            <span className="bg-white text-black font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full leading-none">
              New
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/80 font-light">
              PREMIUM SEO, WEB DEV & PAID ACQUISITION SYSTEMS
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="font-heading italic text-white tracking-tight leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-[105px] max-w-3xl mb-6">
            <BlurText text="Scale Your Business Beyond Limits" delay={0.7} />
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-body font-light text-white/60 text-sm md:text-base max-w-xl mb-8 leading-relaxed"
          >
            We build lightning-fast web experiences, dominate search engine rankings, and scale paid acquisition funnels. Engineered for speed and compounding revenue growth.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full sm:w-auto bg-white text-black hover:bg-white/90 text-sm font-semibold px-8 py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-none font-body"
            >
              <span>Book Meet Scaling Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto text-white/70 hover:text-white text-sm font-medium px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer bg-transparent border-none font-body"
            >
              <Play className="w-4.5 h-4.5 fill-white/10" />
              <span>Watch the Film</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — PARTNERS BAR */}
      <section className="py-12 border-y border-white/5 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-light mb-8">
            Trusted by scaling businesses and marketing platforms
          </span>
          
          {/* Scrolling Marquee */}
          <div className="w-full relative overflow-hidden py-2 select-none">
            <div className="flex gap-24 whitespace-nowrap animate-marquee">
              {/* Loop 1 */}
              <div className="flex gap-24 items-center">
                {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((partner) => (
                  <span key={partner} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors cursor-default">
                    {partner}
                  </span>
                ))}
              </div>
              {/* Loop 2 for seamless scrolling */}
              <div className="flex gap-24 items-center">
                {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((partner) => (
                  <span key={`${partner}-clone`} className="text-3xl sm:text-4xl font-heading italic text-white/70 hover:text-white transition-colors cursor-default">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>
        </div>
      </section>


      {/* SECTION 4.5 — OUR SERVICES (Capabilities Image Showcase - Full Width) */}
      <section id="services" className="w-full bg-black border-b border-white/5 relative overflow-hidden">
        <div className="w-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.03)]">
          <img 
            src="/images/capabilities_row1 - Copy.jpg" 
            alt="Coraclick services and capabilities showcase" 
            className="w-full h-auto object-cover opacity-95"
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
        </div>
      </section>

      {/* SECTION 6 — DETAILED SERVICES (Services Grid) */}
      <section id="channels" className="py-24 bg-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-4 font-mono">
              Services
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl sm:text-5xl md:text-6xl">
              Performance marketing and web systems built for growth.
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="liquid-glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all group font-body flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Digital Marketing</h4>
                <p className="text-white/60 text-xs font-light leading-relaxed">
                  Acquire high-value customers predictably. We design and launch high-converting paid campaigns across Meta, Google, and TikTok that turn ad spend into profitable cashflow.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-[11px] text-white/40 group-hover:text-white/75 transition-colors">
                <span>Maximize ROAS</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all group font-body flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <Search className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Search Engine Optimization (SEO)</h4>
                <p className="text-white/60 text-xs font-light leading-relaxed">
                  Dominate search rankings. We build compounding organic visibility that positions your business in front of ready-to-buy customers, driving free traffic that scales every single month.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-[11px] text-white/40 group-hover:text-white/75 transition-colors">
                <span>Compounding organic leads</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="liquid-glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all group font-body flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <Layers className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Web Dev</h4>
                <p className="text-white/60 text-xs font-light leading-relaxed">
                  Storefronts engineered to sell. We design custom, ultra-fast headless landing pages and storefronts that load instantly, crush bounce rates, and turn more visitors into buyers.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-[11px] text-white/40 group-hover:text-white/75 transition-colors">
                <span>Convert more traffic</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="liquid-glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all group font-body flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <RefreshCw className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Retention Marketing</h4>
                <p className="text-white/60 text-xs font-light leading-relaxed">
                  Turn first-time buyers into loyal advocates. We construct automated email and SMS flows that save abandoned carts, welcome new subscribers, and drive repeat purchases on autopilot.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-[11px] text-white/40 group-hover:text-white/75 transition-colors">
                <span>Automate repeat sales</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS CONTENT */}
      <section id="process" className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
          {/* Centered copywriting text */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center font-body">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-6 font-mono">
              <span>How it works</span>
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl sm:text-5xl md:text-7xl mb-6">
              We analyze. We build. We scale.
            </h2>
            <p className="font-body font-light text-white/60 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
              We audit your site layout, reverse-engineer your competitors' winning funnels, and build optimized page experiences. Your scaling roadmap, executed in days—not quarters.
            </p>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-black hover:bg-white/90 text-xs uppercase tracking-widest font-semibold px-8 py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-none font-body"
            >
              <span>Request Free Audit</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CAPABILITIES CHESS (alternating rows) */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-4 font-mono">
              Capabilities & Services
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl sm:text-5xl md:text-6xl">
              High creatives. Zero friction.
            </h2>
          </div>

          <CapabilitiesChess />

        </div>
      </section>

      {/* SECTION 7.5 — HIGHLIGHT BUTTONS */}
      <section className="py-8 bg-black border-t border-white/5 relative overflow-hidden flex justify-center items-center">
        <div className="max-w-6xl mx-auto w-full px-4 flex justify-center">
          <iframe
            src="/highlight-button.html?theme=dark&dark=true"
            className="w-full h-[220px] sm:h-[140px] md:h-[80px] border-none overflow-hidden"
            scrolling="no"
            title="Highlight Buttons"
          />
        </div>
      </section>


      {/* SECTION 7.6 — TEXT CYCLE SHOWCASE with Particle Background */}
      <section className="py-8 bg-black border-t border-white/5 relative overflow-hidden flex justify-center items-center min-h-[200px]">
        {/* Particle Background Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <iframe
            src="/particle-bg.html?theme=dark&dark=true"
            className="w-full h-full border-none opacity-50"
            scrolling="no"
            title="Particle Background"
          />
          {/* Edge gradients for smooth blending */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
        {/* Text Cycle Foreground */}
        <div className="max-w-6xl mx-auto w-full px-4 flex justify-center relative z-10">
          <iframe
            src="/text-cycle.html?theme=dark&dark=true"
            className="w-full h-[160px] border-none overflow-hidden"
            scrolling="no"
            title="Text Cycle Animation"
          />
        </div>
      </section>


      {/* SECTION 8 — INTERACTIVE ROI CALCULATOR & PREVIEW */}
      <section id="calculator" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The ROI Calculator Card */}
            <RoiCalculator onOpenBooking={() => setIsBookingOpen(true)} />

            {/* Separated calculator simulation animation showcase - Joined side-by-side */}
            <div className="rounded-3xl border border-white/10 overflow-hidden relative shadow-[0_0_50px_rgba(255,255,255,0.02)] flex">
              <HlsVideo 
                src={section8VideoSrc}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
              <div className="absolute top-4 left-6 z-10 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                Real-time predictive dashboard simulation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FEATURES GRID & ANIMATED WORKSPACE */}
      <section className="py-24 bg-slate-950 border-t border-white/5 space-y-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-4 font-mono">
              Why Us
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl sm:text-5xl md:text-6xl">
              Built for the next era.
            </h2>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-body">
            <div className="liquid-glass rounded-2xl p-6 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white/70">
                <Zap className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-base font-medium text-white mb-2">Immediate Deploy</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Lightning-Fast Execution. We launch custom search campaigns, landing pages, and technical configurations in days, moving at the speed of your business.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white/70">
                <Palette className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-base font-medium text-white mb-2">Creative Dominance</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                High-Converting Creative. We design premium landing page assets and copy tailored for psychological alignment with your buyer's intent.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white/70">
                <BarChart3 className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-base font-medium text-white mb-2">ROAS Oriented</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Revenue over Vanity Metrics. We ignore empty clicks and focus strictly on bottom-line profit, cashflow margin, and true return on ad spend (ROAS).
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white/70">
                <Shield className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-base font-medium text-white mb-2">Safe Attribution</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Bulletproof Attribution. We implement server-side Conversion APIs (CAPI) to track 100% of customer journeys, bypassing ad blockers and iOS tracking limits.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Carousel Showcase - Edge-to-Edge */}
        <div className="w-full overflow-hidden relative border-y border-white/10 bg-transparent py-6">
          <iframe
            src="/testimonial-carousel.html?theme=dark&dark=true"
            className="w-full h-[600px] md:h-[420px] border-none overflow-hidden bg-transparent"
            scrolling="no"
            title="SEO, Web Dev & Digital Marketing Testimonial Carousel"
          />
        </div>
      </section>

      {/* SECTION 10-12 VIDEOS STACK */}
      <section className="bg-slate-950 border-t border-white/5 relative">
        {/* Founder Text Arc Showcase - Replacing Rotating Glass Cube */}
        <div className="w-full py-16 flex flex-col items-center justify-center relative border-b border-white/10 bg-black overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center mb-6 z-10">
            <span className="text-[10px] font-mono tracking-[0.2em] text-purple-400 uppercase">Leadership</span>
            <h3 className="text-2xl font-bold text-white mt-1">Founder & CEO</h3>
          </div>
          <iframe
            src="/founder-arc.html?theme=dark&dark=true"
            className="w-full h-[320px] max-w-lg border-none overflow-hidden bg-transparent z-10"
            scrolling="no"
            title="Founder Profile"
          />
          <div className="text-center mt-4 z-10 max-w-md px-4">
            <p className="text-white/60 text-sm font-light italic leading-relaxed">
              "Building next-gen digital experiences with absolute precision. Thanks for your trust."
            </p>
            <div className="w-12 h-[1px] bg-purple-500/20 mx-auto mt-4" />
          </div>
        </div>

        {/* Live Optimization Left/Right Videos Showcase */}
        <div className="w-full border-b border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left 3D Video Showcase */}
            <div className="rounded-3xl border border-white/10 overflow-hidden relative shadow-[0_0_50px_rgba(255,255,255,0.02)] flex aspect-video">
              <HlsVideo 
                src="/videos/section7_stats.mp4"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
              <div className="absolute bottom-4 left-6 z-10 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                Autonomous real-time bidding optimization loop
              </div>
            </div>

            {/* Right 3D Video Showcase */}
            <div className="rounded-3xl border border-white/10 overflow-hidden relative shadow-[0_0_50px_rgba(255,255,255,0.02)] flex aspect-video">
              <HlsVideo 
                src={section11VideoSrc}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
              <div className="absolute bottom-4 right-6 z-10 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                Decision engine live attribution logs streaming
              </div>
            </div>
          </div>
        </div>

        {/* Separated Stats loop video - Edge-to-Edge at bottom of video stack */}
        <div className="w-full overflow-hidden aspect-video relative shadow-[0_0_50px_rgba(255,255,255,0.02)] border-b border-white/15">
          <HlsVideo 
            src={section12VideoSrc}
            style={{ filter: 'saturate(0)' }}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />
        </div>
      </section>

      {/* SECTION 10-12 TEXT CONTENT STACK */}
      <section className="py-24 bg-slate-950 border-t border-white/5 space-y-24">
        {/* Workflow Text Content */}
        <div className="max-w-6xl mx-auto px-4 font-body">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-4 font-mono">
              Workflow
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl sm:text-5xl md:text-6xl mb-6">
              Our daily optimization engine.
            </h2>
          </div>

          {/* Pipeline Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="relative group">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-2xl font-semibold text-white/20 group-hover:text-white transition-colors">01</span>
                <div className="h-px bg-white/15 grow" />
              </div>
              <h4 className="text-base font-medium text-white mb-2">Pre Audit</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                We conduct a comprehensive pre-campaign crawl of your historical metrics, pixel integrity, and competitor hooks to identify immediate opportunities.
              </p>
            </div>

            <div className="relative group">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-2xl font-semibold text-white/20 group-hover:text-white transition-colors">02</span>
                <div className="h-px bg-white/15 grow" />
              </div>
              <h4 className="text-base font-medium text-white mb-2">Meeting</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                We host a strategic alignment call to present our pre-audit blueprint, finalize performance milestones, and synchronize on business guardrails.
              </p>
            </div>

            <div className="relative group">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-2xl font-semibold text-white/20 group-hover:text-white transition-colors">03</span>
                <div className="h-px bg-white/15 grow" />
              </div>
              <h4 className="text-base font-medium text-white mb-2">Payment Gateway</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Secure integration of payment protocols and billing transparently. We establish clear professional terms centered on value delivery and mutual ROI.
              </p>
            </div>

            <div className="relative group">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-2xl font-semibold text-white/20 group-hover:text-white transition-colors">04</span>
                <div className="h-px bg-white/15 grow" />
              </div>
              <h4 className="text-base font-medium text-white mb-2">Journey</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Execution begins. We deploy scaling capital, push fresh creative assets weekly, and optimize account bidding parameters to sustain long-term growth.
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics Text Content */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center flex flex-col items-center mb-16 font-body">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-4 font-mono">
              Performance Metrics
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl sm:text-5xl md:text-6xl mb-6">
              Our metrics speak for themselves.
            </h2>
          </div>

          {/* Separate clean grid for stats counts */}
          <div className="max-w-5xl mx-auto liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center font-body">
            <div className="flex flex-col items-center">
              <span className="font-heading italic text-5xl md:text-6xl text-white tracking-tight leading-none mb-2">3.4x</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-light">Average ROAS</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-heading italic text-5xl md:text-6xl text-white tracking-tight leading-none mb-2">98%</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-light">Client retention</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-heading italic text-5xl md:text-6xl text-white tracking-tight leading-none mb-2">$50M+</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-light">Revenue generated</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-heading italic text-5xl md:text-6xl text-white tracking-tight leading-none mb-2">24h</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-light">Onboarding setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14 — TESTIMONIALS */}
      <section id="work" className="py-24 bg-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-4 font-mono">
              Feedback
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl sm:text-5xl md:text-6xl">
              Take our word for it.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body">
            <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between min-h-[200px]">
              <p className="text-white/70 text-xs font-light leading-relaxed mb-6">
                “Coraclick's decision engine changed how I allocate ad spend. Automated channel balancing reduced my CAC by 40% and freed up my internal team's bandwidth.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-heading italic text-white font-bold">
                  S
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Sarah Chen</h5>
                  <span className="text-[10px] text-white/40">CEO, Luminary Corp</span>
                </div>
              </div>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between min-h-[200px]">
              <p className="text-white/70 text-xs font-light leading-relaxed mb-6">
                “The server-side attribution setup saved my marketing targets post iOS-14 changes. Scaling ad variants is now extremely fast and completely accurate.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-heading italic text-white font-bold">
                  M
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Marcus Webb</h5>
                  <span className="text-[10px] text-white/40">Head of Growth, Arcline</span>
                </div>
              </div>
            </div>

            <div className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between min-h-[200px]">
              <p className="text-white/70 text-xs font-light leading-relaxed mb-6">
                “The ROI calculations they mapped on my pre-call audit aligned exactly with what I achieved in campaign month two. Highly recommend the Meet Scaling Session.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-heading italic text-white font-bold">
                  E
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Elena Voss</h5>
                  <span className="text-[10px] text-white/40">Brand Director, Helix Inc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15 — FAQ ACCORDION */}
      <section id="faq" className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
        {/* Lamp Background Animation */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <iframe
            src="/lamp-bg.html?theme=dark&dark=true"
            className="w-full h-full border-none opacity-40"
            title="Lamp Background"
          />
          {/* Edge gradients for smooth integration */}
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
          <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/50 bg-white/5 border border-white/10 mb-4 font-mono">
              FAQs
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl sm:text-5xl md:text-6xl">
              Your questions, answered.
            </h2>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* SECTION 16 — CTA FOOTER */}
      <section className="py-24 bg-slate-950 border-t border-white/5 flex flex-col items-center justify-center relative overflow-hidden min-h-[700px]">
        {/* Widescreen CTA Background Paper Shaders Showcase */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <iframe
            src="https://cdn.21st.dev/muhammadnadeemmn9485134/background-paper-shaders/default/bundle.1755685936907.html?theme=dark&dark=true"
            className="w-full h-full border-none opacity-30"
            title="Background Paper Shaders"
          />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
          <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#0c0618] via-[#110a1f]/80 to-transparent pointer-events-none" />
          {/* Subtle purple/indigo ambient glow at the very bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(88, 28, 135, 0.08), rgba(67, 56, 202, 0.04), transparent)' }} />
        </div>

        {/* CTA Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center justify-center grow pt-24 pb-16">
          <h2 className="font-heading italic text-white tracking-tight leading-[0.85] text-5xl sm:text-7xl md:text-8xl mb-6">
            Want to make scale inevitable?
          </h2>
          
          <p className="font-body font-light text-white/60 text-sm md:text-base max-w-lg mb-10 leading-relaxed">
            Most businesses guess their way to scaling. We build the inevitable growth systems that capture lost revenue. Secure your free 15-minute scaling session below.
          </p>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-white text-black hover:bg-white/90 text-sm font-semibold px-8 py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-none font-body animate-bounce"
          >
            <span>Request Free Audit</span>
            <ArrowUpRight className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Footer Area */}
        <div className="relative z-10 w-full px-4 mt-auto">
          {/* Glowing Background Blobs */}
          <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden rounded-2xl">
            <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
          </div>

          <div className="liquid-glass relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12 z-10">
            {/* Logo, animation, and brief */}
            <div className="flex flex-col items-center md:items-start max-w-sm">
              <div className="mb-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a href="#home" className="flex items-center gap-1.5 group select-none">
                  <span className="font-heading italic text-2xl text-white tracking-tight leading-none">CORACLICK</span>
                  <span className="text-white/30 text-sm font-light relative -top-[1px]">•</span>
                  <div className="w-[130px] h-[24px] overflow-hidden flex items-center justify-start pointer-events-none relative -top-[1px]">
                    <iframe
                      src="/logo-cycle.html?theme=dark&dark=true"
                      className="w-full h-full border-none bg-transparent"
                      scrolling="no"
                      title="Logo Cycle Footer"
                    />
                  </div>
                </a>

                {/* Animated booking button next to logo */}
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-4 py-1.5 bg-white text-black text-[10px] uppercase tracking-widest font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95 cursor-pointer border-none font-body"
                >
                  Book scaling session
                </button>
              </div>

              <p className="text-white/60 mb-4 text-center md:text-left text-xs font-body font-light leading-relaxed">
                CORACLICK is an elite client acquisition partner. We combine deep copywriting, consumer psychology, and search engine optimization to build predictable scale engines for ambitious services businesses.
              </p>
            </div>

            {/* Navigation Columns */}
            <nav className="flex w-full flex-col gap-8 text-center sm:flex-row sm:justify-around md:w-auto md:flex-row md:justify-end md:gap-16 md:text-left font-body">
              {/* Column 1: Services */}
              <div className="min-w-[120px]">
                <div className="mb-3 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                  Services
                </div>
                <ul className="space-y-2 text-xs font-light">
                  <li>
                    <a href="#services" className="text-white/60 hover:text-white transition-colors">Paid Ads Scaling</a>
                  </li>
                  <li>
                    <a href="#services" className="text-white/60 hover:text-white transition-colors">SEO Growth Engines</a>
                  </li>
                  <li>
                    <a href="#services" className="text-white/60 hover:text-white transition-colors">CRO & Funnel Optimization</a>
                  </li>
                  <li>
                    <a href="#services" className="text-white/60 hover:text-white transition-colors">Attribution & Retention</a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Company */}
              <div className="min-w-[120px]">
                <div className="mb-3 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                  Company
                </div>
                <ul className="space-y-2 text-xs font-light">
                  <li>
                    <a href="#services" className="text-white/60 hover:text-white transition-colors">About Us</a>
                  </li>
                  <li>
                    <a
                      href="#home"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Our team is expanding. Send your portfolio to talhaameer625@gmail.com!");
                      }}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#home"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsBookingOpen(true);
                      }}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Copyright Area */}
          <div className="relative z-10 mt-8 mb-4 text-center font-body font-light text-white/30">
            <span className="text-[10px]">© 2026 Coraclick. All rights reserved.</span>
            <div className="mt-2">
              <a href="mailto:talhaameer625@gmail.com" className="text-[10px] text-white/25 hover:text-white/50 transition-colors">talhaameer625@gmail.com</a>
            </div>
          </div>

          {/* Bottom ambient purple/indigo glow - prevents pure black ending */}
          <div className="absolute bottom-0 left-0 right-0 h-[180px] pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(88, 28, 135, 0.12), rgba(67, 56, 202, 0.06) 40%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[80px] rounded-full bg-purple-500/5 blur-[60px] pointer-events-none z-[1]" />
        </div>
      </section>

      {/* MODALS */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoSrc={brandFilmSrc} 
      />

    </div>
  );
}
