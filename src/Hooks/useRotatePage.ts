import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { degrees } from "pdf-lib";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useRotatePage() {
    const context = useContext(pdfContext);
    const errContext = useContext(errorContext);

    async function rotatePage(index: number) {
        try {
            const pdf = context.pdfInfo!.pdfDoc!;
            const page = pdf.getPage(index);

            const rotation = page.getRotation().angle >= 360 ? 0 : page.getRotation().angle;
    
            // Updates the actual PDF file
            pdf.removePage(index);
            page.setRotation(degrees(rotation + 180));
            pdf.insertPage(index, page);
    
            const bytes = await pdf.save();
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
            
            context.setPDFInfo!({pdfDoc: pdf, pdfURL: URL.createObjectURL(pdfBlob)});

            //Updates the PDFPages array (context.pdfPages)
            const pdfArray = context.pdfPages!;
            const element = pdfArray![index];

            pdfArray?.filter((_el, i) => i !== index);
            element.pdfCanvas!.style.rotate = (rotation + 180) + "deg";
            pdfArray![index] = element;
            
            context.setPDFPages!(pdfArray);
        } catch (error) {
            errContext.setErrors!(prev => [...prev, "rotatePageError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { rotatePage }
};