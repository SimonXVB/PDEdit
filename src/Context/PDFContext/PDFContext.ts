import { PDFDocument } from "pdf-lib";
import { createContext, Dispatch, SetStateAction } from "react";
 
interface PDFInterface {
    pdf?: PDFDocument,
    setPDF?: Dispatch<SetStateAction<PDFDocument | undefined>>
    url?: string,
    setURL?: Dispatch<SetStateAction<string | undefined>>
};

export const pdfContext = createContext<PDFInterface>({});