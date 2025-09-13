import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { PDFDocument } from "pdf-lib";
import { mainContext } from "../Context/MainCTX/mainContext";
import { useLoadPDF } from "./useLoadPDF";

export function useSetPDF() {
    const { pdfDoc, setPDFDoc } = useContext(pdfContext);
    const { setError } = useContext(mainContext);

    const { loadPDF } = useLoadPDF();
    
    async function setPDF(input: File) {        
        if(input.type !== "application/pdf") {
            setError("fileTypeError");
            return;
        };

        try {
            const mainPDF = await PDFDocument.create();
            const reader = new FileReader();
            reader.readAsDataURL(input);
    
            reader.onload = async () => {
                const newPDF = await PDFDocument.load(reader.result!);

                if(pdfDoc) {
                    const copyExisting = await mainPDF.copyPages(pdfDoc, pdfDoc.getPageIndices());
                    copyExisting.forEach(page => mainPDF.addPage(page));
                };

                const copyNew = await mainPDF.copyPages(newPDF, newPDF.getPageIndices());
                copyNew.forEach(page => mainPDF.addPage(page));

                await mainPDF.save();
                setPDFDoc(mainPDF);

                const bytes = await newPDF.save();
                const pdfBlob = new Blob([bytes], {type: 'application/pdf'});

                loadPDF(URL.createObjectURL(pdfBlob));
            };
        } catch (error) {
            setError("setPDFError");
            console.error("An error occurred: ", error);
        };
    };

    return { setPDF };
};