'use client';
import { useState } from 'react';
const STEPS = ['Identité', 'Objectifs', 'Consentement RGPD'];
export default function Register() {
  const [step, setStep] = useState(0);
  return (
    <div className="mx-auto mt-20 max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Inscription — Étape {step + 1}/3 : {STEPS[step]}</h1>
      <div className="card space-y-3">
        {step === 0 && <input type="email" placeholder="Email" className="w-full rounded bg-black/40 px-3 py-2 outline-none" />}
        {step === 1 && <input type="text" placeholder="Votre objectif (ex : devenir Data Scientist)" className="w-full rounded bg-black/40 px-3 py-2 outline-none" />}
        {step === 2 && <div className="space-y-1 text-sm">
          {['Cookies nécessaires (obligatoire)', 'Personnalisation IA', 'Marketing'].map(c => (
            <label key={c} className="block"><input type="checkbox" className="mr-2" />{c}</label>
          ))}
        </div>}
        <div className="flex justify-between">
          {step > 0 && <button onClick={() => setStep(s => s - 1)} className="rounded bg-white/10 px-4 py-2">←</button>}
          <button onClick={() => (step < 2 ? setStep(s => s + 1) : alert('Compte créé ✓ — essai gratuit 14 jours'))} className="btn-primary">{step < 2 ? 'Suivant →' : 'Créer mon compte'}</button>
        </div>
      </div>
    </div>
  );
}