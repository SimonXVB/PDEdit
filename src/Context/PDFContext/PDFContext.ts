import { createContext, Dispatch, SetStateAction } from "react";
import { PDFPagesType } from "./PDFContextProvider";
import { PDFDocument } from "pdf-lib";
 
interface PDFInterface {
    pdfDoc: PDFDocument | undefined,
    setPDFDoc: Dispatch<SetStateAction<PDFDocument | undefined>>
    pdfPages: PDFPagesType,
    setPDFPages: Dispatch<SetStateAction<PDFPagesType>>
};

export const pdfContext = createContext<PDFInterface>({} as PDFInterface);