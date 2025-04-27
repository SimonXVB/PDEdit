import { useContext, useState } from "react"
import { pdfContext } from "../Context/PDFContext/pdfContext"
import { PDFPageControls } from "./Individuals/PDFPageControls";
import { SidebarPage } from "./Individuals/SidebarPage";

export function Sidebar() {
    const pdfCTX = useContext(pdfContext);
    const [draggingId, setDraggingId] = useState<number | null>(null);

    return (
        <div className="sticky top-4 flex flex-col items-center max-h-[85vh] h-fit mx-4 p-4 border-4 border-cyan-500 rounded-xl overflow-y-auto" id="sidebarContainer">
            {pdfCTX.pdfPages.map((el, i) => (
                <div key={i} className="mb-2">
                    <SidebarPage el={el} i={i} draggingId={draggingId} setDraggingId={setDraggingId}/>
                    <PDFPageControls pageNum={pdfCTX.pdfDoc!.getPageCount()} index={i}/>
                </div>
            ))}
        </div>
    )
};