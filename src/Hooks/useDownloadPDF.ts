import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { mainContext } from "../Context/MainCTX/mainContext";

export function useDownloadPDF() {
    const { pdfDoc } = useContext(pdfContext);
    const { setError } = useContext(mainContext);

    async function downloadPDF() {
        try {
            const dl = document.createElement("a");

            const pdf = pdfDoc!;
            pdf.setTitle("PDF Doc");
            pdf.setCreator("PDEdit by SimonXVB");
            pdf.setCreationDate(new Date());
    
            const bytes = await pdf.save();
            const pdfBlob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
    
            dl.href = URL.createObjectURL(pdfBlob);
            dl.download = "Doc.pdf";
            dl.click();
        } catch (error) {
            setError("downloadPDFError");
            console.error("An error occurred: ", error);
        };
    };

    return { downloadPDF };
};