import { PDFDocument } from "pdf-lib";
import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useSetURL() {
    const context = useContext(pdfContext);
    const errContext = useContext(errorContext);

    function setURL(input: File): void {
        if(input.type !== "application/pdf") {
            errContext.setErrors!(prev => [...prev, "fileTypeError"]);
            return;
        };

        try {
            const reader = new FileReader();
            reader.readAsDataURL(input);
    
            reader.onload = async () => {
                if(typeof reader.result === "string") {
                    const pdf = await PDFDocument.load(reader.result);
                    const bytes = await pdf.save();
                    const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
    
                    context.setPDFInfo!(
                        {
                            pdfDoc: pdf, 
                            pdfURL: URL.createObjectURL(pdfBlob)
                        });
                };
            };
        } catch (error) {
            errContext.setErrors!(prev => [...prev, "setURLError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { setURL };
};