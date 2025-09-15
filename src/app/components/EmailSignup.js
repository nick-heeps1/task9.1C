'use client'

import { useState } from 'react';

export default function EmailSignup() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const emailTosave = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTosave)) {
      alert("Please enter a valid email address.");
      return;
  }

  fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailTosave }),
  })
    .then(async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Subscription failed');
  alert('Thank you for subscribing!');
  setEmail('');
})

    .catch((err) => {
      console.error(err);
      alert(err.message || 'Subscription failed');
    });
  }

  return (
    <div className="email-signup">
      <h2>Sign up for our daily insider</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">
          Subscribe
        </button>
      </form>
    </div>
  );
}