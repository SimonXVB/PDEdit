import { useContext, useEffect, useRef } from "react";
import { useZoomPages } from "../../Hooks/useZoomPages";
import { Navbar } from "./Navbar/Navbar";
import { Sidebar } from "./Sidebar/Sidebar";
import { pdfContext } from "../../Context/PDFCTX/pdfContext";
import { RenderPage } from "./RenderPage";
import { mainContext } from "../../Context/MainCTX/mainContext";

export function PDFEditor() {
    const { pdfPages } = useContext(pdfContext);
    const { zoomLevel } = useContext(mainContext);
    const { ctrlWheelZoom, startTouchZoom, touchZoom } = useZoomPages();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current) {
            const div = ref.current;

            div.addEventListener("wheel", ctrlWheelZoom);
            div.addEventListener("touchstart", startTouchZoom);
            div.addEventListener("touchmove", touchZoom);

            return () =>{
                div.removeEventListener("wheel", ctrlWheelZoom);
                div.removeEventListener("touchstart", startTouchZoom);
                div.removeEventListener("touchmove", touchZoom);
            };
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoomLevel]);

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