import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Main } from './Main.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);