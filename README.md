# Elearn AI — Plateforme e-learning augmentée par IA

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Zustand.

## Stack
- Frontend : Next.js 14, WebGL (hero), Babylon.js (dashboard 3D)
- État : Zustand (persistance locale `elearn-ai-store`)
- IA : recommandations (cosinus + signal collaboratif), RAG simplifié, quiz — prêts à brancher sur Mistral 8x22B / Whisper / T5 via LangChain
- Paiements : Stripe Elements, BNPL, crypto (stubs commentés)
- Auth : WebAuthn + MFA TOTP (stub)
- Architecture vidéo : Lecteur -> FFmpeg.wasm / Whisper / Backend (PostgreSQL + Redis)

## Démarrage
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Arborescence
```
src/
  app/
    (auth)/login | register | forgot-password
    (main)/dashboard | catalog | course/[id] | learning-path | community | ai-tutor | checkout
    api/chat | quiz | recommendations | checkout
  components/  (HeroWebGL, VideoPlayer, CourseCard, CatalogFilters, Progress3D, AIChat, Sidebar, ...)
  lib/         (data.ts, store.ts, ai.ts)
  types.ts
public/videos/.gitkeep, public/resources/.gitkeep
```

## Notes prod
- Brancher Prisma (PostgreSQL) + Redis via DATABASE_URL / REDIS_URL
- Stripe SDK réel dans `src/app/api/checkout/route.ts`
- Mistral / Whisper via MISTRAL_API_KEY / WHISPER_API_KEY
- NFT certificats : Polygon + IPFS (CONTRACT_ADDRESS)
