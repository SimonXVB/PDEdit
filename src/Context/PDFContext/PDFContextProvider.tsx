import { useState } from "react"
import { pdfContext } from "./pdfContext";
import { PDFDocument } from "pdf-lib";

export type PDFPagesType = { 
    pdfImg: string, 
    pdfCanvas: HTMLCanvasElement,
    pdfInfo: { height: number, width: number, rotation: number }
}[];

export function PDFContextProvider({ children }: { children: React.ReactNode }) {
    const [pdfDoc, setPDFDoc] = useState<PDFDocument>();
    const [pdfPages, setPDFPages] = useState<PDFPagesType>([]);

    return (
        <pdfContext.Provider value={{ pdfDoc, setPDFDoc, pdfPages, setPDFPages }}>
            {children}
        </pdfContext.Provider>
    )
};