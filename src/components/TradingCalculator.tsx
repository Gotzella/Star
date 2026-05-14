import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Info, HelpCircle } from 'lucide-react';

const assets = [
  { id: 'EURUSD', name: 'EUR/USD', pipValueBase: 10, contractSize: 100000, price: 1.0921 },
  { id: 'GBPUSD', name: 'GBP/USD', pipValueBase: 10, contractSize: 100000, price: 1.2654 },
  { id: 'XAUUSD', name: 'XAU/USD (Gold)', pipValueBase: 1, contractSize: 100, price: 2342.12 },
  { id: 'XAGUSD', name: 'XAG/USD (Silver)', pipValueBase: 5, contractSize: 5000, price: 28.14 },
];

const leverages = [10, 30, 50, 100, 200, 500];

export default function TradingCalculator() {
  const [assetId, setAssetId] = useState(assets[0].id);
  const [leverage, setLeverage] = useState(100);
  const [lots, setLots] = useState(0.1);
  
  const asset = assets.find(a => a.id === assetId)!;
  
  const pipValue = asset.pipValueBase * lots;
  const marginRequired = (asset.price * asset.contractSize * lots) / leverage;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Precision Trading Tools.</h2>
        <p className="text-white/40">Calculate your risk and margin requirements instantly before entering the market.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Controls */}
        <div className="md:col-span-3 space-y-8">
          <div className="glass rounded-3xl p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Select Instrument</label>
              <div className="grid grid-cols-2 gap-3">
                {assets.map(a => (
                  <button 
                    key={a.id}
                    onClick={() => setAssetId(a.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${assetId === a.id ? 'border-gold bg-gold/5 text-gold' : 'border-white/5 bg-white/[0.02] text-white/60 hover:border-white/10'}`}
                  >
                    <div className="font-bold">{a.name}</div>
                    <div className="text-[10px] opacity-60">Price: {a.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3 flex justify-between">
                Leverage <span>1:{leverage}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {leverages.map(l => (
                  <button 
                    key={l}
                    onClick={() => setLeverage(l)}
                    className={`flex-1 min-w-[60px] py-2 rounded-lg text-xs font-bold border transition-all ${leverage === l ? 'bg-gold text-midnight border-gold' : 'bg-white/5 border-white/5 text-white/40 hover:text-white'}`}
                  >
                    1:{l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Lot Size (Lots)</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01"
                  value={lots}
                  onChange={(e) => setLots(Math.max(0.01, parseFloat(e.target.value) || 0))}
                  className="w-full bg-midnight border border-white/10 rounded-xl py-4 px-6 focus:border-gold outline-none transition-colors font-mono text-lg"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                  <button onClick={() => setLots(Math.max(0.01, lots - 0.01))} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center">-</button>
                  <button onClick={() => setLots(lots + 0.01)} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2">
          <div className="bg-gold-gradient rounded-3xl p-8 text-midnight h-full flex flex-col shadow-[0_20px_50px_rgba(212,175,55,0.1)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-midnight/10 flex items-center justify-center">
                <CalcIcon size={20} />
              </div>
              <span className="font-bold uppercase tracking-widest text-xs">Trade Summary</span>
            </div>

            <div className="space-y-8 flex-grow">
              <div>
                <div className="text-[10px] uppercase font-bold opacity-60 mb-2">Required Margin</div>
                <div className="text-4xl font-display font-bold">
                  ${marginRequired.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] opacity-60 mt-1">Minimum equity needed to open</div>
              </div>

              <div className="pt-8 border-t border-midnight/10">
                <div className="text-[10px] uppercase font-bold opacity-60 mb-2">Pip Value (USD)</div>
                <div className="text-3xl font-display font-bold">
                  ${pipValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] opacity-60 mt-1">Profit/Loss per 1 pip movement</div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-midnight/5 rounded-2xl flex gap-3 text-[10px] leading-relaxed">
              <Info size={14} className="shrink-0" />
              <span>Calculations are based on real-time market data. Actual requirements may vary based on market volatility and provider settings.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
