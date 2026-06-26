# RawSec Solutions — Landing

Stack: **Next.js 15 (App Router, SSG)** · React 19 · TypeScript 6 · framer-motion

## Dev

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Notas

### SVGs inline con variables CSS

Los SVGs de marca (logo, íconos) están inline en el TSX para que funcionen con `var(--accent)`.
Si el logo evoluciona, convierte a componentes con `@svgr/webpack` en `next.config.ts`:

```ts
// next.config.ts
const nextConfig = {
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] })
    return config
  },
}
```

```tsx
import RawsecLogo from '@/assets/logo.svg'
<RawsecLogo stroke="var(--accent)" />
```
