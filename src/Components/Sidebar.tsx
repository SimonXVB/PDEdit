import { useContext, useEffect, useRef, useState } from "react"
import { pdfContext } from "../Context/PDFCTX/pdfContext.ts"
import { PDFPageControls } from "./Individuals/PDFPageControls.tsx";
import { SidebarPage } from "./Individuals/SidebarPage.tsx";
import { OpenSidebarButton } from "./Individuals/OpenSidebarButton.tsx";

export function Sidebar() {
    const pdfCTX = useContext(pdfContext);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(window.innerWidth <= 800 ? false : true);

    function toggleSidebar() {
        if(open) {
            setOpen(false);
            sidebarRef.current!.style.animation = "out-sidebar .75s ease forwards";
        } else {
            setOpen(true);
            sidebarRef.current!.style.animation = "in-sidebar .75s ease forwards";
        };
    };

    useEffect(() => {
        if(open) {
            sidebarRef.current!.style.transform = "translateX(0%)";
        } else {
            sidebarRef.current!.style.transform = "translateX(85%)";
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="fixed top-0 right-0 flex items-center z-20 h-full" ref={sidebarRef}>
                <OpenSidebarButton open={open} toggleSidebar={() => toggleSidebar()}/>
                <div className="flex flex-col items-center h-screen p-4 border-l-4 overflow-y-auto border-cyan-500 bg-white *:last:mb-0" id="sidebarContainer">
                    {pdfCTX.pdfPages.map((el, i) => (
                        <div key={i}>
                            <SidebarPage el={el} i={i} draggingId={draggingId} setDraggingId={setDraggingId}/>
                            <PDFPageControls pageNum={pdfCTX.pdfDoc!.getPageCount()} index={i}/>
                        </div>
                    ))}
                </div>
            </div>
            {open && window.innerWidth <= 800 && 
                <div className="fixed top-0 left-0 w-screen h-screen z-10" onClick={() => toggleSidebar()}></div>
            }
        </>
    )
};