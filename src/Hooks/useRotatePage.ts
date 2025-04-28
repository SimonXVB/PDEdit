import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { degrees } from "pdf-lib";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRotatePage() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function rotatePage(index: number) {
        try {
            const pdf = pdfCTX.pdfDoc!;
            const page = pdf.getPage(index);

            const rotation = page.getRotation().angle >= 360 ? 0 : page.getRotation().angle;
    
            pdf.removePage(index);
            page.setRotation(degrees(rotation + 90));
            pdf.insertPage(index, page);
    
            await pdf.save();

            pdfCTX.setPDFPages(prev => {
                const arr = [...prev];
                
                arr[index].pdfInfo.rotation = rotation + 90;

                return arr;
            });
            
            pdfCTX.setPDFDoc(pdf);
        } catch (error) {
            errorCTX.setError("rotatePageError");
            console.error("An error occurred: ", error);
        };
    };

    return { rotatePage }
};