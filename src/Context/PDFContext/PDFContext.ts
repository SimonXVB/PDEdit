import { createContext, Dispatch, SetStateAction } from "react";
import { PDFDocument } from "pdf-lib";

export type PDFPagesType = {
    pdfID: string,
    pdfImg: string,
    pdfCanvas: HTMLCanvasElement,
    pdfInfo: { height: number, width: number, rotation: number }
}[];
 
interface PDFInterface {
    pdfDoc: PDFDocument | undefined,
    setPDFDoc: Dispatch<SetStateAction<PDFDocument | undefined>>
    pdfPages: PDFPagesType,
    setPDFPages: Dispatch<SetStateAction<PDFPagesType>>
};

export const pdfContext = createContext<PDFInterface>({} as PDFInterface);