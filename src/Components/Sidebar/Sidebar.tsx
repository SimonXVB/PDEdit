import { useContext, useEffect, useRef, useState } from "react"
import { pdfContext } from "../../Context/PDFCTX/pdfContext.ts"
import { PDFPageControls } from "./Individuals/PDFPageControls.tsx";
import { SidebarPage } from "./Individuals/SidebarPage.tsx";
import { OpenSidebarButton } from "./Individuals/OpenSidebarButton.tsx";

export function Sidebar() {
    const { pdfPages, pdfDoc } = useContext(pdfContext);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const [draggingId, setDraggingId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(window.innerWidth <= 800 ? false : true);

    useEffect(() => {
        if(!open) {
            sidebarRef.current!.style.animation = "out-sidebar .75s ease forwards";
        } else {
            sidebarRef.current!.style.animation = "in-sidebar .75s ease forwards";
        };
    }, [open]);
 
    return (
        <>
            <div className="fixed top-0 right-0 flex items-center z-20 h-screen" ref={sidebarRef}>
                <OpenSidebarButton open={open} setOpen={() => setOpen(!open)}/>
                <div className="relative flex flex-col items-center h-full p-4 border-l-2 overflow-y-auto border-rose-500 bg-white" id="sidebarContainer">
                    {pdfPages.map((page, i) => (
                        <div key={i}>
                            <SidebarPage page={page} index={i} draggingId={draggingId} setDraggingId={setDraggingId}/>
                            <PDFPageControls pageNum={pdfDoc!.getPageCount()} index={i}/>
                        </div>
                    ))}
                </div>
            </div>
            {open && window.innerWidth <= 800 && <div className="fixed top-0 left-0 w-screen h-screen z-10" onClick={() => setOpen(!open)}></div>}
        </>
    )
};