'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const r = useRouter();
  const [form, setForm] = useState({ name: '', lastName: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');

    if (!form.name || !form.lastName || !form.email || !form.password) {
      setErr('All fields are required.');
      return;
    }
    if (form.password.length < 6) {
      setErr('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setErr('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: form.name.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
      });
      r.push('/login'); 
    } catch (e) {
    console.error(e);                 
    setErr(e.code || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Navbar />
      <section className="auth">
        <form className="auth-card auth-grid-2" onSubmit={onSubmit} aria-labelledby="signupTitle">
          <h1 id="signupTitle" className="col-span-2">Create a DEV@Deakin Account</h1>

          <div>
            <label className="auth-label" htmlFor="name">Name*</label>
            <input id="name" name="name" className="auth-input" value={form.name} onChange={onChange} required />
          </div>

          <div>
            <label className="auth-label" htmlFor="lastName">Last name*</label>
            <input id="lastName" name="lastName" className="auth-input" value={form.lastName} onChange={onChange} required />
          </div>

          <div className="col-span-2">
            <label className="auth-label" htmlFor="email">Email*</label>
            <input id="email" name="email" type="email" className="auth-input" value={form.email} onChange={onChange} required />
          </div>

          <div>
            <label className="auth-label" htmlFor="password">Password*</label>
            <input id="password" name="password" type="password" className="auth-input" value={form.password} onChange={onChange} required />
          </div>

          <div>
            <label className="auth-label" htmlFor="confirm">Confirm password*</label>
            <input id="confirm" name="confirm" type="password" className="auth-input" value={form.confirm} onChange={onChange} required />
          </div>

          {err && <p className="auth-error col-span-2">{err}</p>}

          <button className="auth-btn col-span-2" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}