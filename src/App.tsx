import { MainPage } from "./Components/MainPage";
import { PdfRefsContextProvider } from "./Context/PDFRefsContext/PDFRefsContextProvider";
import { PDFContextProvider } from "./Context/PDFContext/PDFContextProvider";

export function App() {

  return (
    <PDFContextProvider>
    <PdfRefsContextProvider>
      <MainPage/>
    </PdfRefsContextProvider>
    </PDFContextProvider>
  )
}