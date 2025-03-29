import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRemovePage() {
    const context = useContext(pdfContext);
    const errContext = useContext(errorContext);

    async function removePage(page: number) {
        try {
            const newDoc = context.pdf!;

            newDoc.removePage(page);
    
            const bytes = await newDoc.save();
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
            
            context.setPDF!(newDoc);
            context.setURL!(URL.createObjectURL(pdfBlob));        
        } catch (error) {
            errContext.setErrors!(prev => [...prev, "removePageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { removePage };
};