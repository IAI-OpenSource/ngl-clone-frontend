import React, { useState, useEffect } from "react";
import { Link } from "react-router"
import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping.ts"

//types , vu que j'avais fais en jsx j'ai du reconvertir
interface PrimaryNavProps {
  onMenuOpen: () => void;
}

interface SecondaryNavProps {
  visible: boolean;
  onMenuOpen: () => void;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}


const GamepadIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4" />
      <path d="M8 10v4" />
      <path d="M15 13h.01" />
      <path d="M18 11h.01" />
    </svg>
  );
};

const SmileyIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <path d="M8 14s1.5 3 4 3 4-3 4-3" />
    </svg>
  );
};

interface BurgerLinesProps {
  size?: number;
}

const BurgerLines: React.FC<BurgerLinesProps> = ({ size = 18 }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
};

const CloseIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

const TICKER_ITEMS: string[] = [
  "partage ton avis qui dérange",
  "dis-moi qui est ton crush",
  "envoie tes confessions",
  "demande-moi n'importe quoi",
  "pas de mensonge",
  "un 'tu n'as jamais' ?",
];

const NAV_LINKS: string[] = ["À propos", "Confidentialité"];

const PHRASES: string[] = [
  "c'est qui\nton crush ?",
  "balance ton\npire secret",
  "tu n'as\njamais fait ?",
  "un avis qui\ndécoiffe ?",
  "dis tout\nsans filtre",
  "mentir ?\njamais",
  "ton plus grand\nregret ?",
  "ngl version IAI"
];

const Ticker: React.FC = () => {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ngl-ticker-outer">
      <div className="ngl-ticker-track">
        {items.map((txt, i) => (
          <span key={i} className="ngl-ticker-item">
            <span className="ngl-ticker-dot">•</span>
            {txt}
          </span>
        ))}
      </div>
    </div>
  );
};

const StorePill: React.FC = () => {
  return (
    <div className="ngl-store">
      <a rel="noopener noreferrer" className="ngl-store-icon">
        <GamepadIcon />
      </a>
      <span className="ngl-store-sep" />
      <a rel="noopener noreferrer" className="ngl-store-icon">
        <SmileyIcon />
      </a>
    </div>
  );
};

const PrimaryNav: React.FC<PrimaryNavProps> = ({ onMenuOpen }) => {
  return (
    <nav className="ngl-primary-nav">
      <a href="#" className="ngl-logo-a">
        <img src="/ngl-logo.png" alt="NGL" className="ngl-logo" />
      </a>

      <div className="ngl-nav-links ngl-d-only">
        {NAV_LINKS.map((l) => (
          <a key={l} href="#" className="ngl-nav-link">
            {l}
          </a>
        ))}
      </div>

      <div className="ngl-d-only">
        <StorePill />
      </div>

      <button
        className="ngl-burger ngl-m-only"
        onClick={onMenuOpen}
        aria-label="Ouvrir le menu"
      >
        <BurgerLines size={18} />
      </button>
    </nav>
  );
};

const SecondaryNav: React.FC<SecondaryNavProps> = ({ visible, onMenuOpen }) => {
  return (
    <nav
      className="ngl-secondary-nav"
      style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <a href="#" className="ngl-logo-a">
        <img src="/ngl.png" alt="NGL" className="ngl-logo ngl-logo-sm" />
      </a>

      <div className="ngl-nav-links ngl-d-only">
        {NAV_LINKS.map((l) => (
          <a key={l} href="#" className="ngl-nav-link">
            {l}
          </a>
        ))}
      </div>

      <div className="ngl-d-only">
        <StorePill />
      </div>

      <button
        className="ngl-burger ngl-burger-ghost ngl-m-only"
        onClick={onMenuOpen}
        aria-label="Ouvrir le menu"
      >
        <BurgerLines size={16} />
      </button>
    </nav>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className="ngl-overlay"
      style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      aria-hidden={!open}
    >
      <div className="ngl-overlay-header">
        <img src="/ngl.png" alt="NGL" className="ngl-logo" />
        <button className="ngl-close-btn" onClick={onClose} aria-label="Fermer">
          <CloseIcon />
        </button>
      </div>

      <div className="ngl-overlay-links">
        {NAV_LINKS.map((l) => (
          <a key={l} href="#" className="ngl-overlay-link" onClick={onClose}>
            {l}
          </a>
        ))}
      </div>

      <div className="ngl-overlay-foot">
        <StorePill />
      </div>
    </div>
  );
};

const Hero = () => {
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PHRASES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ngl-hero">
      <h1 className="ngl-h1">
        <span key={i} className="ngl-phrase">{PHRASES[i]}</span>
      </h1>
        <Link to={CLIENT_ROUTES_MAPPING.THREADS}>

      <button className="ngl-cta">
        Choisis ta classe
      </button>
        </Link>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="ngl-footer">
      <div className="ngl-footer-inner">
        <img src="/ngl-logo.png" alt="NGL" className="ngl-logo ngl-logo-sm" />

        <nav className="ngl-footer-links">
          {[
            ["À propos", "#"],
            ["Confidentialité", "#"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="ngl-footer-link">
              {l}
            </a>
          ))}
        </nav>

        <p className="ngl-tagline">Made by @Benito404 et son fils @Sevtify[404]</p>
      </div>
    </footer>
  );
};

const CSS: string = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@900&family=Inter:wght@400;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; scrollbar-width: none; }
  ::-webkit-scrollbar { display: none; }

  @keyframes ngl-tick {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes ngl-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ngl-root {
    background: #000;
    min-height: 100vh;
    font-family: "Inter", sans-serif;
    color: #fff;
  }

  .ngl-ticker-zone {
    background: #000;
    position: relative;
    z-index: 10;
  }
  .ngl-ticker-outer {
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
    padding: 10px 0;
  }
  .ngl-ticker-track {
    display: flex;
    animation: ngl-tick 28s linear infinite;
    width: max-content;
  }
  .ngl-ticker-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 12px;
    flex-shrink: 0;
    color: #fff;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.02em;
    white-space: nowrap;
    font-family: "Inter", sans-serif;
  }
  .ngl-ticker-dot {
    color: rgba(255, 255, 255, 0.45);
    font-size: 9px;
  }

  .ngl-gradient-zone {
    background: linear-gradient(180deg, #f5e659ff 0%, #FE831B 100%);
    border-radius: 26px 26px 0 0;
    overflow: hidden;
    position: relative;
  }

  .ngl-primary-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px;
  }

  .ngl-secondary-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 900;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 48px;
    transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ngl-logo-a { text-decoration: none; display: flex; align-items: center; flex-shrink: 0; }
  .ngl-logo    { height: 86px; display: block; }
  .ngl-logo-sm { height: 86px; }

  .ngl-nav-links { display: flex; align-items: center; }
  .ngl-nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.02em;
    padding: 8px 16px;
    border-radius: 80px;
    font-family: "Inter", sans-serif;
    transition: background 0.15s;
  }
  .ngl-nav-link:hover { background: rgba(255, 255, 255, 0.15); }

  .ngl-store {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #000;
    border-radius: 999px;
    padding: 10px 16px 10px 10px;
  }
  .ngl-store-icon {
    display: flex; align-items: center; justify-content: center;
    width: 28px; height: 28px;
    color: #fff; text-decoration: none;
  }
  .ngl-store-sep {
    display: block;
    width: 1px; height: 18px;
    background: rgba(255, 255, 255, 0.2);
  }

  .ngl-burger {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: #000;
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .ngl-burger-ghost {
    width: 40px; height: 40px;
    background: rgba(255, 255, 255, 0.12);
  }

  .ngl-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 72px 48px 96px;
    position: relative;
    min-height: 480px;
  }
  .ngl-h1 {
    font-size: clamp(64px, 10vw, 120px);
    font-weight: 900;
    font-family: "Nunito", "Inter", sans-serif;
    color: #fff;
    line-height: 0.92;
    letter-spacing: -0.04em;
    margin: 0 0 36px;
    white-space: pre-line;
  }
  .ngl-phrase {
    display: block;
    animation: ngl-up 0.4s ease forwards;
  }
  .ngl-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 999px;
    padding: 16px 40px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #FE831B;
    font-family: "Inter", sans-serif;
    transition: opacity 0.15s;
    border: none;
    cursor: pointer;
  }
  .ngl-cta:hover { opacity: 0.88; }
  .ngl-scroll-hint {
    position: absolute;
    bottom: 20px; left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.75);
    font-size: 13px; font-weight: 800;
    letter-spacing: -0.02em;
    white-space: nowrap;
    margin: 0;
  }

  .ngl-features { background: #000; padding: 72px 48px 88px; }
  .ngl-features-h2 {
    color: #fff;
    font-size: clamp(56px, 7.5vw, 96px);
    font-weight: 900;
    font-family: "Nunito", "Inter", sans-serif;
    line-height: 0.92;
    letter-spacing: -0.04em;
    margin: 0 0 16px;
  }
  .ngl-feature-row {
    color: #fff;
    font-size: clamp(32px, 4.4vw, 60px);
    font-weight: 900;
    font-family: "Nunito", "Inter", sans-serif;
    letter-spacing: -0.04em;
    line-height: 1.16;
  }

  .ngl-footer {
    background: transparent ;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 32px 48px 40px;
  }
  .ngl-footer-inner {
    display: flex; align-items: center;
    justify-content: space-between;
    flex-wrap: wrap; gap: 24px;
  }
  .ngl-footer-links {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    flex: 1;
    justify-content: center;
  }
  .ngl-footer-link {
    color: #fff; text-decoration: none;
    font-size: 13px; font-weight: 800;
    letter-spacing: -0.02em; padding: 8px 14px;
    font-family: "Inter", sans-serif;
  }
  .ngl-footer-legal { display: flex; gap: 12px; align-items: center; }
  .ngl-legal-link {
    color: rgba(255, 255, 255, 0.5); text-decoration: none;
    font-size: 12px; font-weight: 800;
    font-family: "Inter", sans-serif;
  }
  .ngl-tagline {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px; font-weight: 800;
    margin: 0; font-family: "Inter", sans-serif;
  }

  .ngl-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: transparent;
    display: flex; flex-direction: column;
    padding: 16px 24px 40px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ngl-overlay-header {
    display: flex; align-items: center;
    justify-content: space-between;
    margin-bottom: 48px;
  }
  .ngl-overlay-links {
    display: flex; flex-direction: column;
    gap: 4px; flex: 1;
  }
  .ngl-overlay-link {
    color: #fff; text-decoration: none;
    font-size: 38px; font-weight: 900;
    font-family: "Nunito", "Inter", sans-serif;
    letter-spacing: -0.04em; line-height: 1.25;
    padding: 6px 0;
  }
  .ngl-overlay-foot { padding-top: 24px; }
  .ngl-close-btn {
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }

  .ngl-d-only { display: flex; }
  .ngl-m-only { display: none; }

  @media (max-width: 768px) {
    .ngl-d-only { display: none !important; }
    .ngl-m-only { display: flex !important; }

    .ngl-gradient-zone  { border-radius: 20px 20px 0 0; }
    .ngl-primary-nav    { padding: 14px 20px; }
    .ngl-secondary-nav  { padding: 12px 20px; }
    .ngl-hero           { padding: 48px 20px 72px; min-height: 420px; }
    .ngl-features       { padding: 48px 20px 64px; }
    .ngl-footer         { padding: 24px 20px 32px; }
  }

  a:focus-visible, button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

// accepppte la prop onchoooseclass
const LandingPage = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="ngl-root">
      <style>{CSS}</style>
      <div className="ngl-ticker-zone"><Ticker /></div>
      <SecondaryNav visible={scrolled} onMenuOpen={() => setMenuOpen(true)} />
      <div className="ngl-gradient-zone">
        <PrimaryNav onMenuOpen={() => setMenuOpen(true)} />
        <Hero />
      </div>
      <Footer />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default LandingPage;