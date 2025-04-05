import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";
import { PDFPage } from "pdf-lib";

export function useRearrangePages() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function rearrangePages(currentPage: number, rearrangePage: number): Promise<void> {
        try {
            const pdf = pdfCTX.pdfDoc!;
            const pdfPages: PDFPage[] = pdf.getPages();
    
            // Updates the actual PDF file
            pdf.removePage(currentPage);
            pdf.insertPage(currentPage, pdfPages[rearrangePage]);
            
            pdf.removePage(rearrangePage);
            pdf.insertPage(rearrangePage, pdfPages[currentPage]);
    
            await pdf.save();

            pdfCTX.setPDFDoc!(pdf);

            //Updates the PDFPages array (context.pdfPages)

            pdfCTX.setPDFPages!(prev => {
                const pdfArray = [...prev];

                const el = pdfArray[rearrangePage];
                pdfArray[rearrangePage] = pdfArray[currentPage];
                pdfArray[currentPage] = el;

                return pdfArray;
            });
        } catch (error) {
            errorCTX.setErrors!(prev => [...prev, "rearrangePageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { rearrangePages };
};