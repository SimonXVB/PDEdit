import { useContext } from "react"
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { PDFPage } from "./Individuals/PDFPage";

export function RenderPages() {
    const pdfCTX = useContext(pdfContext);
    
    return (
        <div className="flex flex-col overflow-x-auto mx-2 w-full">
            {pdfCTX.pdfPages.map((el, i) => (
                <PDFPage el={el} key={i}/>
            ))}
        </div>
    )
};