import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { mainContext } from "../Context/MainCTX/mainContext";
import { PDFPage } from "pdf-lib";

export function useRearrangePages() {
    const { pdfDoc, setPDFDoc, setPDFPages } = useContext(pdfContext);
    const { setError } = useContext(mainContext);

    async function rearrangePages(currentPage: number, rearrangePage: number) {
        try {
            const pdf = pdfDoc!;
            const pdfPages: PDFPage[] = pdf.getPages();
    
            pdf.removePage(currentPage);
            pdf.insertPage(currentPage, pdfPages[rearrangePage]);
            
            pdf.removePage(rearrangePage);
            pdf.insertPage(rearrangePage, pdfPages[currentPage]);
    
            await pdf.save();
            setPDFDoc(pdf);

            setPDFPages(prev => {
                const pdfArray = [...prev];

                const el = pdfArray[rearrangePage];
                pdfArray[rearrangePage] = pdfArray[currentPage];
                pdfArray[currentPage] = el;

                return pdfArray;
            });
        } catch (error) {
            setError("rearrangePageError");
            console.error("An error occurred: ", error);
        };
    };

    return { rearrangePages };
};