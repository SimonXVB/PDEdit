import { useContext, useState } from "react"
import { pdfContext } from "../Context/PDFContext/pdfContext"
import { useRearrangePages } from "../Hooks/useRearrangePages";

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
        <div className="border-2 border-green-400 flex flex-col items-center">
            {pdfCTX.pdfPages?.map((el, i) => (
                <img key={i} src={el.pdfImg} className="h-44 border-2 border-yellow-400 my-2 active:cursor-grabbing" style={{rotate: el.pdfInfo?.rotation + "deg"}} 
                onDragStart={() => setDraggingId(i)}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, i)}
                draggable/>
            ))}
        </div>
    )
};