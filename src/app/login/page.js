'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const r = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email.trim(), form.password);
      r.push('/'); 
    } catch (e) {
      console.error(e);                 
    setErr(e.code || 'Login failed'); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Navbar />
      <section className="auth">
        <form className="auth-card" onSubmit={onSubmit} aria-labelledby="loginTitle">
          <div className="auth-header">
            <h1 id="loginTitle">Login</h1>
            <Link href="/signup" className="auth-switch">Sign up</Link>
          </div>

          <label className="auth-label" htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="auth-input"
            value={form.email}
            onChange={onChange}
            required
          />

          <label className="auth-label" htmlFor="password">Your password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="auth-input"
            value={form.password}
            onChange={onChange}
            required
          />

          {err && <p className="auth-error">{err}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}