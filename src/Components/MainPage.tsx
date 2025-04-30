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
                <div className="relative h-screen flex flex-col justify-center items-center gap-20">
                    <div className="px-2">
                        <p className="text-5xl font-bold italic text-cyan-500">PDEdit</p>
                        <p className="font-semibold">Edit PDFs easily with PDEdit, a simple and open-source PDF Editor.</p>
                    </div>
                    <UploadButton/>
                    <a className="absolute bottom-0 left-0 m-5 block bg-gray-800 rounded-2xl p-1.5 hover:bg-gray-800/80 hover:-translate-y-1" href="https://github.com/SimonXVB/PDEdit" target="_blank">
                        <img src="/github-mark-white.png" alt="GitHub Logo" width={50}/>
                    </a>
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