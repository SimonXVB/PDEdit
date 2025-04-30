import { useContext, useEffect, useRef } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext.ts";
import { useZoomPages } from "../Hooks/useZoomPages.ts";
import { UploadButton } from "./Individuals/UploadButton.tsx";
import { RenderPages } from "./RenderPages.tsx";
import { Sidebar } from "./Sidebar.tsx";
import { Navbar } from "./Navbar.tsx";

export function MainPage() {
    const pdfCTX = useContext(pdfContext);
    const divRef = useRef<HTMLDivElement>(null);

    const { ctrlWheelZoom } = useZoomPages();

    useEffect(() => {
        if(divRef.current) {
            const ref = divRef.current;

            ref.addEventListener("wheel", ctrlWheelZoom);
            return () => ref.removeEventListener("wheel", ctrlWheelZoom);
        };
    });

    return (
        <>
            {!pdfCTX.pdfDoc && 
                <div className="h-screen flex justify-center items-center">
                    <UploadButton/>
                </div>
            }
            {pdfCTX.pdfDoc &&
                <div ref={divRef} className="min-h-screen h-full">
                    <Navbar/>
                    <div className="flex">
                        <RenderPages/>
                        <Sidebar/>
                    </div>
                </div>
            }
        </>
    )
};