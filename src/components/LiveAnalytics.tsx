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
    // Fluctuate metrics periodically to simulate live reporting
    const interval = setInterval(() => {
      setCpa(prev => Number((prev + (Math.random() * 0.4 - 0.2)).toFixed(2)));
      setConvRate(prev => Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)));
      setSpent(prev => prev + Math.random() * 15.5);
      setRoas(prev => Number((prev + (Math.random() * 0.06 - 0.03)).toFixed(2)));

      // Add a random log
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
      {/* Top Banner */}
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
        {/* Core Stats Side */}
        <div className="lg:col-span-1 space-y-4">
          {/* Stat Block 1 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1 font-light">Cost Per Acquisition (CPA)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">${cpa.toFixed(2)}</span>
              <span className="text-[10px] text-emerald-400 font-light flex items-center">-14.2% today</span>
            </div>
            <div className="absolute top-4 right-4 text-white/10">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Stat Block 2 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1 font-light">Conversion Rate (CVR)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{convRate.toFixed(2)}%</span>
              <span className="text-[10px] text-emerald-400 font-light">+0.8% auto-opt</span>
            </div>
            <div className="absolute top-4 right-4 text-white/10">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Stat Block 3 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1 font-light">Budget Deployed (Today)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent)}
              </span>
            </div>
          </div>

          {/* Stat Block 4 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <span className="text-[10px] text-white/40 block uppercase tracking-wider mb-1 font-light">Current Network ROAS</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{roas.toFixed(2)}x</span>
              <span className="text-[10px] text-emerald-400 font-light">Efficient Scale</span>
            </div>
          </div>
        </div>

        {/* Console Log Panel */}
        <div className="lg:col-span-2 bg-black/60 rounded-2xl border border-white/5 overflow-hidden flex flex-col h-[320px]">
          {/* Terminal Title Bar */}
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

          {/* Scrolling Log Content */}
          <div className="p-4 overflow-y-auto font-mono text-xs space-y-2.5 grow flex flex-col-reverse select-none">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
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
