'use client'

import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ExpandToggle } from '@/components/ui/ExpandToggle'
import { goToSection } from '@/lib/utils'
import { RAWSEC_EMAIL, MAIL_SUBJECT } from '@/lib/constants'

const TIERS = [
  {
    title: 'Desarrollo Seguro',
    tag: 'Estándar base · incluido en todo proyecto',
    badge: 'Incluido',
    summary: 'Software con seguridad incorporada desde el diseño. Viene aplicado por defecto en cada plataforma que construimos, sin costo adicional.',
    detail: [
      'Validación y sanitización de inputs (anti inyección y XSS)',
      'Autenticación segura: hashing bcrypt/Argon2 y bloqueo por fuerza bruta',
      'Sesiones y cookies endurecidas (HttpOnly, Secure)',
      'Cobertura del OWASP Top 10',
      'Gestión de secretos en variables de entorno',
      'Cifrado en tránsito (HTTPS/TLS) y en reposo',
      'Control de accesos por roles (RBAC)',
      'Headers de seguridad, CORS y rate limiting',
    ],
    note: 'No incluye informe formal ni pentest. Si necesitas esa acreditación, corresponde al Desarrollo Auditado.',
  },
  {
    title: 'Desarrollo Auditado',
    tag: 'Todo lo anterior + pentest formal con informe firmado',
    badge: null,
    summary: 'Al terminar el desarrollo, un pentester certificado (eJPT, eWPTX) audita la plataforma como parte independiente y entrega informe firmado.',
    detail: [
      'Todo lo del Desarrollo Seguro',
      'Pentest manual de la aplicación terminada',
      'Informe ejecutivo (gerencia) + informe técnico detallado',
      'Hallazgos priorizados por impacto y esfuerzo',
      'Mapeo contra OWASP ASVS y controles ISO 27001 (Anexo A)',
      'Un retest incluido tras aplicar las correcciones',
    ],
    note: 'RawSec entrega la evidencia técnica; la certificación ISO 27001 la emite un organismo acreditado.',
  },
  {
    title: 'Servicios Particulares',
    tag: 'Auditoría independiente sobre sistemas que ya tienes',
    badge: null,
    summary: 'Servicios de seguridad individuales sobre tu infraestructura existente, sin desarrollo de por medio. Cada uno se cotiza por separado según el alcance.',
    detail: [
      'Pentest web / API (eJPT, eWPTX)',
      'Auditoría de red (CCNA)',
      'Auditoría cloud AWS contra CIS Benchmarks',
      'Hardening de servidores (Linux / Windows)',
      'Análisis de vulnerabilidades',
      'Revisión de control de accesos',
      'Gap analysis vs OWASP ASVS / ISO 27001 / CIS',
    ],
    note: 'Requiere autorización escrita del cliente para probar sus sistemas.',
  },
]

export function Services() {
  return (
    <section className="block" id="servicios" data-screen-label="Servicios">
      <div className="container">
        <SectionHead label="02 — Servicios" title="Un solo equipo. Mentalidad ofensiva."
          sub={<>No solo construimos: <span style={{ color: 'var(--accent)' }}>desarrollamos sabiendo cómo se rompe</span>. Tres niveles según lo que necesites — desde software con seguridad incluida hasta auditoría independiente de tus sistemas.</>} />
        <div className="tier-grid">
          {TIERS.map((t, i) => (
            <Reveal as="article" className="svc" key={t.title} delay={i * 100}>
              <div className="svc-head-row">
                <span className="idx">/0{i + 1}</span>
                {t.badge && <span className="svc-badge">{t.badge}</span>}
              </div>
              <h3>{t.title}</h3>
              <p className="svc-tag">{t.tag}</p>
              <p>{t.summary}</p>
              <ExpandToggle>
                <div className="contenido-desplegable">
                  <ul>{t.detail.map(d => <li key={d}>{d}</li>)}</ul>
                  {t.note && <p className="svc-note">{t.note}</p>}
                </div>
              </ExpandToggle>
            </Reveal>
          ))}
        </div>
        <div className="svc-ctas">
          <a className="btn btn-primary"
            href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`}>
            Agendar reunión <span className="arrow">→</span>
          </a>
          <button className="btn btn-ghost" onClick={() => goToSection('proyectos')} type="button">
            Ver proyectos
          </button>
        </div>
      </div>
    </section>
  )
}
