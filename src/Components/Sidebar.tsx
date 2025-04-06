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
        e.currentTarget.style.border = "1px solid black"
        rearrangePages(draggingId!, id);
        setDraggingId(null);
    };

    return (
        <div className="flex flex-col h-full sticky top-4 max-h-[85vh] overflow-y-auto rounded-2xl mx-6 border-2 border-[#A294F9]">
            {pdfCTX.pdfPages?.map((el, i) => (
                <div key={i} className="flex flex-col justify-center m-2">
                    <div className="relative">
                        <div className="absolute top-0 left-0 w-full h-full bg-white" style={{zIndex: draggingId === i ? 10 : 0}}>
                            <div className="h-full rounded-2xl border-2 border-dashed border-[#A294F9]"></div>
                        </div>
                        <img src={el.pdfImg} className="w-36 border-[1px] border-black" style={{rotate: el.pdfInfo?.rotation + "deg", zIndex: draggingId === i ? 0 : 10}}
                            onDragStart={() => setDraggingId(i)}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => handleDrop(e, i)}
                            onDragEnd={() => setDraggingId(null)}
                            onDragEnter={e => e.currentTarget.style.border = "2px solid #A294F9"}
                            onDragLeave={e => e.currentTarget.style.border = "1px solid black"}
                            draggable
                        />
                    </div>
                    <PDFPageControls pageNum={pdfCTX.pdfDoc!.getPageCount()} index={i}/>
                </div>
            ))}
        </div>
    )
};