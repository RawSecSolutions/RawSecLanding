import React, { useState, useEffect, useMemo } from 'react';

// Importaciones activas (asumiendo que los archivos están en la misma carpeta)
import { Nav, Strip, Services, Process, FeaturedProject, Team, Quotes, Contact, Footer } from './sections';
import { HeroBlueprint } from './heroes';
import { RAWSEC_I18N } from './data';

export default function App() {
  const [lang, setLangState] = useState<'es' | 'en'>(() => {
    try { 
      return (localStorage.getItem('rawsec_lang') as 'es' | 'en') || 'es'; 
    } catch (e) { 
      return 'es'; 
    }
  });

  const setLang = (l: 'es' | 'en') => { 
    setLangState(l); 
    try { localStorage.setItem('rawsec_lang', l); } catch (e) {} 
  };
  
  const L = RAWSEC_I18N[lang];

  const reduced = useMemo(() =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  
  const motionLevel = reduced ? 'min' : 'max';

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', '#2dd4bf'); 
    document.documentElement.style.setProperty('--font-heading', 'var(--font-display)'); 
    
    document.body.classList.toggle('bg-grid', true);
    document.body.classList.toggle('scanlines', false);
    document.body.classList.toggle('motion-min', motionLevel === 'min');
    document.documentElement.lang = lang;
  }, [motionLevel, lang]);

  return (
    <>
      <Nav L={L} lang={lang} setLang={setLang} />
      <HeroBlueprint L={L} motionLevel={motionLevel} />
      <Strip L={L} />
      <main>
        <Services L={L} />
        <Process L={L} motionLevel={motionLevel} />
        <FeaturedProject L={L} />
        <Team L={L} />
        <Quotes L={L} />
        <Contact L={L} />
      </main>
      <Footer L={L} />
    </>
  );
}