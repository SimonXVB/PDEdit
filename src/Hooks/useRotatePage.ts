import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { degrees } from "pdf-lib";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRotatePage() {
    const context = useContext(pdfContext);
    const errContext = useContext(errorContext);

    async function rotatePage(index: number) {
        try {
            const pdf = context.pdf!;
            const page = context.pdf!.getPage(index);
    
            pdf.removePage(index);
            page.setRotation(degrees(page.getRotation().angle + 180));
            pdf.insertPage(index, page);
    
            const bytes = await pdf.save();
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
            
            context.setPDF!(pdf);
            context.setURL!(URL.createObjectURL(pdfBlob));
        } catch (error) {
            errContext.setErrors!(prev => [...prev, "rotatePageError"]);
            console.error("An error occurred: ", error);
        }
    }

    return { rotatePage }
};