"use client";
import { Elements } from "@stripe/react-stripe-js";
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

import { loadStripe } from "@stripe/stripe-js";
import CheckoutShell from "@/components/CheckoutShell";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function PayPage() {
  return (
    <main>
        <Navbar />
    <div className="wrapNarrow">
      <h1 className="h1">Upgrade to Premium</h1>
      <p className="muted">Use test card 4242 4242 4242 4242 for demo UI.</p>
      <Elements stripe={stripePromise}>
        <CheckoutShell />
      </Elements>
    </div>
    <Footer />
    </main>
  );
}
