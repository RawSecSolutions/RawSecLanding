'use client'

import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ExpandToggle } from '@/components/ui/ExpandToggle'
import { goToSection } from '@/lib/utils'

const ITEMS = [
  {
    name: 'Herramienta Ley 21.719', tag: 'Acceso anticipado',
    desc: 'Agente de cumplimiento normativo para empresas chilenas. Evalúa, documenta y monitorea tu adecuación a la nueva ley de protección de datos.',
    href: 'herramientas', external: false, cta: 'Ver herramienta',
  },
  {
    name: 'RawClases', tag: 'Próximamente',
    desc: 'LMS escalable para venta como SaaS construido sobre la experiencia de KikiBrows y listo para cualquier tipo de academia o curso online.',
    href: null, external: false, cta: 'Próximamente',
  },
]

export function Ecosystem() {
  return (
    <section className="block" id="ecosistema" data-screen-label="Ecosistema RawSec">
      <div className="container">
        <SectionHead label="06 — Ecosistema RawSec" title="Más de la marca." />
        <div className="eco-grid">
          {ITEMS.map((item, i) => (
            <Reveal key={i} className="eco-card" delay={i * 120}>
              <div className="eco-tag">{item.tag}</div>
              <h4 className="eco-name">{item.name}</h4>
              <ExpandToggle>
                <p className="eco-desc">{item.desc}</p>
              </ExpandToggle>
              {item.href
                ? <a className="eco-cta" href={`#${item.href}`}
                    onClick={e => { e.preventDefault(); goToSection(item.href!) }}>
                    {item.cta} →
                  </a>
                : <span className="eco-cta eco-soon">{item.cta}</span>
              }
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
