import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRemovePage() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function removePage(index: number) {
        try {
            const pdf = pdfCTX.pdfDoc!;

            pdf.removePage(index);
            await pdf.save();
            pdfCTX.setPDFDoc(pdf);

            pdfCTX.setPDFPages(prev => prev.filter((_el, i) => i !== index));
        } catch (error) {
            errorCTX.setErrors(prev => [...prev, "removePageError"]);
            console.error("An error occurred: ", error);
        };
    };

    return { removePage };
};