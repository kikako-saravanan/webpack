import React from 'react';
import logoUrl from './logo.png'; // asset import - will appear in graph

export default function Header() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src={logoUrl} alt="logo" width="32" height="32" />
      <h1>Demo App</h1>
    </header>
  );
}
