import { PDFDocument } from "pdf-lib";
import { useState } from "react";

export function useGetURL() {
    const [url, setUrl] = useState<string>("");

    function getURL(input: File): void {
        const reader = new FileReader();
        reader.readAsDataURL(input);

        reader.onerror = () => {
            console.error("Error");
        };

        reader.onload = async () => {
            //Converts given input into PDF URL
            if(typeof reader.result === "string") {
                const doc = await PDFDocument.load(reader.result);
                const bytes = await doc.save();
                const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
                setUrl(URL.createObjectURL(pdfBlob));
            };
        };
    };

    return { getURL, url };
};