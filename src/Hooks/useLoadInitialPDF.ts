import { PDFDocument } from "pdf-lib";
import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { errorContext } from "../Context/ErrorCTX/errorContext";
import { useLoadPDF } from "./useLoadPDF";

export function useLoadInitialPDF() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);
    
    const { loadPDF } = useLoadPDF();

    function loadInitialPDF(input: File) {

        if(input.type !== "application/pdf") {
            errorCTX.setError("fileTypeError");
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
                    pdfCTX.setPDFDoc(pdf);

                    loadPDF(URL.createObjectURL(pdfBlob));
                };
            };
        } catch (error) {
            errorCTX.setError("setURLError");
            console.error("An error occurred: ", error);
        };
    };

    return { loadInitialPDF };
};