'use client'

import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ExpandToggle } from '@/components/ui/ExpandToggle'

const MEMBERS = [
  {
    ini: 'EC',
    img: '/team/emilio.jpg',
    name: 'Emilio Castillo Schmidt',
    role: 'Co-fundador · Jefe de Desarrollo de Software',
    bio: 'Arquitectura y desarrollo full-stack. Estudiante de Ingeniería Civil Informática (UNAB). Lidera la construcción de cada plataforma: del diseño del sistema al despliegue.',
    chips: ['TypeScript / Next.js / NestJS', 'Python / Machine Learning', 'SQL / PostgreSQL', 'IA Generativa (LLMs, RAG)'],
    certs: [] as string[],
  },
  {
    ini: 'CR',
    img: '',
    name: 'Cristóbal Aracena García',
    role: 'Co-fundador · Jefe de Seguridad de la Información',
    bio: 'Especialista en seguridad ofensiva y defensiva. Estudiante de Bachelor in Computer Science. Pentesting, auditorías de red y administración de infraestructura corporativa.',
    chips: [] as string[],
    certs: ['eJPT', 'eWPTX', 'CCNA', 'AWS Cloud Practitioner'],
  },
]

export function Team() {
  return (
    <section className="block" id="equipo" data-screen-label="Equipo">
      <div className="container">
        <SectionHead label="01 — Perfiles" title="Los fundadores."
          sub={<>Un perfil <span style={{ color: 'var(--accent)' }}>construye</span>, el otro <span style={{ color: 'var(--accent)' }}>ataca</span>. Juntos cubren el ciclo completo.</>} />
        <br /><br /><br /><br />
        <div className="team-grid">
          {MEMBERS.map((m, i) => (
            <Reveal as="article" key={m.name} className="member" delay={i * 120}>
              <div className="member-top">
                <div className="avatar">
                  {m.img
                    ? <img src={m.img} alt={m.name} loading="lazy" width={64} height={64} />
                    : m.ini}
                </div>
                <div>
                  <h3>{m.name}</h3>
                  <span className="role">{m.role}</span>
                </div>
              </div>
              <ExpandToggle>
                <div className="member-bio"><p>{m.bio}</p></div>
              </ExpandToggle>
              <div className="chip-row">
                {m.certs.map(c => <span className="chip cert" key={c}>{c}</span>)}
                {m.chips.map(c => <span className="chip" key={c}>{c}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
