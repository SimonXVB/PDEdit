import { createContext, Dispatch, SetStateAction } from "react";

interface pdfRefsInterface {
    pdfRefs: HTMLCanvasElement[],
    setPdfRefs: Dispatch<SetStateAction<HTMLCanvasElement[]>>
}

export const pdfRefsContext = createContext<pdfRefsInterface | null>(null);