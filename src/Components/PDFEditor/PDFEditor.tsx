import { useContext, useEffect, useRef } from "react";
import { useZoomPages } from "../../Hooks/useZoomPages";
import { Navbar } from "./Navbar/Navbar";
import { Sidebar } from "./Sidebar/Sidebar";
import { RenderPage } from "./RenderPage";
import { pdfContext } from "../../Context/PDFCTX/pdfContext";

export function PDFEditor() {
    const { pdfPages } = useContext(pdfContext);
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
    }, []);

    return (
        <div ref={ref} className="min-h-dvh h-full">
            <Navbar/>
            <Sidebar/>
            <div className="flex flex-col mx-2 overflow-x-auto">
                {pdfPages.map((page, i) => (
                    <RenderPage key={i} page={page} i={i}/>
                ))}
            </div>
        </div>
    )
};