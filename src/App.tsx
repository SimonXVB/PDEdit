import { ErrorContextProvider } from "./Context/ErrorContext/ErrorContextProvider";
import { PDFContextProvider } from "./Context/PDFContext/PDFContextProvider";
import { ZoomContextProvider } from "./Context/ZoomContext/ZoomContextProvider";
import { DrawingContextProvider } from "./Context/DrawingContext/DrawingContextProvider";
import { Navbar } from "./Components/Navbar";
import { MainPage } from "./Components/MainPage";

export function App() {

  return (
    <ErrorContextProvider>
    <PDFContextProvider>
    <ZoomContextProvider>
    <DrawingContextProvider>
      <Navbar/>
      <MainPage/>
    </DrawingContextProvider>
    </ZoomContextProvider>
    </PDFContextProvider>
    </ErrorContextProvider>
  )
}