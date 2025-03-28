import { PDFDocument } from "pdf-lib";
import { PDFContext } from "../Context/PDFContext/PDFContext";
import { useContext } from "react";

export function useSetURL() {
    const context = useContext(PDFContext);

    function setURL(input: File): void {
        const reader = new FileReader();
        reader.readAsDataURL(input);

        reader.onerror = () => {
            console.error("Error");
        };

        reader.onload = async () => {
            if(typeof reader.result === "string") {
                const doc = await PDFDocument.load(reader.result);
                const bytes = await doc.save();
                const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

                context.setPDF!(doc);
                context.setURL!(URL.createObjectURL(pdfBlob));
            };
        };
    };

    return { setURL };
};