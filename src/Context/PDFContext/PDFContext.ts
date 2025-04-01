import { createContext, Dispatch, SetStateAction } from "react";
import { PDFPagesType, PDFInfoInterface } from "./PDFContextProvider";
 
interface PDFInterface {
    pdfInfo?: PDFInfoInterface,
    setPDFInfo?: Dispatch<SetStateAction<PDFInfoInterface>>
    pdfPages?: PDFPagesType,
    setPDFPages?: Dispatch<SetStateAction<PDFPagesType>>,
    pdfLoading?: boolean,
    setPDFLoading?: Dispatch<SetStateAction<boolean>>
};

export const pdfContext = createContext<PDFInterface>({});