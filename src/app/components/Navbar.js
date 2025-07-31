'use client';

import { useState } from 'react';
import  Link  from 'next/link';

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");

return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">DEV@DEAKIN</div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-right">
        <button className="nav-button">POST</button>
        <button className="nav-button">LOGIN</button>
      </div>
    </nav>
    );
}