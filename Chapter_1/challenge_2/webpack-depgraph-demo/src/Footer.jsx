import React from 'react';
import { helper } from './utils.js';

export default function Footer() {
  return (
    <footer style={{ marginTop: 20 }}>
      <small>{helper('Webpack Investigator')}</small>
    </footer>
  );
}
