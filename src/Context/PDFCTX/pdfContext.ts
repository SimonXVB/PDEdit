import { createContext, Dispatch, SetStateAction } from "react";
import { PDFDocument } from "pdf-lib";

export interface PDFPagesInterface {
    pdfImg: string,
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