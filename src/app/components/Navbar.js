'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import  Link  from 'next/link';
import { auth } from '@/lib/firebase';

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);
    
return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className="logo"> 
        <div className="logo">DEV@DEAKIN</div>
        </Link>
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

<div className="nav-right">
        <Link href="/find-question">
           <button className="nav-button">FIND QUESTIONS</button>
        </Link>

        <Link href="/Post">
          <button className="nav-button">POST</button>
        </Link>

        {user ? (
          <>
            <span className="nav-username">
              {user.email}
            </span>
            <button 
              className="nav-button"
              onClick={() => signOut(auth)}
            >
              LOGOUT
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="nav-button">LOGIN</button>
          </Link>
        )}
      </div>
    </nav>
  );
}