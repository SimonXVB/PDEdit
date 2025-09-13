import { useContext } from "react";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { PDFEditor } from "./Components/PDFEditor/PDFEditor";
import { ErrorPopup } from "./Components/ErrorPopup";
import { pdfContext } from "./Context/PDFCTX/pdfContext";

export function Main() {
  const pdfCTX = useContext(pdfContext);

  return (
    <>
      {!pdfCTX.pdfDoc && <LandingPage/>}
      {pdfCTX.pdfDoc && <PDFEditor/>}
      <ErrorPopup/>
    </>
  );
};