"use client";
import Link from "next/link";
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

export default function PlansPage() {
  const perks = {
    free: ["Browse posts", "Basic Q&A"],
    premium: [
      "Custom messages & banners",
      "Theme selection",
      "Content controls",
      "Analytics dashboard (admin/support)",
    ],
  };

  return (

    <main >
        <Navbar />
        <div className="wrap">
      <h1 className="h1">Plans</h1>
      <section className="plansGrid">
        <article className="planCard">
          <h2>Free</h2>
          <p className="price">$0</p>
          <ul>{perks.free.map(p => <li key={p}>{p}</li>)}</ul>
          <Link className="btnGhost" href="/Post">Start Posting</Link>
        </article>

        <article className="planCard">
          <h2>Premium</h2>
          <p className="price">$9.99 / mo</p>
          <ul>{perks.premium.map(p => <li key={p}>{p}</li>)}</ul>
          <Link className="btnGhost" href="/pay">Go Premium</Link>
        </article>
      </section>
      </div>
        <Footer />
    </main>
  );
}
