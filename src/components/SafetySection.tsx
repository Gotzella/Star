import React from 'react';
import { motion } from 'motion/react';
import { Shield, Globe, Landmark, Scale, CheckCircle2 } from 'lucide-react';

export default function SafetySection() {
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="relative z-10">
            <span className="text-gold font-bold uppercase tracking-widest text-xs mb-4 block">Safety & Regulation</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] tracking-tighter">
              Institutional Security <br />
              for Every Account.
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed max-w-xl">
              We operate under the strictest Tier-1 regulatory frameworks globally, ensuring your capital is 
              protected, liquid, and safe at all times.
            </p>

            <div className="space-y-6">
              {[
                { 
                  icon: <Landmark className="text-gold" />, 
                  title: "Tier-1 Regulatory Compliance", 
                  desc: "Fully licensed by the FCA (UK), ASIC (Australia), and SCB (Bahamas)." 
                },
                { 
                  icon: <Shield className="text-gold" />, 
                  title: "Negative Balance Protection", 
                  desc: "Our automated risk system ensures you can never lose more than your initial deposit." 
                },
                { 
                  icon: <Scale className="text-gold" />, 
                  title: "Strict Capital Requirements", 
                  desc: "We maintain substantial capital buffers to ensure stability during extreme market volatility." 
                }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all group"
                >
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold mb-1 group-hover:text-gold transition-colors">{item.title}</h4>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stylized SVG Map (Phase 3) */}
          <div className="relative">
            <div className="gold-blur top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]" />
            <svg viewBox="0 0 800 400" className="w-full h-auto opacity-40 grayscale sepia brightness-50">
              <path 
                fill="currentColor" 
                className="text-gold/20"
                d="M150 100h20v20h-20zM300 150h20v20h-20zM500 80h20v20h-20zM600 200h20v20h-20zM200 250h20v20h-20zM450 300h20v20h-20z" 
              />
              {/* Simplified world map path - just a blob logic */}
              <path 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                className="text-white/20"
                d="M50 150 Q100 50 200 100 T400 150 T600 50 T750 200 M50 200 Q150 350 300 250 T500 300 T750 250"
              />
              {/* Nodes for "Global Presence" */}
              {[
                { x: 200, y: 120, label: 'London' },
                { x: 550, y: 100, label: 'Tokyo' },
                { x: 180, y: 220, label: 'New York' },
                { x: 650, y: 280, label: 'Sydney' },
                { x: 420, y: 250, label: 'Dubai' },
              ].map((node, i) => (
                <g key={i}>
                  <motion.circle 
                    initial={{ r: 0 }}
                    whileInView={{ r: 4 }}
                    cx={node.x} cy={node.y} 
                    fill="#D4AF37" 
                  />
                  <motion.circle 
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                    cx={node.x} cy={node.y} r="8" 
                    fill="none" 
                    stroke="#D4AF37" 
                    strokeWidth="1"
                  />
                  <text x={node.x + 10} y={node.y + 4} className="text-[10px] fill-white/40 font-bold uppercase tracking-widest">{node.label}</text>
                </g>
              ))}
            </svg>
            
            <div className="absolute bottom-0 right-0 p-8 glass rounded-3xl max-w-[240px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Globe className="text-gold" size={24} />
                </div>
                <div className="text-2xl font-bold font-display">12+</div>
              </div>
              <p className="text-xs text-white/40 uppercase font-black tracking-widest">Global Data Centers & Offices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
