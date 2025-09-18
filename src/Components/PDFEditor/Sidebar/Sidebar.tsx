import { useContext, useState } from "react"
import { pdfContext } from "../../../Context/PDFCTX/pdfContext.ts";
import { PDFPageControls } from "./Individuals/PDFPageControls.tsx";
import { SidebarPage } from "./Individuals/SidebarPage.tsx";
import { DeletePageModal } from "./Individuals/DeletePageModal.tsx";
import { useRemovePage } from "../../../Hooks/useRemovePage.ts";

export function Sidebar() {
    const { pdfPages, pdfDoc } = useContext(pdfContext);

    const [open, setOpen] = useState<boolean>(window.innerWidth <= 800 ? false : true);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [draggingId, setDraggingId] = useState<number | null>(null);

    const { removePage } = useRemovePage();
 
    return (
        <>
            <div className={`fixed top-1/2 -translate-y-1/2 right-0 h-svh flex items-center z-20 transition-all duration-150 ${open ? "translate-x-0" : "translate-x-[calc(100%_-_28px)]"}`}>
                <button className="bg-rose-500 p-1 w-7 h-16 cursor-pointer rounded-l-lg hover:bg-rose-400" onClick={() => setOpen(!open)}>
                    {open ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    }
                </button>
                <div className={`flex flex-col items-center h-[90%] p-4 pl-2 border-2 border-r-0 rounded-l-lg border-rose-500 bg-white/20 backdrop-blur-sm shadow-2xl ${draggingId !== null ? "overflow-hidden" : "overflow-auto"}`} id="sidebarContainer">
                    {pdfPages.map((page, i) => (
                        <div key={i} className="flex mb-1">
                            <PDFPageControls pageNum={pdfDoc!.getPageCount()} index={i} setDeleteIndex={() => setDeleteIndex(i)}/>
                            <SidebarPage page={page} index={i} draggingId={draggingId} setDraggingId={setDraggingId}/>
                        </div>
                    ))}
                </div>
            </div>
            {deleteIndex !== null && <DeletePageModal removePage={() => {removePage(deleteIndex); setDeleteIndex(null)}} setDeleteIndex={() => setDeleteIndex(null)}/>}
        </>
    )
};