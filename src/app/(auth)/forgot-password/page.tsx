'use client';
import { useState } from 'react';
export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto mt-20 max-w-sm">
      <h1 className="mb-4 text-2xl font-bold">Mot de passe oublié</h1>
      <div className="card space-y-3">
        <input type="email" placeholder="Email" className="w-full rounded bg-black/40 px-3 py-2 outline-none" />
        <button className="btn-primary w-full" onClick={() => setSent(true)}>{sent ? 'Email envoyé ✓' : 'Envoyer le lien'}</button>
      </div>
    </div>
  );
}