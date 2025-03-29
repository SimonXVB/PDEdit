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

        const reader = new FileReader();
        reader.readAsDataURL(input);

        reader.onerror = (error) => {
            errContext.setErrors!(prev => [...prev, "fileReadError"]);
            console.error("An error occurred: ", error);
        };

        reader.onload = async () => {
            try {
                if(typeof reader.result === "string") {
                    const doc = await PDFDocument.load(reader.result);
                    const bytes = await doc.save();
                    const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
    
                    context.setPDF!(doc);
                    context.setURL!(URL.createObjectURL(pdfBlob));
                };
            } catch (error) {
                errContext.setErrors!(prev => [...prev, "setURLError"]);
                console.error("An error occurred: ", error);
            }
        };
    };

    return { setURL };
};