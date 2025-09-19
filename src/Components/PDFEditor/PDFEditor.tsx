import { useContext, useEffect, useRef } from "react";
import { useZoomPages } from "../../Hooks/useZoomPages";
import { Navbar } from "./Navbar/Navbar";
import { Sidebar } from "./Sidebar/Sidebar";
import { pdfContext } from "../../Context/PDFCTX/pdfContext";
import { RenderPage } from "./RenderPage";

export function PDFEditor() {
    const { pdfPages } = useContext(pdfContext)
    const { ctrlWheelZoom } = useZoomPages();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current) {
            const div = ref.current;

            div.addEventListener("wheel", ctrlWheelZoom);
            return () => div.removeEventListener("wheel", ctrlWheelZoom);
        };
    });

    return (
        <div ref={ref} className="min-h-dvh h-full">
            <Navbar/>
            <div className="flex">
                <div className="flex flex-col overflow-x-auto mx-2 w-full">
                    {pdfPages.map((page, i) => (
                        <RenderPage key={i} page={page} i={i}/>
                    ))}
                </div>
                <Sidebar/>
            </div>
        </div>
    )
};