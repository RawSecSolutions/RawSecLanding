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

const MISION = {
  title: 'Misión',
  body: 'Proteger y potenciar a las empresas mediante software y ciberseguridad integrados, construyendo soluciones seguras desde su diseño. En RawSec no tratamos la seguridad como un agregado final, sino como parte del desarrollo desde la primera línea de código, entregando a cada organización —grande o pequeña— la tranquilidad de operar en un entorno digital protegido.',
}

const VISION = {
  title: 'Visión',
  body: 'Ser la agencia de referencia en Chile en desarrollo seguro, reconocida por unir ingeniería de software y ciberseguridad en un mismo estándar de calidad. Buscamos crecer no solo a través de servicios, sino desarrollando productos propios que resuelvan necesidades reales del mercado, y hacer que la seguridad digital deje de ser un privilegio de las grandes corporaciones para volverse un derecho al alcance de toda empresa.',
}

const VALORES = [
  { t: 'Seguridad desde el diseño', d: 'La protección no se agrega al final: se piensa desde el primer día de cada proyecto.' },
  { t: 'Excelencia técnica', d: 'Desarrollamos y aseguramos con estándares altos, sin atajos que comprometan la calidad o la protección del cliente.' },
  { t: 'Cercanía y claridad', d: 'Traducimos lo técnico a un lenguaje que el cliente entiende, acompañándolo en cada decisión sin tecnicismos innecesarios.' },
  { t: 'Compromiso transversal', d: 'La seguridad digital importa igual para una PyME que para una gran empresa: no dejamos a nadie fuera por su tamaño.' },
  { t: 'Integridad', d: 'Trabajamos con transparencia, decimos lo que se puede y lo que no, y protegemos la información de nuestros clientes como si fuera propia.' },
]

export function Nosotros() {
  return (
    <section className="block" id="nosotros" data-screen-label="Nosotros">
      <div className="container">
        <SectionHead label="01 — Nosotros" title="Quiénes somos."
          sub={<>Software y ciberseguridad en un mismo equipo. Un perfil <span style={{ color: 'var(--accent)' }}>construye</span>, el otro <span style={{ color: 'var(--accent)' }}>ataca</span>: juntos cubren el ciclo completo.</>} />

        <Reveal><div className="sub-head" style={{ marginTop: 0 }}>Los fundadores</div></Reveal>
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

        <Reveal><div className="sub-head">Misión &amp; visión</div></Reveal>
        <div className="mvv-grid">
          {[MISION, VISION].map((m, i) => (
            <Reveal as="article" key={m.title} className="mvv-card" delay={i * 100}>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal><div className="sub-head">Valores</div></Reveal>
        <div className="values-grid">
          {VALORES.map((v, i) => (
            <Reveal as="article" key={v.t} className="value-card" delay={i * 70}>
              <h4>{v.t}</h4>
              <p>{v.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
