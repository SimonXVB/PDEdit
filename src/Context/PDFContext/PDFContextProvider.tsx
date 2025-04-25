import { useState } from "react"
import { PDFDocument } from "pdf-lib";
import { pdfContext, PDFPagesType } from "./pdfContext";

export function PDFContextProvider({ children }: { children: React.ReactNode }) {
    const [pdfDoc, setPDFDoc] = useState<PDFDocument>();
    const [pdfPages, setPDFPages] = useState<PDFPagesType>([]);

    return (
        <pdfContext.Provider value={{ pdfDoc, setPDFDoc, pdfPages, setPDFPages }}>
            {children}
        </pdfContext.Provider>
    )
};