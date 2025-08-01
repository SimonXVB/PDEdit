import { useContext, useEffect, useRef, useState } from "react"
import { pdfContext } from "../../Context/PDFCTX/pdfContext.ts"
import { PDFPageControls } from "./Individuals/PDFPageControls.tsx";
import { SidebarPage } from "./Individuals/SidebarPage.tsx";
import { OpenSidebarButton } from "./Individuals/OpenSidebarButton.tsx";
import { DeletePageModal } from "./Individuals/DeletePageModal.tsx";
import { useRemovePage } from "../../Hooks/useRemovePage.ts";

export function Sidebar() {
    const { pdfPages, pdfDoc } = useContext(pdfContext);

    const sidebarRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(window.innerWidth <= 800 ? false : true);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [draggingId, setDraggingId] = useState<number | null>(null);

    const { removePage } = useRemovePage();

    useEffect(() => {
        if(!open) {
            sidebarRef.current!.style.animation = "out-sidebar .75s ease forwards";
        } else {
            sidebarRef.current!.style.animation = "in-sidebar .75s ease forwards";
        };
    }, [open]);
 
    return (
        <>
            <div className="fixed top-0 right-0 flex items-center h-screen z-20" ref={sidebarRef}>
                <OpenSidebarButton open={open} setOpen={() => setOpen(!open)}/>
                <div className="flex flex-col items-center h-full p-4 pl-2 border-l-2 overflow-y-auto border-rose-500 bg-white" id="sidebarContainer">
                    {pdfPages.map((page, i) => (
                        <div key={i} className="flex mb-1">
                            <PDFPageControls pageNum={pdfDoc!.getPageCount()} index={i} setDeleteIndex={() => setDeleteIndex(i)}/>
                            <div>
                                <SidebarPage page={page} index={i} draggingId={draggingId} setDraggingId={setDraggingId}/>
                                <p className="text-center px-1 text-black">{i + 1}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {deleteIndex !== null && <DeletePageModal removePage={() => {removePage(deleteIndex); setDeleteIndex(null)}} setDeleteIndex={() => setDeleteIndex(null)}/>}
            {open && window.innerWidth <= 800 && <div className="fixed top-0 left-0 w-screen h-screen z-10" onClick={() => setOpen(!open)}></div>}
        </>
    )
};