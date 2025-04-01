import { ErrorContextProvider } from "./Context/ErrorContext/ErrorContextProvider";
import { PDFContextProvider } from "./Context/PDFContext/PDFContextProvider";
import { Navbar } from "./Components/Navbar";
import { MainPage } from "./Components/MainPage";

export function App() {

  return (
    <ErrorContextProvider>
      <PDFContextProvider>
        <Navbar/>
        <MainPage/>
      </PDFContextProvider>
    </ErrorContextProvider>
  )
}