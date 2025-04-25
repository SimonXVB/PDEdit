import { useContext, useState } from "react"
import { pdfContext } from "../Context/PDFContext/pdfContext"
import { useRearrangePages } from "../Hooks/useRearrangePages";
import { PDFPageControls } from "./Individuals/PDFPageControls";

export function Sidebar() {
    const pdfCTX = useContext(pdfContext);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const { rearrangePages } = useRearrangePages();

    function handleDrop(e: React.DragEvent<HTMLImageElement>, id: number) {
        e.preventDefault();
        rearrangePages(draggingId!, id);
        setDraggingId(null);
    };

    return (
        <div className="flex flex-col h-fit sticky top-4 max-h-[85vh] overflow-y-auto rounded-2xl mx-6 border-2 border-[#A294F9]">
            {pdfCTX.pdfPages.map((el, i) => (
                <div key={i} className="m-2">
                    <div className="relative" style={{rotate: el.pdfInfo.rotation + "deg"}}>
                        <div className="absolute top-0 left-0 w-full h-full bg-white" style={{zIndex: draggingId === i ? 10 : 0}}>
                            <div className="h-full rounded-2xl border-2 border-dashed border-[#A294F9]"></div>
                        </div>
                        <img src={el.pdfImg} className="relative w-36 border-[1px]"
                            onDragStart={() => setDraggingId(i)}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => handleDrop(e, i)}
                            onDragEnd={() => setDraggingId(null)}
                            draggable
                        />
                    </div>
                    <PDFPageControls pageNum={pdfCTX.pdfDoc!.getPageCount()} index={i}/>
                </div>
            ))}
        </div>
    )
};