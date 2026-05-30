# MASTER SPECIFICATION PROMPT: PREMIUM 3D LANDING PAGE

Copy and paste this entire prompt into a fresh Antigravity agent chat to recreate the exact premium dark-mode 3D Landing Page with fully integrated interactive dashboards, widgets, local asset references, custom canvas animations, HLS players, and WhatsApp-integrated booking portals.

---

## 1. TECHNICAL STACK & OVERVIEW
Build a premium, dark-mode, Apple-inspired 3D landing page for an elite client acquisition partner agency (**CORACLICK** / **ZWELIO**) utilizing the following stack:
* **Core:** React, Vite, TypeScript, Tailwind CSS, Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-slider`, `@radix-ui/react-accordion`).
* **Animations:** `motion` (framer-motion).
* **Icons:** `lucide-react`.
* **Video Streaming:** `hls.js` with native Safari HTTP Live Streaming fallback.
* **Backgrounds & Shaders:** Embedded 3D shaders, WebGL particle systems, and canvas canvas animations loaded via transparent iFrames from the `public/` directory and remote `21st.dev` CDNs.

---

## 2. DESIGN SYSTEM & BASE CONFIGURATION

### A. CSS Variable tokens (`src/index.css`)
Configure the premium dark-theme variable set inside `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 213 45% 67%;
  --foreground: 0 0% 100%;
  --primary: 0 0% 100%;
  --primary-foreground: 213 45% 67%;
  --border: 0 0% 100% / 0.2;
  --radius: 9999px;
  --font-heading: 'Instrument Serif', serif;
  --font-body: 'Barlow', sans-serif;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
  background-color: #000000;
  color: #ffffff;
}

body {
  background-color: #000000;
  margin: 0;
  font-family: var(--font-body);
}
```

### B. Tailwind Configuration (`tailwind.config.js`)
Extend fonts, custom marquee animations, and Radix accordion keyframes:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"],
      },
      colors: {
        border: "hsla(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### C. Liquid Glass Utility Styles (in `src/index.css`)
Implement custom glassmorphic properties with border gradient masks under `@layer components`:
```css
@layer components {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
      rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .liquid-glass-strong {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(50px);
    border: none;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass-strong::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 20%,
      rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
      rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.5) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

---

## 3. CORE CUSTOM REACT COMPONENTS

### Component 1: `HlsVideo.tsx`
Renders video stream files (.mp4 or .m3u8 playlists) using HLS.js with fallback support:
```typescript
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export const HlsVideo: React.FC<HlsVideoProps> = ({ src, className = "", style }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (src.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({ maxMaxBufferLength: 10 });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch((e) => console.log("Hls autoplay blocked:", e));
        });
        return () => hls.destroy();
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.play().catch((e) => console.log("Native Hls autoplay blocked:", e));
      }
    } else {
      video.src = src;
      video.play().catch((e) => console.log("Standard autoplay blocked:", e));
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover pointer-events-none select-none ${className}`}
      style={style}
      muted
      playsInline
      loop
      autoPlay
    />
  );
};
```

### Component 2: `BlurText.tsx`
Splits a line of text by words and animates each word upwards with a blur-to-clear ease-out effect:
```typescript
import React from 'react';
import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            ease: [0.16, 1, 0.3, 1] // Premium easeOutExpo
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
```

### Component 3: `BookingModal.tsx`
Renders a Radix Dialog popup offering a 5-10 minute scaling session. When submitted, fields are validated and formatted into a structured message, redirecting the user to WhatsApp (`+923343194542`):
```typescript
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Calendar, Video, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim() || 'No message provided';

    const baseText = `Hello Talha, I would like to book a Zoom scaling session with you.\n\nHere are my booking details:\n• Name: ${name}\n• Email: ${email}\n• Message: ${message}\n\nPlease let me know your availability!`;
    const whatsappUrl = `https://wa.me/923343194542?text=${encodeURIComponent(baseText)}`;

    window.open(whatsappUrl, '_blank');
    setIsSuccess(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 overflow-y-auto z-[101] flex items-center justify-center p-4">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="w-full max-w-lg liquid-glass-strong rounded-3xl p-8 text-white relative focus:outline-none"
                >
                  <Dialog.Close asChild>
                    <button className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors rounded-full p-2 hover:bg-white/5 border-none cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Dialog.Title className="font-heading italic text-3xl md:text-4xl text-white mb-2 leading-none">
                          Book a Quick Meet Scaling Session
                        </Dialog.Title>
                        <Dialog.Description className="font-body font-light text-white/60 text-sm mb-6">
                          Claim your free 5-10 minute scaling session. We'll map out a direct growth pipeline.
                        </Dialog.Description>
                        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 font-body text-sm font-light text-white/80">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4.5 h-4.5 text-white/50" />
                            <span>5 - 10 Minutes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="w-4.5 h-4.5 text-white/50" />
                            <span>Google Meet / Video Conference</span>
                          </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 font-body">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1.5 font-medium">Name</label>
                            <input
                              type="text" required value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Sarah Chen"
                              className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1.5 font-medium">Email Address</label>
                            <input
                              type="email" required value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="sarah@luminary.com"
                              className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1.5 font-medium">Message (Optional)</label>
                            <textarea
                              rows={3} value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Tell us about your budget & goals..."
                              className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                            />
                          </div>
                          <button
                            type="submit" disabled={isSubmitting}
                            className="w-full bg-white text-black hover:bg-white/90 disabled:bg-white/50 text-sm font-medium py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer border-none font-body"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                              <>
                                <Calendar className="w-4 h-4" />
                                <span>Schedule Meet Scaling Session</span>
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-8 font-body flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-6">
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="font-heading italic text-3xl text-white mb-2 leading-none">Meeting Requested!</h3>
                        <p className="font-body font-light text-white/60 text-sm max-w-sm mb-8 leading-relaxed">
                          We've received your request! A calendar invitation will be sent to your email shortly.
                        </p>
                        <button onClick={() => { setIsSuccess(false); onClose(); }} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-full text-white border border-white/10 transition-colors cursor-pointer">
                          Done
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
```

### Component 4: `RoiCalculator.tsx`
Renders an interactive calculator with Radix Slider controls dynamically outputting click volume, conversion counts (based on a 3% Conversion Rate), sliding ROAS scales, and net growth revenue:
```typescript
import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { ArrowUpRight, DollarSign, MousePointerClick, Users, TrendingUp } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBooking }) => {
  const [budget, setBudget] = useState<number>(10000);

  const averageCpc = 0.85;
  const convRate = 0.03;

  const estimatedClicks = Math.round(budget / averageCpc);
  const estimatedConversions = Math.round(estimatedClicks * convRate);

  // Scaling efficiency multiplier simulating ad optimization at high spend levels
  const roas = Number((3.0 + (budget / 100000) * 1.5).toFixed(2));
  const totalRevenue = budget * roas;
  const netRevenue = totalRevenue - budget;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full max-w-4xl mx-auto liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 relative z-10">
        <div className="lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-end mb-6 font-body">
              <div>
                <span className="text-4xl md:text-5xl font-heading italic text-white leading-none">
                  {formatCurrency(budget)}
                </span>
              </div>
              <span className="text-sm font-light text-white/60">CPC Estimate: $0.85</span>
            </div>
            <div className="py-6">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                value={[budget]} onValueChange={(val) => setBudget(val[0])}
                max={100000} min={1000} step={1000}
              >
                <Slider.Track className="bg-white/10 relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-white rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-6 h-6 bg-white rounded-full shadow-lg border border-white/50 focus:outline-none transition-transform active:scale-110" />
              </Slider.Root>
              <div className="flex justify-between text-xs font-body text-white/30 mt-3 font-light">
                <span>$1,000 / mo</span>
                <span>$50,000 / mo</span>
                <span>$100,000 / mo</span>
              </div>
            </div>
          </div>
          <div className="mt-8 font-body">
            <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4.5 h-4.5 text-white/80" />
              Scale efficiency scaling enabled
            </h4>
            <p className="text-white/50 text-xs font-light leading-relaxed max-w-md">
              At higher budgets, our predictive AI algorithms optimize bid distribution across networks to compound click volume and boost ROAS.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-6 font-body">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <MousePointerClick className="w-4.5 h-4.5 text-white/80" />
              </div>
              <div>
                <span className="text-xs text-white/40 block uppercase tracking-wider font-light">Estimated Clicks</span>
                <span className="text-xl font-medium text-white">{estimatedClicks.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <Users className="w-4.5 h-4.5 text-white/80" />
              </div>
              <div>
                <span className="text-xs text-white/40 block uppercase tracking-wider font-light">Projected Conversions</span>
                <span className="text-xl font-medium text-white">
                  {estimatedConversions.toLocaleString()} <span className="text-xs text-white/40 font-light">(at 3% CR)</span>
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <TrendingUp className="w-4.5 h-4.5 text-white/80" />
              </div>
              <div>
                <span className="text-xs text-white/40 block uppercase tracking-wider font-light">Estimated ROAS</span>
                <span className="text-xl font-medium text-white">{roas}x</span>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                <DollarSign className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <span className="text-xs text-white/40 block uppercase tracking-wider font-light">Net Growth Revenue</span>
                <span className="text-2xl font-semibold text-white">{formatCurrency(netRevenue)}</span>
              </div>
            </div>
          </div>
          <button onClick={onOpenBooking} className="w-full bg-white text-black hover:bg-white/90 text-sm font-medium py-3 rounded-full flex items-center justify-center gap-1.5 mt-8 transition-colors cursor-pointer border-none font-body">
            <span>Claim This Growth Plan</span>
            <ArrowUpRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
```

### Component 5: `LiveAnalytics.tsx`
Renders an interactive mock optimization console. Key stats fluctuate every 4 seconds, appending descriptive real-time bid adjustments, A/B creative variants, and system server tracking events into a terminal simulator window:
```typescript
import React, { useState, useEffect } from 'react';
import { Terminal, Activity, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LogEntry {
  id: number;
  time: string;
  channel: 'Meta' | 'Google' | 'TikTok' | 'Retention' | 'AI System';
  message: string;
  type: 'success' | 'info' | 'warn';
}

export const LiveAnalytics: React.FC = () => {
  const [cpa, setCpa] = useState<number>(12.45);
  const [convRate, setConvRate] = useState<number>(3.42);
  const [spent, setSpent] = useState<number>(14250.50);
  const [roas, setRoas] = useState<number>(3.84);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, time: '01:35:12', channel: 'AI System', message: 'Competitor layout audit complete. Scaling bid hooks for meta-campaigns.', type: 'info' },
    { id: 2, time: '01:35:28', channel: 'Meta', message: 'Hook-variant [B] outperformed A by 42%. Disabling Hook A.', type: 'success' },
    { id: 3, time: '01:36:01', channel: 'Google', message: 'Search intent bid adjusted: bidding up on high-value terms.', type: 'info' },
    { id: 4, time: '01:36:15', channel: 'TikTok', message: 'CTR spike detected (4.8%). Auto-budget scaling +25% active.', type: 'success' },
    { id: 5, time: '01:36:44', channel: 'Retention', message: 'Smart SMS flow triggered. Cart recovery cart size >$150.', type: 'success' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpa(prev => Number((prev + (Math.random() * 0.4 - 0.2)).toFixed(2)));
      setConvRate(prev => Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)));
      setSpent(prev => prev + Math.random() * 15.5);
      setRoas(prev => Number((prev + (Math.random() * 0.06 - 0.03)).toFixed(2)));

      const channels: LogEntry['channel'][] = ['Meta', 'Google', 'TikTok', 'Retention', 'AI System'];
      const actions = [
        { msg: 'Bid adjusted in real-time to match conversion efficiency.', type: 'info' as const },
        { msg: 'A/B landing page test variant compiled and deployed.', type: 'success' as const },
        { msg: 'Server-side tracking validated: 100% attribution match.', type: 'success' as const },
        { msg: 'Bidding budget rebalanced from low-performing visual variants.', type: 'info' as const },
        { msg: 'ROAS threshold reached. Safe Scaling active.', type: 'success' as const }
      ];
      
      const randomChannel = channels[Math.floor(Math.random() * channels.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      setLogs(prev => [
        {
          id: Date.now(),
          time: timeStr,
          channel: randomChannel,
          message: `[${randomChannel}] ${randomAction.msg}`,
          type: randomAction.type
        },
        ...prev.slice(0, 7)
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 font-body relative overflow-hidden">
      <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-white/80 uppercase tracking-widest">LIVE DECISION ENGINE Active</span>
        </div>
        <div className="flex items-center gap-1 text-white/40 text-xs">
          <Activity className="w-3.5 h-3.5" />
          <span>Real-time optimization logs</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1 font-light">Cost Per Acquisition (CPA)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">${cpa.toFixed(2)}</span>
              <span className="text-[10px] text-emerald-400 font-light">-14.2% today</span>
            </div>
            <div className="absolute top-4 right-4 text-white/10"><TrendingUp className="w-5 h-5" /></div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1 font-light">Conversion Rate (CVR)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{convRate.toFixed(2)}%</span>
              <span className="text-[10px] text-emerald-400 font-light">+0.8% auto-opt</span>
            </div>
            <div className="absolute top-4 right-4 text-white/10"><Sparkles className="w-5 h-5" /></div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1 font-light">Budget Deployed (Today)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent)}
              </span>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1 font-light">Current Network ROAS</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{roas.toFixed(2)}x</span>
              <span className="text-[10px] text-emerald-400 font-light">Efficient Scale</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-black/60 rounded-2xl border border-white/5 overflow-hidden flex flex-col h-[320px]">
          <div className="bg-white/[0.03] px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-white/50" />
              <span className="text-xs text-white/60 font-mono">coraclick-optimization-daemon.sh</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="p-4 overflow-y-auto font-mono text-xs space-y-2.5 grow flex flex-col-reverse select-none">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  className="flex items-start gap-2.5 border-b border-white/[0.02] pb-1.5"
                >
                  <span className="text-white/30 shrink-0">{log.time}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] leading-none shrink-0 font-medium ${
                    log.channel === 'Meta' ? 'bg-blue-500/10 text-blue-400' :
                    log.channel === 'Google' ? 'bg-orange-500/10 text-orange-400' :
                    log.channel === 'TikTok' ? 'bg-pink-500/10 text-pink-400' :
                    log.channel === 'Retention' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-white/10 text-white'
                  }`}>
                    {log.channel}
                  </span>
                  <span className="text-white/80 break-words leading-normal">{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 4. DESIGN RULES & BRAND DETAILS

### Branding Inconsistency
* **Tab/Page Title (`index.html`):** Renders `"ZWELIO | Premium AI-Powered Growth Marketing Agency"`.
* **On-Page Assets (Navbar, Footer, Logo):** Standardizes on `"CORACLICK"`. Use `"CORACLICK"` for the header/footer markup, while leaving `"ZWELIO"` in the meta headers of `index.html`.

### Footer Ambient Glow
Replaces flat black endings with a warm radial purple/indigo background glow. Mailto link `talhaameer625@gmail.com` must be present next to the copyright:
```typescript
{/* Ambient purple/indigo glow */}
<div className="absolute bottom-0 left-0 right-0 h-[180px] pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(88, 28, 135, 0.12), rgba(67, 56, 202, 0.06) 40%, transparent 70%)' }} />
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[80px] rounded-full bg-purple-500/5 blur-[60px] pointer-events-none z-[1]" />
```

---

## 5. COMPONENT CHESS SECTIONS & LAYOUTS

### Column Chess (`CapabilitiesChess.tsx`)
Create two dynamic columns:
1. **Row 1 (Web Dev / SEO):** Text left containing SEO increase stats (`Organic Leads Lift +240%`), visual layout right containing a customized SVG chart curve alongside a reactive CTR progress circle.
2. **Row 2 (Omnichannel Paid Acquisition):** Image left displaying a static optimization grid (`public/images/section7img.jpeg`), and text right detailing ROAS scaling parameters (`3.4x average client ROAS`).

---

## 6. TRANS-CANVAS & IFRAME 3D WIDGETS

Integrate exactly **10 iframes** loading custom Canvas, WebGL shaders, or SVG vector systems from the `public/` directory or CDN links. All parent containers must set `pointer-events-none` to protect overlay layouts.

| Widget | Purpose | Source / URL | Container Size / Positioning |
| :--- | :--- | :--- | :--- |
| **Logo Cycle (Header)** | Text header cycle | `/logo-cycle.html?theme=dark&dark=true` | `w-[320px] h-[26px]` |
| **Cosmic Plasma Showcase** | Widescreen Glass shader | `https://cdn.21st.dev/dhileepkumargm/abstract-glassy-shader/default/bundle.1756989308830.html?theme=dark&dark=true` | `w-full overflow-hidden aspect-video` |
| **Highlight Buttons** | Core page navigation buttons | `/highlight-button.html?theme=dark&dark=true` | `w-full h-[220px] sm:h-[140px] md:h-[80px]` |
| **Particle Background** | Ambient background stars | `/particle-bg.html?theme=dark&dark=true` | `absolute inset-0 w-full h-full opacity-50` |
| **Text Cycle Foreground** | Additional text slider | `/text-cycle.html?theme=dark&dark=true` | `w-full h-[160px] relative z-10` |
| **Testimonial Carousel** | Endless sliding reviews | `/testimonial-carousel.html?theme=dark&dark=true` | `w-full h-[600px] md:h-[420px]` |
| **Founder Text Arc** | Curved typography around photo | `/founder-arc.html?theme=dark&dark=true` | `w-full h-[320px] max-w-lg` |
| **Lamp Background** | Glow effect for FAQ | `/lamp-bg.html?theme=dark&dark=true` | `absolute inset-0 w-full h-full opacity-40` |
| **Widescreen CTA Shaders** | CTA Background layer | `https://cdn.21st.dev/muhammadnadeemmn9485134/background-paper-shaders/default/bundle.1755685936907.html?theme=dark&dark=true` | `absolute inset-0 w-full h-full opacity-30` |
| **Logo Cycle (Footer)** | Footer header cycle | `/logo-cycle.html?theme=dark&dark=true` | `w-[130px] h-[24px]` |

---

## 7. CRITICAL ARCHITECTURAL GOTCHAS & SOLUTIONS

### A. Vapour Text Rendering Legibility Fix (Important!)
* **The Issue:** Rendering static text strictly as canvas particles (discrete dots) in `logo-cycle.html` makes the small 13px navbar font look extremely pixelated and unreadable.
* **The Solution:** In the canvas update loop, implement a hybrid rendering system:
  * When the animation state is `"static"` or `"waiting"`, bypass the particle drawing loop and draw the text string directly onto the canvas as smooth vector text using `ctx.fillText(text, x, y)`.
  * When transitioning (`"vaporizing"`), clear the canvas text and animate the particles dissolving.
  * When fading the next text in (`"fadingIn"`), render the fading particles and transition immediately to smooth `fillText` text once loaded (`"waiting"`).
  * Align the canvas alignment bounds (`q === "left"` starting at `0`) to guarantee the vector text aligns perfectly with the particle coordinates.
* **Small Font Configuration:** Set custom settings `spread: 3` and `density: 3` to keep particle clouds tight, crisp, and high-density around the 13px text boundary.

### B. Windows Execution Policies
* To bypass PowerShell execution policy restrictions when compiling locally (like `npm.ps1 cannot be loaded`), always prefix terminal scripts with command-line interpreters:
  `cmd /c npm run build` or `cmd /c npm run dev`.

### C. Relative Paths inside HTML iframes
* HTML resources loaded inside public iframes (`/founder-arc.html`, etc.) must reference public relative scripts (`src="founder-arc.js"`) and images (`src="images/founder.png"`) directly. Never import React source components (`/src/...`) inside isolated iframe html pages.

---

## 8. RESOURCE & ASSET LIBRARIES

### A. Active Assets (Loaded locally)
* **Hero Background Video:** `/videos/section2_hero.mp4` (Source: `https://cdn.dribbble.com/userupload/46542927/file/2834df11d746515a2377d18b333ac7a5.mp4`)
* **How It Works Video:** `/videos/section4_how_it_works.mp4` (Source: `https://cdn.dribbble.com/userupload/43632609/file/large-173cdb1cfd56d5100c0e887971cf7fe5.mp4`)
* **Calculator Section Video:** `/videos/section8_calculator.mp4`
* **Real-time Analytics Video:** `/videos/section11_analytics.mp4`
* **Video Stats Video:** `/videos/section12_stats.mp4`
* **Desaturated Stats Background Video:** `/videos/section7_stats.mp4` (Source: `https://cdn.dribbble.com/userupload/43272956/file/large-ef399cf77a28de76277bffb33e229e7e.mp4`)
* **Brand Film Video modal:** `/videos/part6.mp4` (Source: `https://cdn.dribbble.com/userupload/20585023/file/large-3394f84a5d0fd476b5b595c6b9942b90.mp4`)
* **Founder Photograph:** `/images/founder.png`
* **Capabilities Layout Image:** `/images/capabilities_row1.jpg`
* **Real-time Dashboard Mock Image:** `/images/section7img.jpeg`
* **Horizontal Logo Cycle Text array:**
  `["Your business deserves better Partners", "Your team deserves better Leadership", "Your workflow deserves better Automation", "Your productivity deserves better Systems", "Your projects deserve better Strategy", "Your analytics deserves better Insights", "Your dashboard deserves better Clarity", "Your platform deserves better Infrastructure"]`

### B. Fallback Asset Library (Inactive/Reference)
Use the following remote library links if any of the above local files are missing, or as references to inspect the original styling:
* **Abstract Glassy Shader original:** `https://cdn.21st.dev/dhileepkumargm/abstract-glassy-shader/default/bundle.1756989308830.html?theme=dark&dark=true`
* **Background Paper Shaders original:** `https://cdn.21st.dev/muhammadnadeemmn9485134/background-paper-shaders/default/bundle.1755685936907.html?theme=dark&dark=true`
* **Liquid Glass Inspiration:** `https://liquid-glass.ajitkumar.in/`
* **Original 1726 Sliding Text Cycle:** `https://cdn.21st.dev/bundled/1726.html?theme=dark&dark=true`
* **Original Particle Text effect:** `https://cdn.21st.dev/xubohuah/particle-text-effect/default/bundle.1750754554698.html?theme=dark&dark=true`
* **Original Vapour Text effect:** `https://cdn.21st.dev/jatin-yadav05/vapour-text-effect/default/bundle.1747562393197.html?theme=dark&dark=true`
* **Dribbble Design clip 5 (Fallback video):** `https://cdn.dribbble.com/userupload/42526510/file/large-1d8934b241310caa7a8be0c9c4f91d4d.mp4`
