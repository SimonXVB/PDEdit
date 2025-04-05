import { createContext, Dispatch, SetStateAction } from "react";
import { PDFPagesType } from "./PDFContextProvider";
import { PDFDocument } from "pdf-lib";
 
interface PDFInterface {
    pdfDoc?: PDFDocument,
    setPDFDoc?: Dispatch<SetStateAction<PDFDocument | undefined>>
    pdfPages?: PDFPagesType,
    setPDFPages?: Dispatch<SetStateAction<PDFPagesType>>,
    pdfLoading?: boolean,
    setPDFLoading?: Dispatch<SetStateAction<boolean>>
};

export const pdfContext = createContext<PDFInterface>({});