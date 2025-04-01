import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRemovePage() {
    const context = useContext(pdfContext);
    const errContext = useContext(errorContext);

    async function removePage(index: number) {
        try {
            const newDoc = context.pdfInfo!.pdfDoc!;

            // Updates the actual PDF file
            newDoc.removePage(index);

            const bytes = await newDoc.save();
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
            
            context.setPDFInfo!({pdfDoc: newDoc, pdfURL: URL.createObjectURL(pdfBlob)});

            //Updates the PDFPages array (context.pdfPages)
            context.setPDFPages!(prev => prev.filter((_el, i) => i !== index));
        } catch (error) {
            errContext.setErrors!(prev => [...prev, "removePageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { removePage };
};