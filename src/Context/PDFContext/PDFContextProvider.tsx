import { useState } from "react"
import { PDFContext } from "./PDFContext";
import { PDFDocument } from "pdf-lib";

export function PDFContextProvider({ children }: { children: React.ReactNode }) {
    const [pdf, setPDF] = useState<PDFDocument>();
    const [url, setURL] = useState<string>();

    return (
        <PDFContext.Provider value={{ pdf, setPDF, url, setURL }}>
            {children}
        </PDFContext.Provider>
    )
};