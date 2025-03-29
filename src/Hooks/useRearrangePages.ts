import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";
import { PDFPage } from "pdf-lib";

type IndexArrTuple = readonly [number, number]

export function useRearrangePages() {
    const context = useContext(pdfContext);
    const errContext = useContext(errorContext);

    async function rearrangePages(indexArr: IndexArrTuple) {
        try {
            const pdf = context.pdf!;
            const pdfPages: PDFPage[] = pdf.getPages();
    
            pdf.removePage(indexArr[0]);
            pdf.insertPage(indexArr[0], pdfPages[indexArr[1]]);
            
            pdf.removePage(indexArr[1]);
            pdf.insertPage(indexArr[1], pdfPages[indexArr[0]]);
    
            const bytes = await pdf.save();
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
    
            context.setPDF!(pdf);
            context.setURL!(URL.createObjectURL(pdfBlob));
        } catch (error) {
            errContext.setErrors!(prev => [...prev, "rearrangePageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { rearrangePages };
};