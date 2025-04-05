import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRemovePage() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function removePage(index: number): Promise<void> {
        try {
            const pdf = pdfCTX.pdfDoc!;

            // Updates the actual PDF file
            pdf.removePage(index);
            await pdf.save();
            pdfCTX.setPDFDoc!(pdf);

            //Updates the PDFPages array (context.pdfPages)
            pdfCTX.setPDFPages!(prev => prev.filter((_el, i) => i !== index));
        } catch (error) {
            errorCTX.setErrors!(prev => [...prev, "removePageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { removePage };
};