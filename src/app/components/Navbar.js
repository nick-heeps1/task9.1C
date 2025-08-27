'use client';

import { useState } from 'react';
import  Link  from 'next/link';

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");

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
        <Link href="/Post"><button className="nav-button">POST</button></Link>
        <Link href="/login"><button className="nav-button">LOGIN</button></Link>
      </div>
    </nav>
    );
}