import { PDFContextProvider } from "./Context/PDFCTX/PDFContextProvider";
import { MainContextProvider } from "./Context/MainCTX/MainContextProvider";
import { MainPage } from "./Components/Pages/MainPage";
import { ErrorPopup } from "./Components/ErrorPopup";

export function Main() {
  return (
    <MainContextProvider>
      <PDFContextProvider>
        <MainPage/>
        <ErrorPopup/>
      </PDFContextProvider>
    </MainContextProvider>
  );
};