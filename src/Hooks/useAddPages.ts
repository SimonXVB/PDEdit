import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { PDFDocument } from "pdf-lib";
import { errorContext } from "../Context/ErrorCTX/errorContext";
import { useLoadPDF } from "./useLoadPDF";

export function useAddPages() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    const { loadPDF } = useLoadPDF();
    
    async function addPages(input: File) {
        if(input.type !== "application/pdf") {
            errorCTX.setError("fileTypeError");
            return;
        };

        try {
            const mergedPdf = await PDFDocument.create();
            const reader = new FileReader();
            reader.readAsDataURL(input);
    
            reader.onload = async () => {
                if(typeof reader.result === "string") {
                    const docA = pdfCTX.pdfDoc!;
                    const docB = await PDFDocument.load(reader.result);
    
                    const copiedPagesA = await mergedPdf.copyPages(docA, docA.getPageIndices());
                    copiedPagesA.forEach((page) => mergedPdf.addPage(page));
    
                    const copiedPagesB = await mergedPdf.copyPages(docB, docB.getPageIndices());
                    copiedPagesB.forEach((page) => mergedPdf.addPage(page));
    
                    await mergedPdf.save();
                    pdfCTX.setPDFDoc(mergedPdf);

                    const bytes = await docB.save();
                    const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

                    loadPDF(URL.createObjectURL(pdfBlob));
                };
            };
        } catch (error) {
            errorCTX.setError("addPageError");
            console.error("An error occurred: ", error);
        };
    };

    return { addPages };
};