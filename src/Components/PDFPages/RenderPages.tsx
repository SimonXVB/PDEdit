import { useContext } from "react"
import { pdfContext } from "../../Context/PDFCTX/pdfContext.ts";
import { PDFPage } from "./PDFPage.tsx";

export function RenderPages() {
    const { pdfPages } = useContext(pdfContext);
    
    return (
        <div className="flex flex-col overflow-x-auto mx-2 w-full">
            {pdfPages.map((page, i) => (
                <PDFPage page={page} pageNum={i +1} key={i}/>
            ))}
        </div>
    )
};