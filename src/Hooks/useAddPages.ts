import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { PDFDocument } from "pdf-lib";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useAddPages() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);
    
    async function addPages(input: File): Promise<void> {
        try {
            const mergedPdf = await PDFDocument.create();
            const reader = new FileReader();
            reader.readAsDataURL(input);
    
            reader.onload = async () => {
                if(typeof reader.result === "string") {
                    const docA = pdfCTX.pdfInfo!.pdfDoc;
                    const docB = await PDFDocument.load(reader.result);
    
                    const copiedPagesA = await mergedPdf.copyPages(docA!, docA!.getPageIndices());
                    copiedPagesA.forEach((page) => mergedPdf.addPage(page));
    
                    const copiedPagesB = await mergedPdf.copyPages(docB, docB.getPageIndices());
                    copiedPagesB.forEach((page) => mergedPdf.addPage(page));
    
                    const bytes = await mergedPdf.save();
                    const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
    
                    pdfCTX.setPDFInfo!({pdfDoc: mergedPdf, pdfURL: URL.createObjectURL(pdfBlob)});
                };
            };
        } catch (error) {
            errorCTX.setErrors!(prev => [...prev, "addPageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { addPages };
};