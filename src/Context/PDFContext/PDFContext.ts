import { PDFDocument } from "pdf-lib";
import { createContext, Dispatch, SetStateAction } from "react";
 
interface PDFInterface {
    pdf?: PDFDocument,
    setPDF?: Dispatch<SetStateAction<PDFDocument | undefined>>
    url?: string,
    setURL?: Dispatch<SetStateAction<string>>,
    pdfLoading?: boolean,
    setPDFLoading?: Dispatch<SetStateAction<boolean>>
};

export const pdfContext = createContext<PDFInterface>({});