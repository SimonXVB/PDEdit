import { useEffect, useRef } from "react";
import { useZoomPages } from "../../Hooks/useZoomPages";
import { Navbar } from "./Navbar/Navbar";
import { RenderPages } from "./RenderPages"
import { Sidebar } from "./Sidebar/Sidebar";

export function PDFEditor() {
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
                <RenderPages/>
                <Sidebar/>
            </div>
        </div>
    )
};