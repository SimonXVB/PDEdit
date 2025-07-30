import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { mainContext } from "../Context/MainCTX/mainContext";

export function useRemovePage() {
    const { pdfDoc, setPDFDoc, setPDFPages } = useContext(pdfContext);
    const { setError } = useContext(mainContext);

    async function removePage(index: number) {
        try {
            const pdf = pdfDoc!;

            pdf.removePage(index);
            await pdf.save();
            setPDFDoc(pdf);

            setPDFPages(prev => prev.filter((_el, i) => i !== index));
        } catch (error) {
            setError("removePageError");
            console.error("An error occurred: ", error);
        };
    };

    return { removePage };
};