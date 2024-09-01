import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { google_client_ID } from '../src/google_client_ID.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={google_client_ID}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>,
)
