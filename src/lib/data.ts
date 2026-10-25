import type { Course } from '@/types';

export const courses: Course[] = [
  {
    id: 'py-101', title: 'Python : de zéro à Data Scientist', instructor: 'A. Kumar',
    description: 'Maîtrisez Python, pandas et scikit-learn sur 12 projets réels.',
    level: 'Débutant', durationH: 42, price: 149, rating: 4.9, students: 12840,
    skills: ['Python', 'Pandas', 'Machine Learning'],
    chapters: [
      { id: 'c1', title: 'Installation & bases', duration: 840, summary: 'Setup, variables, types.' },
      { id: 'c2', title: 'Pandas en pratique', duration: 1620, summary: 'DataFrames, nettoyage.' },
      { id: 'c3', title: 'Premier modèle ML', duration: 2100, summary: 'Régression linéaire.' },
    ],
    videoUrl: '/videos/py-101.mp4',
  },
  {
    id: 'web-201', title: 'Next.js 14 & React Server Components', instructor: 'M. Dupont',
    description: 'Architecture App Router, streaming, Server Actions.',
    level: 'Intermédiaire', durationH: 28, price: 129, rating: 4.8, students: 8310,
    skills: ['Next.js', 'React', 'TypeScript'],
    chapters: [
      { id: 'c1', title: 'App Router deep dive', duration: 1200 },
      { id: 'c2', title: 'Server Actions', duration: 1800 },
      { id: 'c3', title: 'Optimisation & cache', duration: 1500 },
    ],
    videoUrl: '/videos/web-201.mp4',
  },
  {
    id: 'ai-301', title: 'LLM en production : RAG & fine-tuning', instructor: 'S. Iyer',
    description: 'Construisez des pipelines RAG avec LangChain et Mistral 8x22B.',
    level: 'Avancé', durationH: 35, price: 199, rating: 4.9, students: 5210,
    skills: ['LLM', 'LangChain', 'RAG', 'Python'],
    chapters: [
      { id: 'c1', title: 'Embeddings & vector stores', duration: 1500 },
      { id: 'c2', title: 'RAG avec Mistral', duration: 2400 },
      { id: 'c3', title: 'Évaluation & guardrails', duration: 1800 },
    ],
    videoUrl: '/videos/ai-301.mp4',
  },
  {
    id: 'sol-401', title: 'Web3 : Solidity & NFT de certification', instructor: 'R. Mehta',
    description: 'Smart contracts, IPFS, déploiement Polygon.',
    level: 'Avancé', durationH: 24, price: 179, rating: 4.6, students: 3120,
    skills: ['Solidity', 'Blockchain', 'IPFS'],
    chapters: [{ id: 'c1', title: 'ERC-721 & ERC-1155', duration: 1500 }, { id: 'c2', title: 'Mint de certificat', duration: 1800 }],
    videoUrl: '/videos/sol-401.mp4',
  },
  {
    id: 'webgl-150', title: 'WebGL & Three.js créatifs', instructor: 'L. Chen',
    description: 'Shaders GLSL, particules, scènes 3D performantes.',
    level: 'Intermédiaire', durationH: 18, price: 99, rating: 4.7, students: 6470,
    skills: ['WebGL', 'Three.js', 'GLSL'],
    chapters: [{ id: 'c1', title: 'Premier shader', duration: 900 }, { id: 'c2', title: 'Particules', duration: 1600 }],
    videoUrl: '/videos/webgl-150.mp4',
  },
  {
    id: 'ds-120', title: 'Design System & accessibilité (RGPD/WCAG)', instructor: 'N. Roy',
    description: 'Tokens, composants accessibles, conformité RGPD 2026.',
    level: 'Débutant', durationH: 15, price: 79, rating: 4.5, students: 4210,
    skills: ['UI/UX', 'Accessibilité', 'RGPD'],
    chapters: [{ id: 'c1', title: 'WCAG 2.2 en pratique', duration: 1200 }],
    videoUrl: '/videos/ds-120.mp4',
  },
];

export const getCourse = (id: string) => courses.find(c => c.id === id);
