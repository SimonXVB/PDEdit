import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { pdfContext } from "./pdfContext";
import { PDFPageProxy } from "pdfjs-dist";

export function PDFContextProvider({ children }: { children: React.ReactNode }) {
    const [pdfDoc, setPDFDoc] = useState<PDFDocument>();
    const [pdfPages, setPDFPages] = useState<PDFPageProxy[]>([]);

    return (
        <pdfContext.Provider value={{ pdfDoc, setPDFDoc, pdfPages, setPDFPages }}>
            {children}
        </pdfContext.Provider>
    )
};