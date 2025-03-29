import { useState } from "react"
import { pdfContext } from "./pdfContext";
import { PDFDocument } from "pdf-lib";

export function PDFContextProvider({ children }: { children: React.ReactNode }) {
    const [pdf, setPDF] = useState<PDFDocument>();
    const [url, setURL] = useState<string>();

    return (
        <pdfContext.Provider value={{ pdf, setPDF, url, setURL }}>
            {children}
        </pdfContext.Provider>
    )
};