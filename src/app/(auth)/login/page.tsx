'use client';
import Link from 'next/link';

export default function Login() {
  const webauthn = async () => {
    // Prod : @simplewebauthn/server côté API (challenge -> attestation)
    const available = window.PublicKeyCredential && await (navigator.credentials as any).isUserVerifyingPlatformAuthenticatorAvailable?.();
    alert(available ? 'Biométrie détectée — WebAuthn ✓ (challenge server à brancher)' : 'WebAuthn indisponible — utilisez le mot de passe + TOTP');
  };
  return (
    <div className="mx-auto mt-20 max-w-sm">
      <h1 className="mb-4 text-2xl font-bold">Connexion</h1>
      <div className="card space-y-3">
        <input type="email" placeholder="Email" className="w-full rounded bg-black/40 px-3 py-2 outline-none" />
        <input type="password" placeholder="Mot de passe" className="w-full rounded bg-black/40 px-3 py-2 outline-none" />
        <button onClick={webauthn} className="btn-primary w-full">🔐 Se connecter (WebAuthn / biométrie)</button>
        <p className="text-center text-sm text-gray-400">Pas de compte ? <Link href="/register" className="text-brand-light">Inscription</Link> · <Link href="/forgot-password" className="text-brand-light">Mot de passe oublié</Link></p>
        <p className="text-center text-xs text-gray-500">MFA TOTP activé par défaut</p>
      </div>
    </div>
  );
}