import { ErrorContextProvider } from "./Context/ErrorContext/ErrorContextProvider";
import { PDFContextProvider } from "./Context/PDFContext/PDFContextProvider";
import { ZoomContextProvider } from "./Context/ZoomContext/ZoomContextProvider";
import { Navbar } from "./Components/Navbar";
import { MainPage } from "./Components/MainPage";

export function App() {

  return (
    <ErrorContextProvider>
      <PDFContextProvider>
        <ZoomContextProvider>
          <Navbar/>
          <MainPage/>
        </ZoomContextProvider>
      </PDFContextProvider>
    </ErrorContextProvider>
  )
}