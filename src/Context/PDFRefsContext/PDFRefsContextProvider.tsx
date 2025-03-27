import { useState } from "react"
import { pdfRefsContext } from "./pdfRefsContext";

export function PdfRefsContextProvider({ children }: { children: React.ReactNode }) {
    const [pdfRefs, setPdfRefs] = useState<HTMLCanvasElement[]>([]);

    return (
        <pdfRefsContext.Provider value={{ pdfRefs, setPdfRefs }}>
            {children}
        </pdfRefsContext.Provider>
    )
};