import { ErrorContextProvider } from "./Context/ErrorContext/ErrorContextProvider";
import { PDFContextProvider } from "./Context/PDFContext/PDFContextProvider";
import { ZoomContextProvider } from "./Context/ZoomContext/ZoomContextProvider";
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