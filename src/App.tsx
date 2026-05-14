/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  Calculator as CalcIcon,
  Menu,
  X,
  Star as StarIcon,
  Check,
  TrendingUp,
  Cpu,
  Lock,
  Mail,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

// Lazy load heavy components for performance (Phase 4)
const MarketTable = lazy(() => import('./components/MarketTable'));
const TradingCalculator = lazy(() => import('./components/TradingCalculator'));
const SafetySection = lazy(() => import('./components/SafetySection'));

// --- Helper Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; 
  className?: string; 
  [key: string]: any;
}) => {
  const base = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95";
  const variants = {
    primary: "bg-gold text-midnight hover:bg-gold-light shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
    secondary: "bg-white text-midnight hover:bg-zinc-200",
    outline: "border border-gold/30 text-gold hover:bg-gold/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5"
  };
  
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Main Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gold p-1.5 rounded-lg rotate-12 group-hover:rotate-0 transition-transform">
            <StarIcon size={20} className="text-midnight fill-midnight" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter">STAR<span className="text-gold">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Markets', 'Trading', 'Platforms', 'Tools', 'Education'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-gold transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-sm">Login</Button>
          <Button variant="primary" className="text-sm py-2 px-6">Open Account</Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-midnight flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-display font-bold">STAR<span className="text-gold">.</span></span>
              <button onClick={() => setMobileMenuOpen(false)}><X /></button>
            </div>
            <div className="flex flex-col gap-6 text-xl">
              {['Markets', 'Trading', 'Platforms', 'Tools', 'Education'].map((item) => (
                <a key={item} href="#" onClick={() => setMobileMenuOpen(false)}>{item}</a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <Button variant="outline">Login</Button>
              <Button variant="primary">Start Trading Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="gold-blur top-20 -left-20 w-[400px] h-[400px]" />
      <div className="gold-blur bottom-0 right-0 w-[500px] h-[500px]" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-widest mb-6">
            Institutional Metal & FX Trading
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter">
            Trade the <span className="text-gold">Galaxy</span> <br /> of Markets.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Experience institutional spreads on 80+ FX pairs and Precious Metals. 
            Ultra-modern execution for serious traders.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" className="w-full sm:w-auto h-14 px-10 text-lg">
              Open Live Account <ChevronRight size={18} />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg">
              Try Free Demo
            </Button>
          </div>
        </motion.div>

        {/* Global Market Stats (Phase 1) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 glass rounded-2xl p-8 flex flex-wrap justify-between gap-8 md:gap-16"
        >
          {[
            { label: 'EUR/USD', price: '1.0921', change: '+0.12%', spread: '0.0' },
            { label: 'XAU/USD', price: '2,342.12', change: '-0.45%', spread: '0.12' },
            { label: 'GBP/JPY', price: '190.45', change: '+0.34%', spread: '0.2' },
            { label: 'XAG/USD', price: '28.14', change: '+1.12%', spread: '1.5' },
          ].map((stat, i) => (
            <div key={i} className="flex-1 min-w-[150px] text-left border-r border-white/5 last:border-0 pr-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/40 font-medium">{stat.label}</span>
                <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
              </div>
              <div className="text-xl font-bold font-display mb-1">{stat.price}</div>
              <div className="text-[10px] uppercase tracking-tighter text-white/30">Spread from <span className="text-gold">{stat.spread}</span> pips</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const spreads = [
    { pair: "EURUSD", spread: "0.0", change: "+0.12%" },
    { pair: "USDJPY", spread: "0.1", change: "-0.05%" },
    { pair: "GBPUSD", spread: "0.2", change: "+0.08%" },
    { pair: "AUDUSD", spread: "0.1", change: "-0.02%" },
    { pair: "XAUUSD", spread: "0.12", change: "+1.24%" },
    { pair: "XAGUSD", spread: "1.2", change: "+0.45%" },
    { pair: "USOIL", spread: "1.5", change: "-0.89%" },
    { pair: "US30", spread: "0.5", change: "+0.22%" },
  ];

  return (
    <div className="bg-white/5 py-4 overflow-hidden border-y border-white/5">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...spreads, ...spreads].map((s, i) => (
          <div key={i} className="inline-flex items-center gap-3 px-8 border-r border-white/10">
            <span className="font-bold text-sm tracking-tight">{s.pair}</span>
            <span className="text-xs text-gold font-mono">{s.spread}</span>
            <span className={`text-[10px] font-medium ${s.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {s.change}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

const FeatureGrid = () => {
  const features = [
    {
      icon: <Cpu className="text-gold" size={32} />,
      title: "Ultra-Low Latency",
      desc: "Fiber optic connection to LD4 and NY4 data centers ensures <1ms execution speed for institutional performance."
    },
    {
      icon: <Lock className="text-gold" size={32} />,
      title: "Segregated Funds",
      desc: "Client capital is held in Tier-1 banks, completely separate from company assets under strict regulatory oversight."
    },
    {
      icon: <Headphones className="text-gold" size={32} />,
      title: "24/5 Expert Support",
      desc: "Connect with real market veterans via live chat, phone, or email in over 15 languages at any time."
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <motion.div 
            whileHover={{ y: -10 }}
            key={i} 
            className="p-8 rounded-3xl bg-midnight-light border border-white/5 hover:border-gold/20 transition-all group"
          >
            <div className="mb-6 p-4 bg-midnight rounded-2xl inline-block group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
            <p className="text-white/50 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const PricingToggle = () => {
  const [isPro, setIsPro] = useState(false);

  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Edge.</h2>
        <p className="text-white/50 mb-12">Tailored accounts for every trading style.</p>
        
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm ${!isPro ? 'text-white' : 'text-white/40'}`}>Star Standard</span>
          <button 
            onClick={() => setIsPro(!isPro)}
            className="w-14 h-7 bg-white/10 rounded-full p-1 relative transition-colors border border-white/10"
          >
            <motion.div 
              animate={{ x: isPro ? 28 : 0 }}
              className="w-5 h-5 bg-gold rounded-full shadow-lg"
            />
          </button>
          <span className={`text-sm ${isPro ? 'text-gold font-bold' : 'text-white/40'}`}>Star Pro</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Standard */}
          <div className={`p-10 rounded-3xl transition-all duration-500 border overflow-hidden relative flex flex-col ${!isPro ? 'bg-midnight glass border-gold/50 scale-105 z-10 shadow-2xl shadow-gold/5' : 'bg-midnight-light border-white/5 opacity-50'}`}>
            {!isPro && <div className="absolute top-0 right-0 bg-gold text-midnight px-4 py-1 text-[10px] font-bold uppercase rounded-bl-xl tracking-widest">Active Choice</div>}
            <div className="mb-8 text-left">
              <h4 className="text-xl font-bold mb-2">Star Standard</h4>
              <p className="text-white/40 text-sm">Perfect for beginners and day traders</p>
            </div>
            <div className="text-4xl font-display font-bold mb-8 text-left">
              0.0 <span className="text-base text-white/30 font-sans">Commission</span>
            </div>
            <div className="space-y-4 mb-10 flex-grow">
              {['Spreads from 1.0 pips', 'No trading fees', 'All instruments', 'MT5 & Web Platform', '24/5 Support'].map(t => (
                <div key={t} className="flex items-center gap-3 text-sm text-white/70">
                  <Check size={16} className="text-gold" /> {t}
                </div>
              ))}
            </div>
            <Button variant={!isPro ? 'primary' : 'outline'} className="w-full">
              Get Started Now
            </Button>
          </div>

          {/* Pro */}
          <div className={`p-10 rounded-3xl transition-all duration-500 border overflow-hidden relative flex flex-col ${isPro ? 'bg-midnight glass border-gold/50 scale-105 z-10 shadow-2xl shadow-gold/5' : 'bg-midnight-light border-white/5 opacity-50'}`}>
            {isPro && <div className="absolute top-0 right-0 bg-gold text-midnight px-4 py-1 text-[10px] font-bold uppercase rounded-bl-xl tracking-widest">Recommended</div>}
            <div className="mb-8 text-left">
              <h4 className="text-xl font-bold mb-2">Star Pro</h4>
              <p className="text-white/40 text-sm">Engineered for high-volume scalpers</p>
            </div>
            <div className="text-4xl font-display font-bold mb-8 text-left">
              Raw <span className="text-base text-white/30 font-sans">Spreads</span>
            </div>
            <div className="space-y-4 mb-10 flex-grow">
              {['Spreads from 0.0 pips', '$3.50 commission per side', 'Interbank liquidity', 'Fastest API access', 'Priority execution'].map(t => (
                <div key={t} className="flex items-center gap-3 text-sm text-white/70">
                  <Check size={16} className="text-gold" /> {t}
                </div>
              ))}
            </div>
            <Button variant={isPro ? 'primary' : 'outline'} className="w-full">
              Unlock Raw Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConversionPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = localStorage.getItem('popup_shown');
      if (!shown) setShow(true);
    }, 30000); // 30 seconds as requested
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setShow(false);
    localStorage.setItem('popup_shown', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-midnight/90 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-midnight-light border border-gold/30 rounded-3xl p-10 overflow-hidden"
          >
            <div className="gold-blur -top-20 -right-20 w-40 h-40 opacity-50" />
            <button onClick={close} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors">
              <X />
            </button>
            <TrendingUp size={48} className="text-gold mb-8" />
            <h3 className="text-3xl font-bold mb-4">Master the Galaxy.</h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              Unlock our exclusive <strong>2026 Trading Strategy Guide</strong>. 
              Learn how top institutional traders leverage gold and spreads.
            </p>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <Button onClick={close} className="w-full py-4 text-lg">Send My Free PDF</Button>
              <p className="text-[10px] text-white/30 text-center uppercase tracking-widest">Join 120,000+ STAR traders</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      q: "How fast are withdrawals processed?",
      a: "Withdrawals are processed instantly for most electronic methods and within 24 hours for bank transfers. Your security and liquidity are our top priority."
    },
    {
      q: "Is my capital safe with STAR?",
      a: "Yes. All client funds are held in segregated accounts with Tier-1 international banks and protected by Negative Balance Protection and regulatory oversight."
    },
    {
      q: "What is your maximum leverage?",
      a: "We offer flexible leverage options up to 1:500 for eligible professional accounts and 1:30 for retail accounts, depending on jurisdiction and asset class."
    },
    {
      q: "Where are your servers located?",
      a: "Our core execution servers are co-located in LD4 (London), NY4 (New York), and TY3 (Tokyo) to provide ultra-low latency worldwide."
    }
  ];

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-midnight-light rounded-2xl overflow-hidden border border-white/5">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-semibold">{faq.q}</span>
              <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-white/50 text-sm leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {/* Schema.org Markup for SEO (Phase 3) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        })}
      </script>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-midnight pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gold p-1.5 rounded-lg">
                <StarIcon size={20} className="text-midnight fill-midnight" />
              </div>
              <span className="text-2xl font-display font-bold">STAR<span className="text-gold">.</span></span>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed mb-8">
              The galaxy's most advanced trading platform. 
              Institutional liquidity for the modern retail trader.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'YouTube'].map(s => (
                <div key={s} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-gold/10 hover:border-gold/50 transition-all">
                  <span className="sr-only">{s}</span>
                  <div className="w-4 h-4 bg-white/20 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6">Trading</h5>
            <div className="space-y-4 text-sm text-white/40">
              <a href="#" className="block hover:text-gold">Forex</a>
              <a href="#" className="block hover:text-gold">Metals</a>
              <a href="#" className="block hover:text-gold">Indices</a>
              <a href="#" className="block hover:text-gold">Spreads</a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <div className="space-y-4 text-sm text-white/40">
              <a href="#" className="block hover:text-gold">About Us</a>
              <a href="#" className="block hover:text-gold">Careers</a>
              <a href="#" className="block hover:text-gold">Contact</a>
              <a href="#" className="block hover:text-gold">News</a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6">Support</h5>
            <div className="space-y-4 text-sm text-white/40">
              <a href="#" className="block hover:text-gold">Help Center</a>
              <a href="#" className="block hover:text-gold">FAQ</a>
              <a href="#" className="block hover:text-gold">Legal</a>
              <a href="#" className="block hover:text-gold">Status</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div className="text-[10px] uppercase tracking-wider text-white/20 font-bold space-x-6">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
            <div className="text-[10px] text-white/30 text-right leading-relaxed italic border-l border-gold/10 pl-6">
              CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 
              <strong> 81.4% of retail investor accounts lose money</strong> when trading CFDs with this provider. 
              You should consider whether you understand how CFDs work and whether you can afford to take 
              the high risk of losing your money. Star Trading Ltd is authorized and regulated by the FCA, ASIC, and SCB.
            </div>
          </div>
          <div className="mt-12 text-center text-[10px] text-white/20 uppercase tracking-[0.2em]">
            &copy; 2026 STAR TRADING GROUP. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-midnight selection:bg-gold selection:text-midnight text-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <FeatureGrid />
      
      <div id="markets" className="py-24 px-6 max-w-7xl mx-auto">
        <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-gold">Loading Markets...</div>}>
          <MarketTable />
        </Suspense>
      </div>

      <div id="tools" className="py-24 px-6 bg-white/[0.01]">
        <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-gold">Loading Calculator...</div>}>
          <TradingCalculator />
        </Suspense>
      </div>

      <PricingToggle />

      <Suspense fallback={<div className="h-[400px]" />}>
        <SafetySection />
      </Suspense>

      <FAQ />
      <Footer />
      <ConversionPopup />
    </div>
  );
}
