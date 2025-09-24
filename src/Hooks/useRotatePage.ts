import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { mainContext } from "../Context/MainCTX/mainContext";
import { degrees } from "pdf-lib";
import { getDocument } from "pdfjs-dist";

export function useRotatePage() {
    const { pdfDoc, pdfPages, setPDFPages, setPDFDoc } = useContext(pdfContext);
    const { setError } = useContext(mainContext);

    async function rotatePage(index: number) {
        try {
            const pdf = pdfDoc!;
            const page = pdf.getPage(index);

            const rotation = page.getRotation().angle >= 360 ? 0 : page.getRotation().angle;
    
            pdf.removePage(index);
            page.setRotation(degrees(rotation + 90));
            pdf.insertPage(index, page);

            const bytes = await pdf.save();
            const pdfBlob = new Blob([bytes as BlobPart], {type: 'application/pdf'});
            const newPDF = await getDocument(URL.createObjectURL(pdfBlob)).promise;

            const updatedPage = await newPDF.getPage(index + 1);

            const newPages = pdfPages.map((page, i) => {
                if(i === index) {
                    return updatedPage;
                } else {
                    return page;
                };
            });

            setPDFPages(newPages);
            setPDFDoc(pdf);
        } catch (error) {
            setError("rotatePageError");
            console.error("An error occurred: ", error);
        };
    };

    return { rotatePage }
};