'use client'

import { useState } from 'react';

export default function EmailSignup() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Pretend we signed up: ${email}`);
    setEmail('');
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