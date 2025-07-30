import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { degrees } from "pdf-lib";
import { mainContext } from "../Context/MainCTX/mainContext";

export function useRotatePage() {
    const { pdfDoc, setPDFPages, setPDFDoc } = useContext(pdfContext);
    const { setError } = useContext(mainContext);

    async function rotatePage(index: number) {
        try {
            const pdf = pdfDoc!;
            const page = pdf.getPage(index);

            const rotation = page.getRotation().angle >= 360 ? 0 : page.getRotation().angle;
    
            pdf.removePage(index);
            page.setRotation(degrees(rotation + 90));
            pdf.insertPage(index, page);
    
            await pdf.save();

            setPDFPages(prev => {
                const arr = [...prev];
                
                arr[index].rotation = rotation + 90;

                return arr;
            });
            
            setPDFDoc(pdf);
        } catch (error) {
            setError("rotatePageError");
            console.error("An error occurred: ", error);
        };
    };

    return { rotatePage }
};