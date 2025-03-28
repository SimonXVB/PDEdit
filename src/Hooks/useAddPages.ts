import { useContext } from "react";
import { PDFContext } from "../Context/PDFContext/PDFContext";
import { PDFDocument } from "pdf-lib";

export function useAddPages() {
    const context = useContext(PDFContext);
    
    async function addPages(input: File): Promise<void> {
        const mergedPdf = await PDFDocument.create();

        const reader = new FileReader();
        reader.readAsDataURL(input);

        reader.onerror = () => {
            console.error("Error");
        };

        reader.onload = async () => {
            if(typeof reader.result === "string") {
                const docA = context.pdf;
                const docB = await PDFDocument.load(reader.result);

                const copiedPagesA = await mergedPdf.copyPages(docA!, docA!.getPageIndices());
                copiedPagesA.forEach((page) => mergedPdf.addPage(page));

                const copiedPagesB = await mergedPdf.copyPages(docB, docB.getPageIndices());
                copiedPagesB.forEach((page) => mergedPdf.addPage(page));

                const bytes = await mergedPdf.save();
                const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

                context.setPDF!(mergedPdf);
                context.setURL!(URL.createObjectURL(pdfBlob));
            };
        };
    };

    return { addPages };
};