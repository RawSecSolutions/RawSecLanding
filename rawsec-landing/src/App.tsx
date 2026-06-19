import { useEffect, useMemo } from 'react';

import { Nav, Strip, Services, Process, FeaturedProject, Team, Quotes, ClientsStrip, Contact, Ecosystem, Footer } from './sections';
import { HeroBlueprint } from './heroes';
import { LoadScreen, signalAppReady } from './fx';
import { RAWSEC_DATA } from './data';

export default function App() {
  const L = RAWSEC_DATA;

  const reduced = useMemo(() =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const motionLevel = reduced ? 'min' : 'max';

  useEffect(() => {
    document.documentElement.style.setProperty('--font-heading', 'var(--font-display)');
    document.body.classList.toggle('bg-grid', true);
    document.body.classList.toggle('scanlines', false);
    document.body.classList.toggle('motion-min', motionLevel === 'min');
    document.documentElement.lang = 'es';
  }, [motionLevel]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if ('requestIdleCallback' in window) {
        (window as Window & typeof globalThis & { requestIdleCallback: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number })
          .requestIdleCallback(() => signalAppReady(), { timeout: 2500 });
      } else {
        requestAnimationFrame(() => requestAnimationFrame(() => signalAppReady()));
      }
    });
  }, []);

  return (
    <>
      <LoadScreen />
      <Nav L={L} />
      <HeroBlueprint L={L} motionLevel={motionLevel} />
      <Strip L={L} />
      <main>
        <Team L={L} />
        <Quotes L={L} />
        <ClientsStrip items={L.quotes.clientsStrip || []} />
        <Process L={L} motionLevel={motionLevel} />
        <Services L={L} />
        <FeaturedProject L={L} />
        <Ecosystem L={L} />
        <Contact L={L} />
      </main>
      <Footer L={L} />
    </>
  );
}
