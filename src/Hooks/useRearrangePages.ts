import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";
import { PDFPage } from "pdf-lib";

export function useRearrangePages() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function rearrangePages(currentPage: number, rearrangePage: number) {
        try {
            const pdf = pdfCTX.pdfInfo!.pdfDoc!;
            const pdfPages: PDFPage[] = pdf.getPages();
    
            // Updates the actual PDF file
            pdf.removePage(currentPage);
            pdf.insertPage(currentPage, pdfPages[rearrangePage]);
            
            pdf.removePage(rearrangePage);
            pdf.insertPage(rearrangePage, pdfPages[currentPage]);
    
            const bytes = await pdf.save();
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

            pdfCTX.setPDFInfo!({pdfDoc: pdf, pdfURL: URL.createObjectURL(pdfBlob)});

            //Updates the PDFPages array (context.pdfPages)
            const pdfArray = pdfCTX.pdfPages!;

            const el = pdfArray[rearrangePage];
            pdfArray[rearrangePage] = pdfArray[currentPage];
            pdfArray[currentPage] = el;

            pdfCTX.setPDFPages!(pdfArray);
        } catch (error) {
            errorCTX.setErrors!(prev => [...prev, "rearrangePageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { rearrangePages };
};