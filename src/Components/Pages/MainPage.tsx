import { useContext } from "react";
import { pdfContext } from "../../Context/PDFCTX/pdfContext";
import { HomePage } from "./HomePage";
import { OpenPDFPage } from "./OpenPDFPage";

export function MainPage() {
    const { pdfDoc } = useContext(pdfContext);

    return (
        <>
            {!pdfDoc && <HomePage/>}
            {pdfDoc && <OpenPDFPage/>}
        </>
    )
};