import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SK!);

export async function POST(req: Request) {
  const { items, method } = await req.json();
  // Prod : PaymentIntent (card) / Klarna-Afterpay (BNPL) / charge USDC sur Polygon (crypto)
  const ref = `pay_${Date.now().toString(36)}`;
  return NextResponse.json({
    status: `✓ Paiement ${method} confirmé`,
    paymentRef: ref,
    invoiceUrl: `/invoices/${ref}.pdf`, // Prod : génération PDF (pdf-lib) + envoi email (Resend)
  });
}