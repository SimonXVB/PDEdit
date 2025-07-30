import { PDFDocument } from "pdf-lib";
import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { mainContext } from "../Context/MainCTX/mainContext";
import { useLoadPDF } from "./useLoadPDF";

export function useLoadInitialPDF() {
    const { setPDFDoc } = useContext(pdfContext);
    const { setError } = useContext(mainContext);
    
    const { loadPDF } = useLoadPDF();

    function loadInitialPDF(input: File) {
        if(input.type !== "application/pdf") {
            setError("fileTypeError");
            return;
        };

        try {
            const reader = new FileReader();
            reader.readAsDataURL(input);
            
            reader.onload = async () => {
                const pdf = await PDFDocument.load(reader.result!);
                const bytes = await pdf.save();
                const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

                setPDFDoc(pdf);
                loadPDF(URL.createObjectURL(pdfBlob));
            };
        } catch (error) {
            setError("setURLError");
            console.error("An error occurred: ", error);
        };
    };

    return { loadInitialPDF };
};