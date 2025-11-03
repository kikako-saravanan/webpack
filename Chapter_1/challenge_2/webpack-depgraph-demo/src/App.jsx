import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Dependency Graph Demo</h2>
        <p>This small app is used to visualize Webpack dependency graph.</p>
      </main>
      <Footer />
    </div>
  );
}
