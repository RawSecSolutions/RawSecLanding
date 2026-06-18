import { useState, useEffect, useMemo } from 'react';

import { Nav, Strip, Services, Process, FeaturedProject, Team, Quotes, ClientsStrip, Contact, Footer } from './sections';
import { HeroBlueprint } from './heroes';
import { LoadScreen, signalAppReady } from './fx';
import { RAWSEC_I18N } from './data';

export default function App() {
  const [lang, setLangState] = useState<'es' | 'en'>(() => {
    try {
      return (localStorage.getItem('rawsec_lang') as 'es' | 'en') || 'es';
    } catch {
      return 'es';
    }
  });

  const setLang = (l: 'es' | 'en') => {
    setLangState(l);
    try { localStorage.setItem('rawsec_lang', l); } catch { /* noop */ }
  };

  const L = RAWSEC_I18N[lang];

  const reduced = useMemo(() =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const motionLevel = reduced ? 'min' : 'max';

  useEffect(() => {
    document.documentElement.style.setProperty('--font-heading', 'var(--font-display)');
    document.body.classList.toggle('bg-grid', true);
    document.body.classList.toggle('scanlines', false);
    document.body.classList.toggle('motion-min', motionLevel === 'min');
    document.documentElement.lang = lang;
  }, [motionLevel, lang]);

  // Señal "app lista": React montó todo el árbol → esperamos que el browser esté idle
  useEffect(() => {
    // rAF garantiza al menos un frame pintado antes de pedir idle
    requestAnimationFrame(() => {
      if ('requestIdleCallback' in window) {
        (window as Window & typeof globalThis & { requestIdleCallback: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number })
          .requestIdleCallback(() => signalAppReady(), { timeout: 2500 });
      } else {
        // Fallback: 2 frames más = browser ha compuesto las capas
        requestAnimationFrame(() => requestAnimationFrame(() => signalAppReady()));
      }
    });
  }, []);

  return (
    <>
      <LoadScreen />
      <Nav L={L} lang={lang} setLang={setLang} />
      <HeroBlueprint L={L} motionLevel={motionLevel} />
      <Strip L={L} />
      <main>
        <Services L={L} />
        <Process L={L} motionLevel={motionLevel} />
        <FeaturedProject L={L} />
        <Team L={L} />
        <Quotes L={L} />
        <ClientsStrip items={L.quotes.clientsStrip || []} />
        <Contact L={L} />
      </main>
      <Footer L={L} />
    </>
  );
}
