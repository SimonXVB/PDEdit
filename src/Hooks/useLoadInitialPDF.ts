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

        const doc = document.createElement("div");
        doc.innerHTML = "pre load";
        document.getElementById("root")?.appendChild(doc);

        if(input.type !== "application/pdf") {
            errorCTX.setError("fileTypeError");
            return;
        };

        try {
            const doc1 = document.createElement("div");
            doc1.innerHTML = "try load";
            document.getElementById("root")?.appendChild(doc1);

            const reader = new FileReader();
            reader.readAsDataURL(input);

            const doc2 = document.createElement("div");
            doc2.innerHTML = "read";
            document.getElementById("root")?.appendChild(doc2);
            
            reader.onload = async () => {
                if(typeof reader.result === "string") {
                    const pdf = await PDFDocument.load(reader.result);
                    const bytes = await pdf.save();
                    const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
                    pdfCTX.setPDFDoc(pdf);

                    const doc3 = document.createElement("div");
                    doc3.innerHTML = reader.result;
                    document.getElementById("root")?.appendChild(doc3);

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