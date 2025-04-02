import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRemovePage() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function removePage(index: number) {
        try {
            const pdf = pdfCTX.pdfInfo!.pdfDoc!;

            // Updates the actual PDF file
            pdf.removePage(index);

            const bytes = await pdf.save();
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
            
            pdfCTX.setPDFInfo!({pdfDoc: pdf, pdfURL: URL.createObjectURL(pdfBlob)});

            //Updates the PDFPages array (context.pdfPages)
            pdfCTX.setPDFPages!(prev => prev.filter((_el, i) => i !== index));
        } catch (error) {
            errorCTX.setErrors!(prev => [...prev, "removePageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { removePage };
};