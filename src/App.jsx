import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Helper UI bits ---
const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
    {/* animated background grid + beams */}
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,.08),transparent_60%)]"/>
      <motion.div
        className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl"
        initial={{ opacity: .2, scale: .9 }}
        animate={{ opacity: [.2,.35,.2], scale: [0.9,1.05,0.9], rotate:[0,30,0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "conic-gradient(from 0deg, rgba(59,130,246,.25), rgba(6,182,212,.15), transparent)" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl"
        initial={{ opacity: .15, scale: 1 }}
        animate={{ opacity: [.15,.3,.15], scale: [1,1.08,1], rotate:[0,-40,0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "conic-gradient(from 180deg, rgba(6,182,212,.2), rgba(59,130,246,.15), transparent)" }}
      />
      {/* scanning grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%","100%","-100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>

    <div className="max-w-7xl mx-auto relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-white tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className="mt-3 text-blue-200/80 max-w-3xl">{subtitle}</p>
      )}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const Pill = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-400/20">
    {children}
  </span>
);

const Progress = ({ value, label }) => (
  <div className="w-full">
    <div className="flex justify-between mb-2">
      <span className="text-sm text-blue-100/90">{label}</span>
      <span className="text-sm text-blue-300/80">{value}%</span>
    </div>
    <div className="h-3 w-full rounded-full bg-blue-900/40 overflow-hidden ring-1 ring-blue-800/50">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400"
      />
    </div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: .5 }}
    className={`rounded-2xl bg-blue-900/10 border border-blue-800/40 shadow-xl shadow-cyan-500/10 backdrop-blur relative overflow-hidden ${className}`}
  >
    {/* animated border glow */}
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -inset-[1px] rounded-2xl"
      initial={{ opacity: .15 }}
      animate={{ opacity: [.15,.35,.15] }}
      transition={{ duration: 6, repeat: Infinity }}
      style={{ background: "linear-gradient(120deg, rgba(14,165,233,.35), rgba(59,130,246,.25), transparent)" }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

const CTAButton = ({ href, children, as = 'a', onClick, type = 'button' }) => {
  const classes = "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 active:scale-[.99] transition";
  if (as === 'button') {
    return (
      <motion.button type={type} whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} onClick={onClick} className={classes}>
        {children}
      </motion.button>
    );
  }
  return (
    <motion.a href={href} whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} className={classes}>
      {children}
    </motion.a>
  );
};

const NavLink = ({ href, children }) => (
  <a href={href} className="text-blue-100/90 hover:text-white transition">
    {children}
  </a>
);

const Badge = ({ children }) => (
  <span className="rounded-lg bg-emerald-400/10 text-emerald-300 border border-emerald-500/20 px-2 py-1 text-[10px] uppercase tracking-wider font-bold">
    {children}
  </span>
);

// Simple carousel for BreachKit
const Carousel = ({ items }) => {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-blue-800/40 bg-black">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="aspect-[16/9] flex items-center justify-center"
        >
          <img
            src={items[index].image}
            alt={items[index].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button type="button" onClick={prev} className="px-4 py-2 rounded-xl bg-blue-900/40 border border-blue-800/60 text-blue-200 hover:bg-blue-900/60">◀︎</button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === index ? "bg-cyan-400" : "bg-blue-800"}`} />
          ))}
        </div>
        <button type="button" onClick={next} className="px-4 py-2 rounded-xl bg-blue-900/40 border border-blue-800/60 text-blue-200 hover:bg-blue-900/60">▶︎</button>
      </div>
      {/* glow ring */}
      <motion.div
        aria-hidden
        className="absolute -inset-6 rounded-3xl -z-10"
        animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 120px rgba(6,182,212,.15)", "0 0 0px rgba(6,182,212,0)"] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
};

// Placeholder images (royalty-free style gradients / cyber aesthetics)
const PLACEHOLDERS = [
  "data:image/svg+xml;utf8,\
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>\
    <defs>\
      <linearGradient id='g' x1='0' x2='1'>\
        <stop offset='0%' stop-color='#0ea5e9'/>\
        <stop offset='100%' stop-color='#1d4ed8'/>\
      </linearGradient>\
    </defs>\
    <rect width='1200' height='675' fill='black'/>\
    <circle cx='200' cy='150' r='300' fill='url(%23g)' opacity='.25'/>\
    <g fill='none' stroke='%2381d4fa' stroke-opacity='.4'>\
      <path d='M0 340 Q 200 300 400 340 T 800 340 T 1200 340'/>\
      <path d='M0 370 Q 220 330 440 370 T 880 370 T 1320 370'/>\
      <path d='M0 400 Q 240 360 480 400 T 960 400 T 1440 400'/>\
    </g>\
    <text x='60' y='620' font-family='monospace' font-size='42' fill='%23e0f2fe'>BreachKit // module viewer</text>\
  </svg>",
  "data:image/svg+xml;utf8,\
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>\
    <defs>\
      <linearGradient id='g2' x1='0' x2='1'>\
        <stop offset='0%' stop-color='#22d3ee'/>\
        <stop offset='100%' stop-color='#3b82f6'/>\
      </linearGradient>\
    </defs>\
    <rect width='1200' height='675' fill='black'/>\
    <rect x='150' y='120' width='900' height='435' rx='16' fill='url(%23g2)' opacity='.2'/>\
    <g stroke='%2348b9ff' stroke-width='2' stroke-opacity='.6'>\
      <rect x='170' y='150' width='240' height='90' rx='12' fill='none'/>\
      <rect x='430' y='150' width='240' height='90' rx='12' fill='none'/>\
      <rect x='690' y='150' width='240' height='90' rx='12' fill='none'/>\
      <rect x='170' y='260' width='760' height='260' rx='12' fill='none'/>\
    </g>\
    <text x='190' y='210' font-family='monospace' font-size='32' fill='%23e0f2fe'>scanner</text>\
    <text x='450' y='210' font-family='monospace' font-size='32' fill='%23e0f2fe'>exfil</text>\
    <text x='710' y='210' font-family='monospace' font-size='32' fill='%23e0f2fe'>ops</text>\
  </svg>",
  "data:image/svg+xml;utf8,\
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>\
    <rect width='1200' height='675' fill='black'/>\
    <g fill='none' stroke='%2325c3ff' stroke-opacity='.7'>\
      <path d='M0 600 L1200 600'/>\
      <path d='M0 560 L1200 560'/>\
      <path d='M0 520 L1200 520'/>\
    </g>\
    <g fill='%230ea5e9'>\
      <circle cx='200' cy='580' r='6'/>\
      <circle cx='420' cy='540' r='6'/>\
      <circle cx='820' cy='560' r='6'/>\
    </g>\
    <text x='50' y='80' font-family='monospace' font-size='44' fill='%23a5f3fc'>breachkit: payload builder</text>\
  </svg>",
  "data:image/svg+xml;utf8,\
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>\
    <rect width='1200' height='675' fill='black'/>\
    <defs>\
      <linearGradient id='g3' x1='0' x2='1'>\
        <stop offset='0%' stop-color='#60a5fa'/>\
        <stop offset='100%' stop-color='#06b6d4'/>\
      </linearGradient>\
    </defs>\
    <circle cx='600' cy='338' r='320' fill='url(%23g3)' opacity='.08'/>\
    <g fill='none' stroke='%2348b9ff' stroke-width='2' opacity='.5'>\
      <path d='M200 540 C 300 400 900 400 1000 540'/>\
      <path d='M200 140 C 500 260 700 80 1000 140'/>\
    </g>\
    <text x='70' y='620' font-family='monospace' font-size='40' fill='%23e0f2fe'>breachkit: dashboards</text>\
  </svg>"
];

const LogoUpload = ({ label, src, onChange }) => (
  <label className="flex items-center gap-4 cursor-pointer">
    <div className="h-14 w-14 rounded-xl bg-blue-900/40 border border-blue-800/60 overflow-hidden grid place-items-center">
      {src ? (
        <img src={src} alt={`${label} logo`} className="w-full h-full object-contain" />
      ) : (
        <span className="text-[10px] text-blue-300/70 px-2 text-center">Logo</span>
      )}
    </div>
    <div className="text-xs text-blue-300/80">{src ? "Změnit logo" : "Přidat logo"}
      <input type="file" accept="image/*" className="hidden" onChange={onChange} />
    </div>
  </label>
);

export default function PhishguardSecurity() {
  const breachSlides = [
    { title: "BreachKit – Module Viewer", image: PLACEHOLDERS[0] },
    { title: "BreachKit – Operace", image: PLACEHOLDERS[1] },
    { title: "BreachKit – Builder", image: PLACEHOLDERS[2] },
    { title: "BreachKit – Dashboard", image: PLACEHOLDERS[3] },
  ];

  const [phishLogo, setPhishLogo] = useState(null);
  const [vishLogo, setVishLogo] = useState(null);

  const handleLogo = (setter) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setter(url);
  };

  return (
    <div className="min-h-screen bg-black text-blue-100 selection:bg-cyan-500/30 selection:text-white">
      <style>{`
        .glitch { position: relative; display: inline-block; }
        .glitch .glitch-layer { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; }
        .glitch .glitch-top { transform: translate(2px, -2px); color: rgba(6,182,212,0.9); mix-blend-mode: screen; animation: glitch-top 2.8s infinite linear; }
        .glitch .glitch-bottom { transform: translate(-2px, 2px); color: rgba(96,165,250,0.85); mix-blend-mode: screen; animation: glitch-bottom 3.6s infinite linear; }
        @keyframes glitch-top {
          0% { clip-path: inset(0 0 80% 0); transform: translate(2px,-2px) skewX(-1deg); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-3px,2px) skewX(2deg); }
          40% { clip-path: inset(10% 0 60% 0); transform: translate(1px,-1px) skewX(-.5deg); }
          60% { clip-path: inset(50% 0 10% 0); transform: translate(3px,-3px) skewX(1deg); }
          100% { clip-path: inset(0 0 80% 0); transform: translate(2px,-2px) skewX(-1deg); }
        }
        @keyframes glitch-bottom {
          0% { clip-path: inset(80% 0 0 0); transform: translate(-2px,2px) skewX(1deg); }
          20% { clip-path: inset(50% 0 30% 0); transform: translate(3px,-1px) skewX(-1deg); }
          40% { clip-path: inset(30% 0 40% 0); transform: translate(-1px,1px) skewX(.5deg); }
          60% { clip-path: inset(60% 0 10% 0); transform: translate(-4px,3px) skewX(-2deg); }
          100% { clip-path: inset(80% 0 0 0); transform: translate(-2px,2px) skewX(1deg); }
        }
      `}</style>

      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-blue-900/60 backdrop-blur bg-black/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <motion.div
              className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 grid place-items-center"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <span className="font-black text-black">P</span>
            </motion.div>
            <div className="leading-tight">
              <div className="text-white font-bold">phishguard security</div>
              <div className="text-xs text-blue-300/70 tracking-widest uppercase">cybersecurity</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink href="#apps">Aplikace</NavLink>
            <NavLink href="#pricing">Ceník</NavLink>
            <NavLink href="#defence">Defence Division</NavLink>
            <NavLink href="#breachkit">BreachKit</NavLink>
            <NavLink href="#about">O nás</NavLink>
            <CTAButton href="#kontakt">Kontakt</CTAButton>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,.15),transparent_65%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex gap-2 mb-4">
                <Pill>#phishing</Pill>
                <Pill>#vishing</Pill>
                <Pill>#pentest</Pill>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                <span className="relative inline-block glitch">
                  <span className="glitch-layer glitch-top">Zastavíme sociální inženýrství dřív, než začne.</span>
                  <span className="glitch-layer glitch-bottom">Zastavíme sociální inženýrství dřív, než začne.</span>
                  Zastavíme sociální inženýrství dřív, než začne.
                </span>
              </h1>
              <p className="mt-6 text-blue-200/80 text-lg max-w-2xl">
                Phishguard Security vyvíjí nástroje next‑gen ochrany proti phishingu a vishingu –
                <span className="text-white font-semibold"> PhishGuard</span> a <span className="text-white font-semibold">VishGuard</span>.
                K tomu nabízíme zakázkovou ochranu a pentesty v rámci <span className="text-white font-semibold">Defence Division</span>.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="#apps">Prozkoumat produkty</CTAButton>
                <a href="#defence" className="px-5 py-3 rounded-2xl border border-blue-800/60 text-blue-100/90 hover:bg-blue-900/40">Získat ochranu</a>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm">
                <Badge>SOČ – celostátní kolo</Badge>
                <Badge>Nominace: KyberCena roku</Badge>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card>
                <div className="p-6 md:p-8">
                  <div className="text-sm text-blue-300/80">Stav vývoje</div>
                  <div className="mt-4 space-y-6">
                    <Progress value={90} label="PhishGuard" />
                    <Progress value={15} label="VishGuard" />
                  </div>
                  <div className="mt-6 text-xs text-blue-300/70">* procenta reprezentují interní milníky (POC → MVP → Beta → GA)</div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Apps section */}
      <Section id="apps" title="Aplikace" subtitle="Dvě cesty, jeden cíl: minimalizovat lidskou chybu pod tlakem sociálního inženýrství.">
        <div className="grid md:grid-cols-2 gap-8">
          {/* PhishGuard Card */}
          <Card>
            <div className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">PhishGuard</h3>
                  <Pill>MVP 90%</Pill>
                </div>
                <LogoUpload label="PhishGuard" src={phishLogo} onChange={handleLogo(setPhishLogo)} />
              </div>
              <p className="mt-4 text-blue-200/80">Detekce a prevence phishingu v reálném čase. Analýza e‑mailů, odkazů a příloh, ochrana uživatelů i SOC týmů.</p>
              <ul className="mt-6 space-y-2 text-sm text-blue-100/90 list-disc list-inside">
                <li>Sandboxování příloh a URL</li>
                <li>Modely na míru pro české prostředí</li>
                <li>Integrace: M365, Google Workspace, IMAP, API</li>
              </ul>
              <div className="mt-6">
                <CTAButton href="#pricing">Zobrazit edice</CTAButton>
              </div>
            </div>
          </Card>

          {/* VishGuard Card */}
          <Card>
            <div className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">VishGuard</h3>
                  <Pill>POC 15%</Pill>
                </div>
                <LogoUpload label="VishGuard" src={vishLogo} onChange={handleLogo(setVishLogo)} />
              </div>
              <p className="mt-4 text-blue-200/80">Ochrana proti vishingu (podvodným hovorům). Korelace hlasových otisků, reputace čísel, behaviorální scoring.</p>
              <ul className="mt-6 space-y-2 text-sm text-blue-100/90 list-disc list-inside">
                <li>Detekce deepfake hlasu</li>
                <li>Integrace s PBX/VoIP</li>
                <li>Real‑time upozornění pro recepce a call centra</li>
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* Pricing / Free vs Custom */}
      <Section id="pricing" title="PhishGuard edice" subtitle="Vyberte si – zdarma pro jednotlivce, nebo na zakázku pro firmy a instituce.">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="relative">
            <div className="absolute -top-3 left-6"><Badge>FREE</Badge></div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white">PhishGuard Free</h3>
              <p className="mt-2 text-blue-200/80">Ideální pro jednotlivce a malé týmy.</p>
              <ul className="mt-6 space-y-3 text-sm text-blue-100/90">
                <li>• Základní detekce phishingu</li>
                <li>• Limitované sandboxování odkazů</li>
                <li>• Ruční report přes rozšíření</li>
                <li>• Komunita & aktualizace</li>
              </ul>
              <div className="mt-8 flex items-end gap-3">
                <div className="text-3xl font-black text-white">0 Kč</div>
                <div className="text-xs text-blue-300/70">/ navždy</div>
              </div>
              <div className="mt-6"><CTAButton href="#kontakt">Získat zdarma</CTAButton></div>
            </div>
          </Card>

          <Card className="relative">
            <div className="absolute -top-3 left-6"><Badge>FIRMY – NA ZAKÁZKU</Badge></div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white">PhishGuard Custom</h3>
              <p className="mt-2 text-blue-200/80">Enterprise úroveň ochrany, postavená přesně pro vaši organizaci.</p>
              <ul className="mt-6 space-y-3 text-sm text-blue-100/90">
                <li>• Modely a pravidla na míru (CZ/SK)</li>
                <li>• Plná integrace (SIEM, MDM, EDR)</li>
                <li>• SLA, auditovatelnost, školení</li>
                <li>• Dedicated support & onboarding</li>
              </ul>
              <div className="mt-8 flex items-end gap-3">
                <div className="text-3xl font-black text-white">Individuální</div>
                <div className="text-xs text-blue-300/70">/ dle rozsahu</div>
              </div>
              <div className="mt-6"><CTAButton href="#kontakt">Poptat řešení</CTAButton></div>
            </div>
          </Card>
        </div>

        {/* Comparison table */}
        <motion.div className="mt-10 overflow-x-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-blue-200/80">
                <th className="py-3 pr-6">Funkce</th>
                <th className="py-3 pr-6">Free</th>
                <th className="py-3 pr-6">Custom</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/60">
              {[
                ["Detekce phishingu (základ)", "✓", "✓"],
                ["Sandboxování příloh/URL", "Limitované", "Neomezené"],
                ["Integrace M365/GWS", "Rozšíření", "Plná (API)"] ,
                ["Modely CZ/SK na míru", "–", "✓"],
                ["SLA / audit / školení", "–", "✓"],
                ["Podpora", "Komunita", "Dedikovaná"],
              ].map((row, i) => (
                <tr key={i} className="text-blue-100/90">
                  <td className="py-3 pr-6">{row[0]}</td>
                  <td className="py-3 pr-6">{row[1]}</td>
                  <td className="py-3 pr-6">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Section>

      {/* Defence Division */}
      <Section id="defence" title="PhishGuard Defence Division" subtitle="Army‑style jednotka pro aktivní obranu, zakázkovou ochranu a pentesty.">
        <Card className="border-emerald-700/30 bg-gradient-to-br from-emerald-900/20 to-blue-950/20">
          <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300/90 font-semibold tracking-wide">ACTIVE</span>
              </div>
              <h3 className="mt-3 text-2xl font-bold text-white">Zakázková ochrana & pentesty</h3>
              <p className="mt-3 text-blue-200/80">
                Vytváříme obranu na míru proti reálným útočníkům. Simulace útoků, red teaming,
                phishingové a vishingové kampaně, hardening lidí i procesů.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-600/30">Sociální inženýrství na míru</div>
                <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-600/30">Red/Blue teaming</div>
                <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-600/30">Phishing/Vishing tréninky</div>
                <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-600/30">Pentesty aplikací & infra</div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-600/30 text-emerald-200">
                <strong>Speciální nabídka:</strong> nyní zdarma <em>za doporučení</em> – napište nám kontakt na firmu,
                kterou můžeme chránit; pokud dojde k realizaci, vstupní analýza a pilot jsou pro vás zdarma.
              </div>
              <div className="mt-6"><CTAButton href="#kontakt">Domluvit konzultaci</CTAButton></div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl border border-emerald-700/40 bg-[linear-gradient(135deg,_rgba(16,185,129,.2)_0%,_transparent_50%),_radial-gradient(ellipse_at_center,_rgba(59,130,246,.15),_transparent_60%)] shadow-2xl shadow-emerald-900/20" />
              <div className="absolute -bottom-4 -right-4 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-600/40 text-emerald-200 text-xs">CLASSIFIED // LEVEL 3</div>
            </div>
          </div>
        </Card>
      </Section>

      {/* BreachKit */}
      <Section id="breachkit" title="BreachKit – hackerské pomůcky" subtitle="Jsme vývojáři vlastních nástrojů, které sami používáme. Ukázky modulů a rozhraní.">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Carousel items={breachSlides} />
          </div>
          <div className="space-y-4">
            <Card>
              <div className="p-6">
                <h4 className="font-semibold text-white">Co je BreachKit?</h4>
                <p className="mt-2 text-sm text-blue-200/80">Modulární sada nástrojů pro průzkum, simulaci útoků a ověřování obranných opatření.</p>
                <ul className="mt-4 space-y-2 text-sm text-blue-100/90 list-disc list-inside">
                  <li>Recon, phishing, payload builder</li>
                  <li>Bezpečnostní testy a reporting</li>
                  <li>Využití pouze v souladu se smlouvou a zákonem</li>
                </ul>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h4 className="font-semibold text-white">Jak vypadá?</h4>
                <p className="mt-2 text-sm text-blue-200/80">Níže je ukázkový carousel s vizuály rozhraní (ilustrační).</p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* About / Company (author info removed) */}
      <Section id="about" title="O společnosti" subtitle="Phishguard Security – tým zaměřený na precizní obranu proti sociálnímu inženýrství.">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <Card>
            <div className="p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold text-white">Reference & ocenění</h3>
              <div className="mt-4 grow rounded-xl border border-blue-800/50 p-6 bg-[conic-gradient(at_25%_25%,_rgba(59,130,246,.12),_transparent_30%)]">
                <div className="text-blue-100/90">Probíhá sběr referencí – přidejte se mezi pilotní zákazníky.</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>SOČ</Pill>
                  <Pill>KyberCena roku</Pill>
                  <Pill>CTF / bug bounty</Pill>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-8">
              <h3 className="text-xl font-bold text-white">Naše přístupové body</h3>
              <ul className="mt-3 text-sm text-blue-100/90 space-y-2 list-disc list-inside">
                <li>Threat‑driven vývoj (POC → MVP → GA)</li>
                <li>Česko‑slovenské jazykové modely a detekce</li>
                <li>Transparentní reporty a auditovatelnost</li>
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="kontakt" title="Kontaktujte nás" subtitle="Chcete pilot, workshop nebo rovnou ochranu? Ozvěte se.">
        <Card>
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <form className="space-y-4">
              <div>
                <label className="text-sm text-blue-200/80">Jméno</label>
                <input className="mt-1 w-full px-4 py-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="Jan Novák" />
              </div>
              <div>
                <label className="text-sm text-blue-200/80">E‑mail</label>
                <input type="email" className="mt-1 w-full px-4 py-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="jan@firma.cz" />
              </div>
              <div>
                <label className="text-sm text-blue-200/80">Zpráva / doporučení</label>
                <textarea rows={5} className="mt-1 w-full px-4 py-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="Napište nám, koho doporučujete nebo co potřebujete chránit…" />
              </div>
              <div className="flex gap-3">
                <CTAButton as="button" type="submit">Odeslat</CTAButton>
                <a href="#" className="px-5 py-3 rounded-2xl border border-blue-800/60 text-blue-100/90 hover:bg-blue-900/40">Zaslat poptávku</a>
              </div>
            </form>
            <div className="space-y-4">
              <div className="p-6 rounded-xl border border-blue-800/60 bg-blue-900/10">
                <div className="text-sm text-blue-200/80">E‑mail</div>
                <div className="text-white font-semibold">contact@phishguard.security</div>
              </div>
              <div className="p-6 rounded-xl border border-blue-800/60 bg-blue-900/10">
                <div className="text-sm text-blue-200/80">Sídlo</div>
                <div className="text-white">Praha, Česká republika</div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="border-t border-blue-900/60 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 text-sm text-blue-300/70 flex flex-wrap items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} phishguard security. Všechna práva vyhrazena.</div>
          <div className="flex items-center gap-4">
            <NavLink href="#apps">Aplikace</NavLink>
            <NavLink href="#defence">Defence</NavLink>
            <NavLink href="#breachkit">BreachKit</NavLink>
            <NavLink href="#kontakt">Kontakt</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
