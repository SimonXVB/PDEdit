import { ErrorContextProvider } from "./Context/ErrorCTX/ErrorContextProvider";
import { PDFContextProvider } from "./Context/PDFCTX/PDFContextProvider";
import { ZoomContextProvider } from "./Context/ZoomCTX/ZoomContextProvider";
import { MainPage } from "./Components/MainPage";
import { ErrorPopup } from "./Components/Individuals/ErrorPopup";

export function App() {
  return (
    <ErrorContextProvider>
      <PDFContextProvider>
        <ZoomContextProvider>
          <MainPage/>
          <ErrorPopup/>
        </ZoomContextProvider>
      </PDFContextProvider>
    </ErrorContextProvider>
  );
};