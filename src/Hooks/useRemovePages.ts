import { useContext } from "react";
import { PDFContext } from "../Context/PDFContext/PDFContext";

export function useRemovePages() {
    const context = useContext(PDFContext);

    async function removePages(pages: number[]) {
        const newDoc = context.pdf;

        pages.forEach((page: number) => {
            newDoc!.removePage(page - 1);
        });

        const bytes = await newDoc!.save();
        const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
        
        context.setPDF!(newDoc);
        context.setURL!(URL.createObjectURL(pdfBlob));
    };

    return { removePages }
};