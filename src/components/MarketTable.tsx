import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const forexData = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.09214, change: 0.12, spread: 0.0 },
  { symbol: 'GBP/USD', name: 'Pound / US Dollar', price: 1.26541, change: -0.05, spread: 0.2 },
  { symbol: 'USD/JPY', name: 'US Dollar / Yen', price: 148.214, change: 0.34, spread: 0.1 },
  { symbol: 'AUD/USD', name: 'Aussie / US Dollar', price: 0.65421, change: 0.08, spread: 0.2 },
  { symbol: 'USD/CHF', name: 'US Dollar / Franc', price: 0.88412, change: -0.15, spread: 0.3 },
];

const metalData = [
  { symbol: 'XAU/USD', name: 'Gold / US Dollar', price: 2342.12, change: 1.24, spread: 0.12 },
  { symbol: 'XAG/USD', name: 'Silver / US Dollar', price: 28.14, change: 0.45, spread: 1.5 },
  { symbol: 'XPT/USD', name: 'Platinum / US Dollar', price: 954.12, change: -0.21, spread: 8.5 },
  { symbol: 'XPD/USD', name: 'Palladium / US Dollar', price: 1024.12, change: 0.12, spread: 12.0 },
];

export default function MarketTable() {
  const [activeTab, setActiveTab] = useState<'forex' | 'metals'>('forex');
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [lastPrices, setLastPrices] = useState<Record<string, number>>({});

  // Simulate price movement
  useEffect(() => {
    const data = activeTab === 'forex' ? forexData : metalData;
    const initialPrices = data.reduce((acc, item) => ({ ...acc, [item.symbol]: item.price }), {});
    setPrices(initialPrices);
    setLastPrices(initialPrices);

    const interval = setInterval(() => {
      setPrices(prev => {
        const next = { ...prev };
        setLastPrices(prev);
        Object.keys(next).forEach(symbol => {
          const change = (Math.random() - 0.5) * 0.0001 * (activeTab === 'metals' ? 100 : 1);
          next[symbol] = parseFloat((next[symbol] + change).toFixed(activeTab === 'forex' ? 5 : 2));
        });
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const currentData = activeTab === 'forex' ? forexData : metalData;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div className="text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Institutional Markets.</h2>
          <p className="text-white/40 max-w-lg">Access deep liquidity pools and raw execution on our most popular instruments.</p>
        </div>
        
        <div className="flex bg-midnight-light p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setActiveTab('forex')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'forex' ? 'bg-gold text-midnight shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            Forex
          </button>
          <button 
            onClick={() => setActiveTab('metals')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'metals' ? 'bg-gold text-midnight shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            Metals
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
              <th className="py-6 px-4">Instrument</th>
              <th className="py-6 px-4">Price</th>
              <th className="py-6 px-4">24h Change</th>
              <th className="py-6 px-4">Spread</th>
              <th className="py-6 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => {
              const currentPrice = prices[item.symbol] || item.price;
              const lastPrice = lastPrices[item.symbol] || item.price;
              const isUp = currentPrice >= lastPrice;
              
              return (
                <motion.tr 
                  layout
                  key={item.symbol} 
                  className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                        {item.symbol.split('/')[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-gold transition-colors">{item.symbol}</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-wider">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className={`font-mono text-lg font-medium transition-colors duration-500 flex items-center gap-2 ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                      {currentPrice.toLocaleString(undefined, { minimumFractionDigits: activeTab === 'forex' ? 5 : 2 })}
                      {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    </div>
                  </td>
                  <td className="py-6 px-4 uppercase">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${item.change >= 0 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                      {item.change >= 0 ? '+' : ''}{item.change}%
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <span className="text-white/70 font-mono text-sm">{item.spread} <span className="text-[10px] text-white/20">PIPS</span></span>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <button className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:translate-x-1 transition-transform">
                      Trade <ArrowRight size={16} />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="text-sm font-medium text-white/40 hover:text-white flex items-center gap-2 border-b border-white/10 pb-1">
          View all 80+ instruments
        </button>
      </div>
    </div>
  );
}
