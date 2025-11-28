import React from 'react';

export default function Header({ title }) {
  return (
    <header style={{ padding: 12, background: '#eee', marginBottom: 12 }}>
      <h2>{title}</h2>
    </header>
  );
}
