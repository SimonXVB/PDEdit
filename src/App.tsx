import { MainPage } from "./Components/MainPage";
import { PdfRefsContextProvider } from "./Context/PDFRefsContext/PDFRefsContextProvider";

export function App() {

  return (
    <PdfRefsContextProvider>
		  <MainPage/>
    </PdfRefsContextProvider>
  )
}