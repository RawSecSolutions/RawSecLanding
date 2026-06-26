import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const SITE_URL = 'https://www.rawsecsolutions.com'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const KEYWORDS = [
  // Marca
  'rawsec', 'rawsec solutions', 'rawsecsolutions', 'rawsec solutions spa',
  'rawsecsolutions.com', 'rawsec chile', 'rawsec ciberseguridad', 'rawsec software',

  // Ciberseguridad general
  'ciberseguridad', 'ciberseguridad chile', 'ciberseguridad santiago',
  'cybersecurity chile', 'cybersecurity santiago', 'seguridad informática chile',
  'seguridad informática santiago', 'seguridad cibernética chile',
  'empresa ciberseguridad chile', 'empresa de ciberseguridad chile',
  'empresa ciberseguridad santiago', 'consultoría ciberseguridad chile',
  'servicio de ciberseguridad chile', 'agencia ciberseguridad chile',
  'especialistas en ciberseguridad chile', 'profesional ciberseguridad chile',
  'contratar ciberseguridad chile', 'mejores empresas ciberseguridad chile',

  // Pentesting
  'pentesting', 'pentesting chile', 'pentesting santiago',
  'pentest chile', 'pentest web chile', 'empresa pentesting chile',
  'empresa de pentesting chile', 'servicio pentesting chile',
  'contratar pentester chile', 'pentester chile', 'pentester santiago',
  'pentesting web chile', 'pentesting aplicaciones web chile',
  'pentesting de infraestructura chile', 'pentesting api chile',
  'pentesting red chile', 'pentesting móvil chile', 'pentesting cloud chile',
  'prueba de penetración chile', 'pruebas de penetración chile',
  'test de penetración chile', 'test de intrusión chile',
  'quien hace pentesting en chile', 'donde contratar pentesting chile',
  'servicio pentesting chile precio',

  // Hacking ético
  'hacking ético', 'hacking ético chile', 'hacking ético santiago',
  'ethical hacking chile', 'ethical hacking santiago',
  'hacker ético chile', 'hackers éticos chile',
  'contratar hacker ético chile', 'servicios hacking ético chile',
  'offensive security chile', 'seguridad ofensiva chile',

  // Red team / Blue team
  'red team chile', 'red team santiago', 'ejercicio red team chile',
  'blue team chile', 'purple team chile', 'threat simulation chile',
  'simulación de ataque chile', 'adversary simulation chile',

  // Auditorías
  'auditoría de seguridad chile', 'auditoría de seguridad santiago',
  'auditoría informática chile', 'auditoría ciberseguridad chile',
  'auditoría de vulnerabilidades chile', 'auditoría de sistemas chile',
  'análisis de vulnerabilidades chile', 'evaluación de seguridad chile',
  'security assessment chile', 'vulnerability assessment chile',
  'auditoría web chile', 'auditoría de red chile', 'auditoría cloud chile',
  'auditorías certificadas chile', 'contratar auditoría seguridad chile',

  // OWASP y vectores de ataque
  'owasp chile', 'owasp top 10 chile', 'owasp testing chile',
  'sql injection chile', 'inyección sql chile', 'xss chile',
  'cross site scripting chile', 'csrf chile', 'idor chile',
  'broken authentication chile', 'análisis owasp chile',
  'ssrf chile', 'rce chile', 'lfi chile', 'rfi chile',
  'privilege escalation chile', 'buffer overflow chile',

  // Hardening
  'hardening chile', 'hardening de servidores chile', 'hardening linux chile',
  'hardening windows chile', 'hardening cloud chile', 'hardening aws chile',
  'bastionado de sistemas chile', 'securización chile',
  'configuración segura chile', 'cis benchmark chile',

  // DevSecOps
  'devsecops', 'devsecops chile', 'devsecops santiago',
  'desarrollo seguro chile', 'software seguro chile', 'secure sdlc chile',
  'sast chile', 'dast chile', 'iast chile', 'sca chile',
  'análisis estático chile', 'análisis dinámico chile',
  'pipeline seguro chile', 'ci cd seguro chile', 'shift left security chile',
  'seguridad en el desarrollo chile', 'software born secure chile',
  'arquitectura segura chile', 'plataformas seguras chile',
  'software auditado chile',

  // Cloud security
  'cloud security chile', 'seguridad en la nube chile',
  'aws security chile', 'seguridad aws chile', 'cloud compliance chile',
  'iam security chile', 'iam hardening chile',
  'amazon web services seguridad chile',

  // Certificaciones
  'ejpt', 'ejpt chile', 'ejpt certified', 'junior penetration tester chile',
  'ewptx', 'ewptx chile', 'web application penetration tester extreme',
  'ccna', 'ccna chile', 'cisco certified network associate chile',
  'oscp chile', 'oscp certified chile',
  'offensive security certified professional chile',
  'ceh chile', 'certified ethical hacker chile', 'ec-council chile',
  'pnpt chile', 'practical network penetration tester chile',
  'comptia security plus chile', 'comptia pentest plus chile',
  'aws certified security specialty chile', 'aws cloud practitioner chile',
  'security certifications chile', 'certificaciones ciberseguridad chile',
  'profesionales certificados ciberseguridad chile',

  // Compliance
  'cumplimiento ley 21719', 'ley 21719', 'ley 21719 chile',
  'ley de protección de datos chile', 'ley de ciberseguridad chile',
  'protección de datos personales chile', 'cumplimiento normativo chile',
  'adecuación ley 21719 chile', 'implementación ley 21719 chile',
  'gdpr chile', 'iso 27001 chile', 'iso 27001 implementación chile',
  'iso 27001 auditoría chile', 'soc 2 chile', 'pci dss chile',
  'consultoría iso 27001 chile', 'normativa ciberseguridad chile',

  // Herramientas de seguridad conocidas
  'burp suite chile', 'metasploit chile', 'nmap chile',
  'wireshark chile', 'kali linux chile', 'parrot os chile',
  'gobuster chile', 'nikto chile', 'sqlmap chile', 'hydra chile',
  'john the ripper chile', 'hashcat chile', 'bloodhound chile',
  'nessus chile', 'openvas chile', 'zap owasp chile',
  'ffuf chile', 'subfinder chile', 'amass chile', 'recon-ng chile',

  // Desarrollo de software
  'software a medida', 'software a medida chile', 'software a medida santiago',
  'desarrollo de software', 'desarrollo de software chile', 'desarrollo de software santiago',
  'empresa de desarrollo de software chile', 'empresa de software chile',
  'empresa tech chile', 'empresa tecnológica chile',
  'startup tecnológica chile', 'consultoría tecnológica chile',
  'soluciones digitales chile', 'transformación digital chile',
  'agencia digital chile', 'agencia de desarrollo web chile',
  'fábrica de software chile', 'plataformas a medida chile',
  'software empresarial chile', 'software para empresas chile',
  'sistemas de gestión chile', 'contratar desarrolladores chile',
  'contratar programadores chile', 'programadores chile',

  // Desarrollo web
  'desarrollo web', 'desarrollo web chile', 'desarrollo web santiago',
  'aplicaciones web', 'aplicaciones web chile', 'apps web chile',
  'desarrollo de aplicaciones web chile', 'sitios web chile',
  'desarrollo frontend chile', 'desarrollo backend chile',
  'full stack chile', 'fullstack chile',

  // SaaS / E-commerce / LMS
  'desarrollo saas', 'saas chile', 'plataforma saas chile',
  'e-commerce chile', 'tienda online chile', 'ecommerce chile',
  'desarrollo e-commerce chile', 'webpay chile', 'transbank chile',
  'pasarela de pago chile', 'pagos online chile', 'mercadopago chile',
  'lms chile', 'plataforma educativa chile', 'e-learning chile',
  'sistema de gestión de aprendizaje chile',

  // Stack técnico
  'react chile', 'next.js chile', 'nextjs chile', 'typescript chile',
  'javascript chile', 'node.js chile', 'python chile',
  'django chile', 'fastapi chile', 'nestjs chile',
  'aws chile', 'docker chile', 'kubernetes chile',
  'postgresql chile', 'mongodb chile', 'redis chile',
  'api rest chile', 'graphql chile', 'microservicios chile',
  'github actions chile', 'ci cd chile',

  // Inteligencia artificial
  'inteligencia artificial chile', 'ia aplicada chile', 'ia chile',
  'ai chile', 'machine learning chile', 'deep learning chile',
  'chatbot ia chile', 'rag chatbot chile', 'rag chile',
  'agentes ia chile', 'llm chile', 'gpt chile',
  'automatización con ia chile', 'ia para empresas chile',
  'desarrollo ia chile',

  // Combo desarrollo + ciberseguridad
  'empresa de desarrollo y ciberseguridad chile',
  'desarrollo de software seguro chile',
  'agencia software y ciberseguridad chile',
  'empresa full stack y pentesting chile',
  'desarrollar y auditar chile', 'desarrollo seguro y pentesting chile',
  'empresa de hacking y desarrollo chile',

  // Long-tail / intención de búsqueda
  'contratar empresa ciberseguridad chile',
  'contratar pentester santiago', 'contratar red team chile',
  'buscar empresa ciberseguridad chile',
  'empresa ciberseguridad santiago recomendada',
  'empresa ciberseguridad pyme chile',
  'seguridad para startups chile', 'ciberseguridad para pymes chile',
  'ciberseguridad para empresas chile',
  'proteger empresa de ciberataques chile',
  'prevenir ciberataques chile',
  'quien ofrece pentesting en chile',
  'donde hacer auditoría de seguridad chile',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'RawSec Solutions',
      alternateName: ['RawSec', 'Rawsec Solutions SpA'],
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg`, width: 512, height: 512 },
      image: `${SITE_URL}/og-image.png`,
      description: 'Empresa chilena de desarrollo de software a medida y ciberseguridad. Full-stack + DevSecOps bajo un mismo equipo. Santiago, Chile.',
      email: 'rawsecsolutions@gmail.com',
      foundingLocation: { '@type': 'Place', name: 'Santiago, Chile' },
      areaServed: [
        { '@type': 'Country', name: 'Chile' },
        { '@type': 'City', name: 'Santiago' },
      ],
      knowsAbout: [
        'Desarrollo de software a medida', 'Ciberseguridad ofensiva',
        'Pentesting y auditorías de seguridad', 'Hacking ético', 'DevSecOps',
        'Inteligencia artificial aplicada', 'Cumplimiento Ley 21.719',
        'Protección de datos personales', 'E-commerce', 'Integración de pagos', 'Software para empresas',
      ],
      sameAs: ['https://github.com/RawSecSolutions'],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'RawSec Solutions',
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      description: 'Empresa de desarrollo de software a medida y ciberseguridad en Santiago, Chile.',
      email: 'rawsecsolutions@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santiago',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL',
      },
      geo: { '@type': 'GeoCoordinates', latitude: -33.4569, longitude: -70.6483 },
      priceRange: '$$',
      currenciesAccepted: 'CLP, USD',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'RawSec Solutions',
      description: 'Software a medida y ciberseguridad en Chile',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['es-CL', 'en-US'],
    },
    {
      '@type': 'ItemList',
      name: 'Servicios de RawSec Solutions',
      itemListElement: [
        { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'Software a medida', description: 'Desarrollo de software a medida en Chile: apps web, SaaS, e-commerce, LMS, integraciones y automatización.', provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'Chile', serviceType: 'Desarrollo de software' } },
        { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'Ciberseguridad ofensiva y pentesting', description: 'Pentesting web y de infraestructura, hacking ético, auditorías de seguridad y hardening en Chile.', provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'Chile', serviceType: 'Ciberseguridad' } },
        { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'Cumplimiento Ley 21.719', description: 'Preparación para la Ley 21.719 de protección de datos personales en Chile.', provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'Chile', serviceType: 'Consultoría de cumplimiento normativo' } },
        { '@type': 'ListItem', position: 4, item: { '@type': 'Service', name: 'IA Aplicada', description: 'Chatbots RAG, pipelines de Machine Learning y agentes con LLMs para empresas en Chile.', provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'Chile', serviceType: 'Inteligencia artificial aplicada' } },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Qué es RawSec Solutions?', acceptedAnswer: { '@type': 'Answer', text: 'RawSec Solutions es una empresa chilena de desarrollo de software a medida y ciberseguridad con sede en Santiago. Ofrecemos desarrollo full-stack, pentesting, auditorías, DevSecOps, IA aplicada y cumplimiento Ley 21.719.' } },
        { '@type': 'Question', name: '¿Hacen pentesting y auditorías de ciberseguridad en Chile?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Realizamos pentesting web, pentesting de infraestructura, hacking ético, análisis de vulnerabilidades y auditorías con metodología certificada.' } },
        { '@type': 'Question', name: '¿Ayudan con el cumplimiento de la Ley 21.719?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Preparamos empresas chilenas para la Ley 21.719 con diagnóstico de brechas, implementación de políticas y automatización del cumplimiento.' } },
        { '@type': 'Question', name: '¿Desarrollan software a medida para empresas en Santiago?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Construimos software a medida en Santiago y para todo Chile: apps web, SaaS, e-commerce, LMS, integraciones y sistemas empresariales.' } },
        { '@type': 'Question', name: '¿Qué es DevSecOps?', acceptedAnswer: { '@type': 'Answer', text: 'DevSecOps integra la seguridad en cada fase del ciclo de desarrollo. En RawSec lo aplicamos desde el diseño hasta el despliegue: revisión de código, SAST/DAST, pentesting interno y gates de seguridad.' } },
      ],
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'RawSec Solutions — Software a Medida & Ciberseguridad · Santiago, Chile',
    template: '%s | RawSec Solutions',
  },

  description: 'Empresa de desarrollo de software y ciberseguridad en Santiago, Chile. Construimos software a medida, realizamos pentesting, auditorías de seguridad y cumplimiento Ley 21.719. Full-stack + DevSecOps bajo un mismo equipo.',

  keywords: KEYWORDS,

  authors: [{ name: 'RawSec Solutions' }],
  creator: 'RawSec Solutions',
  publisher: 'RawSec Solutions',

  alternates: {
    canonical: '/',
    languages: {
      'es': '/',
      'en': '/',
      'x-default': '/',
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'es_CL',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'RawSec Solutions',
    title: 'RawSec Solutions — Software a Medida & Ciberseguridad · Chile',
    description: 'Desarrollamos software a medida y hacemos ciberseguridad bajo un mismo equipo. Pentesting, auditorías, IA aplicada, e-commerce y cumplimiento Ley 21.719. Santiago, Chile.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, type: 'image/png', alt: 'RawSec Solutions — Software a medida y ciberseguridad en Chile' }],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@rawsecsolutions',
    creator: '@rawsecsolutions',
    title: 'RawSec Solutions — Software a Medida & Ciberseguridad · Chile',
    description: 'Desarrollamos software a medida y hacemos ciberseguridad bajo un mismo equipo. Pentesting, auditorías, IA aplicada y cumplimiento Ley 21.719.',
    images: [{ url: '/og-image.png', alt: 'RawSec Solutions — Software a medida y ciberseguridad en Chile' }],
  },

  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/favicon.svg', color: '#34d399' }],
  },

  manifest: '/site.webmanifest',

  other: {
    'geo.region': 'CL-RM',
    'geo.placename': 'Santiago, Chile',
    'geo.position': '-33.4569;-70.6483',
    'ICBM': '-33.4569, -70.6483',
    'language': 'Spanish',
    'rating': 'general',
    'revisit-after': '7 days',
    'format-detection': 'telephone=no',
    'application-name': 'RawSec Solutions',
    'copyright': 'RawSec Solutions',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'RawSec',
    'msapplication-TileColor': '#000000',
    'msapplication-TileImage': '/favicon.svg',
    'msapplication-navbutton-color': '#00ff88',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-tap-highlight': 'no',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: light)" />
      </head>
      <body className="bg-grid" id="top">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
