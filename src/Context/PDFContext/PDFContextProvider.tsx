import { useState } from "react"
import { pdfContext } from "./pdfContext";
import { PDFDocument } from "pdf-lib";

export type PDFPagesType = { pdfImg?: string, pdfCanvas?: HTMLCanvasElement }[];

export interface PDFInfoInterface {
    pdfDoc?: PDFDocument,
    pdfURL?: string
}

export function PDFContextProvider({ children }: { children: React.ReactNode }) {
    const [pdfInfo, setPDFInfo] = useState<PDFInfoInterface>({});
    const [pdfPages, setPDFPages] = useState<PDFPagesType>([]);
    const [pdfLoading, setPDFLoading] = useState<boolean>(false);

    return (
        <pdfContext.Provider value={{ pdfInfo, setPDFInfo, pdfPages, setPDFPages, pdfLoading, setPDFLoading }}>
            {children}
        </pdfContext.Provider>
    )
};