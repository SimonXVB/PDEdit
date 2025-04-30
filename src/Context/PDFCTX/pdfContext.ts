import { createContext, Dispatch, SetStateAction } from "react";
import { PDFDocument } from "pdf-lib";

export type PDFPagesType = {
    pdfImg: string,
    pdfInfo: { height: number, width: number, rotation: number }
};
 
export interface PDFInterface {
    pdfDoc: PDFDocument | undefined,
    setPDFDoc: Dispatch<SetStateAction<PDFDocument | undefined>>
    pdfPages: PDFPagesType[],
    setPDFPages: Dispatch<SetStateAction<PDFPagesType[]>>
};

export const pdfContext = createContext<PDFInterface>({} as PDFInterface);