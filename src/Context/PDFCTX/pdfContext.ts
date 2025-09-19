import { createContext, Dispatch, SetStateAction } from "react";
import { PDFDocument } from "pdf-lib";
import { PDFPageProxy } from "pdfjs-dist";

export interface PDFPagesInterface {
    pdfPage: PDFPageProxy,
    height: number, 
    width: number, 
    rotation: number
};
 
export interface PDFInterface {
    pdfDoc: PDFDocument | undefined,
    setPDFDoc: Dispatch<SetStateAction<PDFDocument | undefined>>
    pdfPages: PDFPagesInterface[],
    setPDFPages: Dispatch<SetStateAction<PDFPagesInterface[]>>
};

export const pdfContext = createContext<PDFInterface>({} as PDFInterface);