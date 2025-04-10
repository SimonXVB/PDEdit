import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { degrees } from "pdf-lib";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRotatePage() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function rotatePage(index: number): Promise<void> {
        try {
            const pdf = pdfCTX.pdfDoc!;
            const page = pdf.getPage(index);

            const rotation = page.getRotation().angle >= 360 ? 0 : page.getRotation().angle;
    
            // Updates the actual PDF file
            pdf.removePage(index);
            page.setRotation(degrees(rotation + 180));
            pdf.insertPage(index, page);
    
            await pdf.save();

            pdfCTX.setPDFPages(prev => {
                const arr = [...prev];
                const el = prev[index];

                const newObj = {
                    ...el,
                    pdfInfo: {
                        ...el.pdfInfo,
                        rotation: rotation + 180
                    }
                };
                arr[index] = newObj;

                return arr;
            });
            
            pdfCTX.setPDFDoc(pdf);
        } catch (error) {
            errorCTX.setErrors(prev => [...prev, "rotatePageError"]);
            console.error("An error occurred: ", error);
        };
    };

    return { rotatePage }
};