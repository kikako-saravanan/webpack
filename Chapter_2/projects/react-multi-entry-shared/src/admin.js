import React from 'react';
import { createRoot } from 'react-dom/client';
import AppAdmin from './AppAdmin';

const root = createRoot(document.getElementById('admin-root'));
root.render(<AppAdmin />);
