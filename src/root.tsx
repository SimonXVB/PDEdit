import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PDFContextProvider } from "./Context/PDFCTX/PDFContextProvider";
import { MainContextProvider } from "./Context/MainCTX/MainContextProvider";
import { Main } from './main.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContextProvider>
      <PDFContextProvider>
        <Main />
      </PDFContextProvider>
    </MainContextProvider>
  </StrictMode>
);