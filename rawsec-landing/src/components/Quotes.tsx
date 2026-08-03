'use client'

import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ExpandToggle } from '@/components/ui/ExpandToggle'
import { goToSection } from '@/lib/utils'

const CASES = [
  {
    client: 'KikiBrows', type: 'LMS & e-commerce', org: 'Academia de estética · La Serena',
    what: 'Plataforma educativa completa: cursos por módulos, evaluaciones (quiz, desarrollo escrito y entrega de video), gestión de alumnas, agenda de consultas integrada con Zoom y tienda con pago BanChile.',
    links: [
      { label: 'Ver plataforma', href: 'https://kikibrows.cl', external: true },
      { label: 'Contactar', href: 'mailto:kikibrows.soporte@gmail.com', external: true },
    ],
  },
  {
    client: 'Mar y Cielo', type: 'Experiencia inmersiva 360°', org: 'Inmobiliaria · La Serena',
    what: 'Recorrido virtual interactivo para que los compradores recorran los terrenos y proyectos desde cualquier dispositivo, sin necesidad de visita presencial.',
    links: [
      { label: 'Ver plataforma', href: 'https://www.mar-cielo.cl', external: true },
      { label: 'Contactar', href: 'mailto:contacto@mar-cielo.cl', external: true },
    ],
  },
  {
    client: 'Dominga Norte', type: 'Integración SII & datos contables', org: 'Inmobiliaria · La Serena',
    what: 'Automatización del flujo entre el software de gestión interno y el SII. Estructuración y limpieza de dos años de datos contables para reporting claro.',
    links: [
      { label: 'Contactar', href: 'mailto:chr.maxsa@gmail.com', external: true },
    ],
  },
  {
    client: 'Minox', type: 'Control de accesos y dominio corporativo', org: 'Empresa · Cuarta Región',
    what: 'Registro del dominio corporativo y configuración de cada usuario con permisos específicos por rol. Todo el equipo centralizado en un solo directorio.',
    links: [
      { label: 'Contactar', href: '#contacto', external: false },
    ],
  },
  {
    client: 'Consulta privada', type: 'Presencia digital profesional', org: 'Psicóloga clínica · La Serena',
    what: 'Sitio web profesional para consulta de psicología clínica: presentación de servicios, información de contacto y agendamiento.',
    links: [
      { label: 'Contactar', href: 'mailto:joanvsa@gmail.com', external: true },
    ],
  },
]

export function Quotes() {
  return (
    <section className="block" id="proyectos" data-screen-label="Proyectos">
      <div className="container">
        <SectionHead label="04 — Proyectos" title="Lo que hemos hecho." sub="Proyectos reales con clientes reales." />
        <br />
        <div className="cases-grid">
          {CASES.map((c, i) => (
            <Reveal key={i} className="case" delay={i * 80}>
              <div className="case-top">
                <span className="case-type">{c.type}</span>
                <span className="case-client">{c.client}</span>
                <span className="case-org">{c.org}</span>
              </div>
              <ExpandToggle>
                <p className="case-what">{c.what}</p>
              </ExpandToggle>
              <div className="case-ctas">
                {c.links.map(link => (
                  link.external
                    ? <a key={link.label} className="case-cta" href={link.href} target="_blank" rel="noopener noreferrer">{link.label} →</a>
                    : <button key={link.label} className="case-cta" onClick={() => goToSection('contacto')} type="button">{link.label} →</button>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
