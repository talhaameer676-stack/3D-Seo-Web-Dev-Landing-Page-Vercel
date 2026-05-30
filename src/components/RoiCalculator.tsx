import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { ArrowUpRight, DollarSign, MousePointerClick, Users, TrendingUp } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBooking }) => {
  const [budget, setBudget] = useState<number>(10000);

  // CPC calculation constant
  const averageCpc = 0.85;
  const convRate = 0.03;

  // Derive metrics
  const estimatedClicks = Math.round(budget / averageCpc);
  const estimatedConversions = Math.round(estimatedClicks * convRate);

  // ROAS escalates dynamically as budget increases, simulating campaign optimization efficiency at scale
  const roas = Number((3.0 + (budget / 100000) * 1.5).toFixed(2));
  const totalRevenue = budget * roas;
  const netRevenue = totalRevenue - budget;

  // Format currency helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full max-w-4xl mx-auto liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 relative z-10">
        {/* Slider Controls */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-end mb-6 font-body">
              <div>
                <span className="text-4xl md:text-5xl font-heading italic text-white leading-none">
                  {formatCurrency(budget)}
                </span>
              </div>
              <span className="text-sm font-light text-white/60">
                CPC Estimate: $0.85
              </span>
            </div>

            {/* Radix Slider */}
            <div className="py-6">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                value={[budget]}
                onValueChange={(val) => setBudget(val[0])}
                max={100000}
                min={1000}
                step={1000}
              >
                <Slider.Track className="bg-white/10 relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-white rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-6 h-6 bg-white rounded-full shadow-lg shadow-black/50 border border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-transform active:scale-110"
                  aria-label="Budget slider"
                />
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

        {/* Calculated Metrics */}
        <div className="lg:col-span-2 flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-6 font-body">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <MousePointerClick className="w-4.5 h-4.5 text-white/80" />
              </div>
              <div>
                <span className="text-xs text-white/40 block uppercase tracking-wider font-light">Estimated Clicks</span>
                <span className="text-xl font-medium text-white">
                  {estimatedClicks.toLocaleString()}
                </span>
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
                <span className="text-xl font-medium text-white">
                  {roas}x
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                <DollarSign className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <span className="text-xs text-white/40 block uppercase tracking-wider font-light">Net Growth Revenue</span>
                <span className="text-2xl font-semibold text-white">
                  {formatCurrency(netRevenue)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full bg-white text-black hover:bg-white/90 text-sm font-medium py-3 rounded-full flex items-center justify-center gap-1.5 mt-8 transition-colors cursor-pointer border-none font-body"
          >
            <span>Claim This Growth Plan</span>
            <ArrowUpRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
