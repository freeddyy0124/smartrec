import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './Contexts/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>
    
);
