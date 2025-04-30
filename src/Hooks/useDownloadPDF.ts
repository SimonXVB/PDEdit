import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { errorContext } from "../Context/ErrorCTX/errorContext";

export function useDownloadPDF() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function downloadPDF() {
        try {
            const dl = document.createElement("a");

            const pdf = pdfCTX.pdfDoc!;
            pdf.setCreator("PDEdit");
            pdf.setCreationDate(new Date());
    
            const bytes = await pdf.save();
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
    
            dl.href = URL.createObjectURL(pdfBlob);
            dl.download = "PDEdit.pdf";
            dl.click();
        } catch (error) {
            errorCTX.setError("downloadPDFError");
            console.error("An error occurred: ", error);
        };
    };

    return { downloadPDF };
};