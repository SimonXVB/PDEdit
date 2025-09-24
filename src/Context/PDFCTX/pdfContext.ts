import { createContext, Dispatch, SetStateAction } from "react";
import { PDFDocument } from "pdf-lib";
import { PDFPageProxy } from "pdfjs-dist";
 
export interface PDFInterface {
    pdfDoc: PDFDocument | undefined,
    setPDFDoc: Dispatch<SetStateAction<PDFDocument | undefined>>
    pdfPages: PDFPageProxy[],
    setPDFPages: Dispatch<SetStateAction<PDFPageProxy[]>>
};

export const pdfContext = createContext<PDFInterface>({} as PDFInterface);