import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const SITE_URL = 'https://rawsec.solutions'

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
  'rawsec', 'rawsec solutions',
  'software a medida', 'software a medida chile', 'software a medida santiago',
  'desarrollo de software', 'desarrollo de software chile', 'desarrollo de software santiago',
  'empresa de desarrollo de software chile', 'empresa de software chile', 'empresa tech chile',
  'startup tecnológica chile', 'consultoría tecnológica chile', 'soluciones digitales chile',
  'transformación digital chile', 'agencia digital chile', 'agencia de desarrollo web chile',
  'desarrollo web', 'desarrollo web chile', 'desarrollo web santiago',
  'aplicaciones web', 'aplicaciones web chile', 'desarrollo saas', 'saas chile',
  'e-commerce chile', 'tienda online chile', 'desarrollo e-commerce chile',
  'sistemas de gestión chile', 'software para empresas chile', 'plataformas digitales chile',
  'react chile', 'typescript chile', 'next.js chile', 'python chile', 'aws chile',
  'ciberseguridad', 'ciberseguridad chile', 'ciberseguridad santiago',
  'empresa ciberseguridad chile', 'empresa de ciberseguridad chile',
  'pentesting', 'pentesting chile', 'pentesting santiago', 'empresa pentesting chile',
  'pentesting web chile', 'pentesting de infraestructura chile',
  'hacking ético', 'hacking ético chile', 'ethical hacking chile',
  'auditoría de seguridad chile', 'análisis de vulnerabilidades chile',
  'hardening', 'hardening chile', 'red team chile', 'owasp chile',
  'devsecops', 'devsecops chile', 'desarrollo seguro chile', 'software seguro chile',
  'sast chile', 'dast chile',
  'cumplimiento ley 21719', 'ley 21719', 'ley 21719 chile',
  'protección de datos personales chile', 'cumplimiento normativo chile',
  'gdpr chile', 'adecuación normativa chile',
  'inteligencia artificial chile', 'ia aplicada chile', 'chatbot ia chile',
  'rag chatbot chile', 'machine learning chile', 'agentes ia chile', 'llm chile',
  'pagos online chile', 'pasarela de pago chile', 'webpay chile', 'transbank chile',
  'empresa de desarrollo y ciberseguridad chile', 'desarrollo de software seguro chile',
  'contratar desarrolladores chile', 'contratar pentester chile',
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
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '120x120', type: 'image/png' },
    ],
    other: [{ rel: 'mask-icon', url: '/favicon.svg', color: '#00ff88' }],
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
