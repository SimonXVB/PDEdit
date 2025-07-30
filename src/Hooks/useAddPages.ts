import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { PDFDocument } from "pdf-lib";
import { mainContext } from "../Context/MainCTX/mainContext";
import { useLoadPDF } from "./useLoadPDF";

export function useAddPages() {
    const { pdfDoc, setPDFDoc } = useContext(pdfContext);
    const { setError } = useContext(mainContext);

    const { loadPDF } = useLoadPDF();
    
    async function addPages(input: File) {
        if(input.type !== "application/pdf") {
            setError("fileTypeError");
            return;
        };

        try {
            const mergedPDF = await PDFDocument.create();
            const reader = new FileReader();
            reader.readAsDataURL(input);
    
            reader.onload = async () => {
                const docA = pdfDoc!;
                const docB = await PDFDocument.load(reader.result!);

                const copiedPagesA = await mergedPDF.copyPages(docA, docA.getPageIndices());
                copiedPagesA.forEach(page => mergedPDF.addPage(page));

                const copiedPagesB = await mergedPDF.copyPages(docB, docB.getPageIndices());
                copiedPagesB.forEach(page => mergedPDF.addPage(page));

                await mergedPDF.save();
                setPDFDoc(mergedPDF);

                const bytes = await docB.save();
                const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

                loadPDF(URL.createObjectURL(pdfBlob));
            };
        } catch (error) {
            setError("addPageError");
            console.error("An error occurred: ", error);
        };
    };

    return { addPages };
};